import emailjs from '@emailjs/browser';
import { getEmailJsCredentials, isEmailJsConfigured } from '../config/emailjs';
import { CONTACT_EMAIL, DEFAULT_EMAIL_SUBJECT } from './mailto';

const FORMSUBMIT_ENDPOINT = `https://formsubmit.co/ajax/${encodeURIComponent(CONTACT_EMAIL)}`;

async function sendViaEmailJs(form, credentials) {
  await emailjs.send(
    credentials.serviceId,
    credentials.templateId,
    {
      from_name: form.name,
      from_email: form.email,
      reply_to: form.email,
      user_email: form.email,
      to_email: CONTACT_EMAIL,
      subject: form.subject || DEFAULT_EMAIL_SUBJECT,
      message: form.message,
    },
    credentials.publicKey
  );
}

async function sendViaWeb3Forms(form, accessKey) {
  const response = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: form.subject || DEFAULT_EMAIL_SUBJECT,
      from_name: form.name,
      name: form.name,
      email: form.email,
      message: form.message,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok || !result.success) {
    throw new Error(result.message || 'Web3Forms request failed');
  }
}

async function sendViaFormspree(form, formId) {
  const response = await fetch(`https://formspree.io/f/${formId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      subject: form.subject || DEFAULT_EMAIL_SUBJECT,
      message: form.message,
      _replyto: form.email,
    }),
  });

  const result = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(result.error || result.message || 'Formspree request failed');
  }
}

/** FormSubmit — no API key; first send requires activating the link in your inbox. */
async function sendViaFormSubmit(form) {
  const response = await fetch(FORMSUBMIT_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      name: form.name,
      email: form.email,
      subject: form.subject || DEFAULT_EMAIL_SUBJECT,
      message: form.message,
      _subject: form.subject || DEFAULT_EMAIL_SUBJECT,
      _replyto: form.email,
      _captcha: 'false',
      _template: 'table',
    }),
  });

  const result = await response.json().catch(() => ({}));

  const ok =
    response.ok &&
    (result.success === true ||
      result.success === 'true' ||
      String(result.message || '').toLowerCase().includes('thank'));

  if (!ok) {
    throw new Error(result.message || 'FormSubmit request failed');
  }
}

/**
 * Sends the contact form. Tries EmailJS → Web3Forms → Formspree → FormSubmit (default).
 * @returns {{ method: string }}
 */
export async function sendContactMessage(form) {
  const emailJsCredentials = getEmailJsCredentials();

  if (isEmailJsConfigured(emailJsCredentials)) {
    try {
      emailjs.init(emailJsCredentials.publicKey);
      await sendViaEmailJs(form, emailJsCredentials);
      return { method: 'emailjs' };
    } catch (err) {
      console.error('EmailJS error:', err);
      throw Object.assign(new Error('SEND_FAILED'), { cause: err });
    }
  }

  const web3FormsKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim();
  if (web3FormsKey) {
    try {
      await sendViaWeb3Forms(form, web3FormsKey);
      return { method: 'web3forms' };
    } catch (err) {
      console.error('Web3Forms error:', err);
      throw Object.assign(new Error('SEND_FAILED'), { cause: err });
    }
  }

  const formspreeId = import.meta.env.VITE_FORMSPREE_FORM_ID?.trim();
  if (formspreeId) {
    try {
      await sendViaFormspree(form, formspreeId);
      return { method: 'formspree' };
    } catch (err) {
      console.error('Formspree error:', err);
      throw Object.assign(new Error('SEND_FAILED'), { cause: err });
    }
  }

  try {
    await sendViaFormSubmit(form);
    return { method: 'formsubmit' };
  } catch (err) {
    console.error('FormSubmit error:', err);
    throw Object.assign(new Error('SEND_FAILED'), { cause: err });
  }
}
