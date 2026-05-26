import { useCallback, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { sendContactMessage } from '../utils/sendContactMessage';
import { validateContactForm } from '../utils/validateContactForm';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

export default function useContactForm() {
  const { t } = useLanguage();
  const [form, setForm] = useState(INITIAL_FORM);
  const [honeypot, setHoneypot] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const setField = useCallback((field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleChange = useCallback((event) => {
    const { name, value } = event.target;
    if (name === '_gotcha') {
      setHoneypot(value);
      return;
    }
    if (name in INITIAL_FORM) {
      setField(name, value);
    }
  }, [setField]);

  const clearStatus = useCallback(() => {
    setStatus({ type: '', message: '' });
  }, []);

  const getSuccessMessage = useCallback(
    (method) => {
      if (method === 'emailjs') return t('contact.successEmailJs');
      if (method === 'formsubmit') return t('contact.successFormSubmit');
      return t('contact.successDelivered');
    },
    [t]
  );

  const getValidationMessage = useCallback(
    (code) => t(`contact.validation.${code}`),
    [t]
  );

  const handleSubmit = useCallback(
    async (event) => {
      event.preventDefault();
      clearStatus();

      const validation = validateContactForm(form, honeypot);
      if (!validation.valid) {
        if (validation.code === 'spam') return;
        setStatus({ type: 'error', message: getValidationMessage(validation.code) });
        return;
      }

      setIsSending(true);

      try {
        const result = await sendContactMessage(validation.data);
        setStatus({
          type: 'success',
          message: getSuccessMessage(result.method),
        });
        setForm(INITIAL_FORM);
        setHoneypot('');
      } catch (error) {
        console.error('Contact form error:', error);
        setStatus({
          type: 'error',
          message: t('contact.errorSendFailed'),
        });
      } finally {
        setIsSending(false);
      }
    },
    [form, honeypot, clearStatus, getSuccessMessage, getValidationMessage, t]
  );

  return {
    form,
    honeypot,
    isSending,
    status,
    handleChange,
    handleSubmit,
    clearStatus,
  };
}
