import { getEmailJsCredentials, isEmailJsConfigured } from './emailjs';

export const RECIPIENT_EMAIL = 'dinagamal8839@gmail.com';

/** Active provider label for debugging / docs (first match at send time). */
export function getContactFormProvider() {
  if (isEmailJsConfigured(getEmailJsCredentials())) return 'emailjs';
  if (import.meta.env.VITE_WEB3FORMS_ACCESS_KEY?.trim()) return 'web3forms';
  if (import.meta.env.VITE_FORMSPREE_FORM_ID?.trim()) return 'formspree';
  return 'formsubmit';
}
