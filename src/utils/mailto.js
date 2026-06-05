export const CONTACT_EMAIL = 'dinagamal8839@gmail.com';

/** Default subject for Gmail compose and mailto links. */
export const DEFAULT_EMAIL_SUBJECT = 'Portfolio Inquiry';

/** Gmail compose URL (opens in browser tab). */
export function getGmailComposeUrl({ subject = DEFAULT_EMAIL_SUBJECT, body = '' } = {}) {
  const params = new URLSearchParams({
    view: 'cm',
    fs: '1',
    to: CONTACT_EMAIL,
  });
  if (subject) params.set('su', subject);
  if (body) params.set('body', body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}

/** mailto: fallback when Gmail tab cannot be opened. */
export function getMailtoHref({ subject = DEFAULT_EMAIL_SUBJECT, body = '' } = {}) {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString();
  return `mailto:${CONTACT_EMAIL}${query ? `?${query}` : ''}`;
}

/**
 * Opens Gmail compose in a new tab; falls back to mailto if the popup is blocked.
 */
export function openEmailCompose({ subject = DEFAULT_EMAIL_SUBJECT, body = '' } = {}) {
  const gmailUrl = getGmailComposeUrl({ subject, body });
  const mailtoUrl = getMailtoHref({ subject, body });

  const tab = window.open(gmailUrl, '_blank', 'noopener,noreferrer');

  if (!tab) {
    window.location.assign(mailtoUrl);
  }
}
