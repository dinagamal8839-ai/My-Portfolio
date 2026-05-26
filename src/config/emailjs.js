/**
 * EmailJS configuration
 *
 * Option A (recommended): create `dina-portfolio/.env.local` with:
 *   VITE_EMAILJS_SERVICE_ID=your_service_id
 *   VITE_EMAILJS_TEMPLATE_ID=your_template_id
 *   VITE_EMAILJS_PUBLIC_KEY=your_public_key
 *
 * Option B: paste the same three values below (or use Web3Forms / Formspree in .env.local).
 */
export const EMAILJS_CONFIG = {
  serviceId: '',
  templateId: '',
  publicKey: '',
};

export function getEmailJsCredentials() {
  const fromEnv = {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID?.trim() ?? '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID?.trim() ?? '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY?.trim() ?? '',
  };

  const fromFile = {
    serviceId: EMAILJS_CONFIG.serviceId.trim(),
    templateId: EMAILJS_CONFIG.templateId.trim(),
    publicKey: EMAILJS_CONFIG.publicKey.trim(),
  };

  return {
    serviceId: fromEnv.serviceId || fromFile.serviceId,
    templateId: fromEnv.templateId || fromFile.templateId,
    publicKey: fromEnv.publicKey || fromFile.publicKey,
  };
}

export function isEmailJsConfigured(credentials) {
  return Boolean(credentials.serviceId && credentials.templateId && credentials.publicKey);
}
