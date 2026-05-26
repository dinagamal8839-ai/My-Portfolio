const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MIN_NAME_LENGTH = 2;
const MIN_MESSAGE_LENGTH = 5;
const MAX_FIELD_LENGTH = 5000;

/**
 * @returns {{ valid: true, data: { name, email, subject, message } } | { valid: false, code: string }}
 */
export function validateContactForm(form, honeypot = '') {
  if (honeypot?.trim()) {
    return { valid: false, code: 'spam' };
  }

  const name = form.name?.trim() ?? '';
  const email = form.email?.trim() ?? '';
  const subject = form.subject?.trim() ?? '';
  const message = form.message?.trim() ?? '';

  if (!name || !email || !message) {
    return { valid: false, code: 'required' };
  }

  if (name.length < MIN_NAME_LENGTH) {
    return { valid: false, code: 'nameShort' };
  }

  if (!EMAIL_PATTERN.test(email)) {
    return { valid: false, code: 'emailInvalid' };
  }

  if (message.length < MIN_MESSAGE_LENGTH) {
    return { valid: false, code: 'messageShort' };
  }

  if (
    name.length > MAX_FIELD_LENGTH ||
    email.length > 320 ||
    subject.length > MAX_FIELD_LENGTH ||
    message.length > MAX_FIELD_LENGTH
  ) {
    return { valid: false, code: 'tooLong' };
  }

  return {
    valid: true,
    data: { name, email, subject, message },
  };
}
