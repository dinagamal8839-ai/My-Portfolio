import { useEffect, useRef } from 'react';
import { openEmailCompose, CONTACT_EMAIL, DEFAULT_EMAIL_SUBJECT } from '../utils/mailto';
import { SOCIAL_LINKS } from '../data/socialLinks';
import { useLanguage } from '../context/LanguageContext';
import useContactForm from '../hooks/useContactForm';
import SectionHeading from './SectionHeading';
import '../styles/Contact.css';

const CONTACT_DISPLAY = {
  github: 'dinagamal8839-ai',
  linkedin: 'dina-gamal',
  email: CONTACT_EMAIL,
};

const SOCIAL_LABEL_KEYS = {
  github: 'contact.github',
  linkedin: 'contact.linkedin',
  email: 'contact.email',
};

export default function Contact() {
  const { t } = useLanguage();
  const { form, honeypot, isSending, status, handleChange, handleSubmit } = useContactForm();
  const itemRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    itemRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleEmailClick = (event) => {
    event.preventDefault();
    openEmailCompose({ subject: DEFAULT_EMAIL_SUBJECT });
  };

  return (
    <section className="section contact-section" id="contact">
      <SectionHeading
        tag="contact.tag"
        title="contact.title"
        titleHighlight="contact.titleHighlight"
        center
      />

      <div className="contact__inner">
        <div className="contact__info">
          {SOCIAL_LINKS.map(({ id, icon, href, external, isEmail }, i) => {
            const value = CONTACT_DISPLAY[id];
            const label = t(SOCIAL_LABEL_KEYS[id]);
            const linkProps = external
              ? { target: '_blank', rel: 'noopener noreferrer' }
              : {};

            return (
              <div
                className={`contact__item${isEmail ? ' contact__item--email' : ''}`}
                key={id}
                data-social-row={id}
                ref={(el) => (itemRefs.current[i] = el)}
              >
                <a
                  href={href}
                  className="contact__icon-link"
                  aria-label={`${label}: ${value}`}
                  {...(isEmail
                    ? {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                        onClick: handleEmailClick,
                      }
                    : linkProps)}
                >
                  <i className={icon} />
                </a>
                <div>
                  {isEmail ? (
                    <a
                      href={href}
                      className="contact__email-text"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={handleEmailClick}
                    >
                      <strong>{label}</strong>
                      <span>{value}</span>
                    </a>
                  ) : (
                    <>
                      <strong>{label}</strong>
                      <a href={href} {...linkProps}>{value}</a>
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <form className="contact__form" onSubmit={handleSubmit} noValidate>
          <input
            type="text"
            name="_gotcha"
            className="contact__honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={honeypot}
            onChange={handleChange}
          />

          <div className="form-group">
            <label className="contact__sr-only" htmlFor="contact-name">
              {t('contact.namePlaceholder')}
            </label>
            <input
              id="contact-name"
              type="text"
              name="name"
              placeholder={t('contact.namePlaceholder')}
              value={form.name}
              onChange={handleChange}
              required
              autoComplete="name"
              maxLength={200}
              disabled={isSending}
            />
          </div>

          <div className="form-group">
            <label className="contact__sr-only" htmlFor="contact-email">
              {t('contact.emailPlaceholder')}
            </label>
            <input
              id="contact-email"
              type="email"
              name="email"
              placeholder={t('contact.emailPlaceholder')}
              value={form.email}
              onChange={handleChange}
              required
              autoComplete="email"
              maxLength={320}
              disabled={isSending}
            />
          </div>

          <div className="form-group">
            <label className="contact__sr-only" htmlFor="contact-subject">
              {t('contact.subjectPlaceholder')}
            </label>
            <input
              id="contact-subject"
              type="text"
              name="subject"
              placeholder={t('contact.subjectPlaceholder')}
              value={form.subject}
              onChange={handleChange}
              maxLength={200}
              disabled={isSending}
            />
          </div>

          <div className="form-group">
            <label className="contact__sr-only" htmlFor="contact-message">
              {t('contact.messagePlaceholder')}
            </label>
            <textarea
              id="contact-message"
              name="message"
              rows={5}
              placeholder={t('contact.messagePlaceholder')}
              value={form.message}
              onChange={handleChange}
              required
              maxLength={5000}
              disabled={isSending}
            />
          </div>

          <button
            type="submit"
            className="btn btn-primary contact__submit"
            disabled={isSending}
            aria-busy={isSending}
          >
            <i className="fas fa-paper-plane" aria-hidden />
            {isSending ? t('contact.sending') : t('contact.send')}
          </button>

          <p
            className={`form-feedback form-success${status.type === 'success' ? ' show' : ''}`}
            role="status"
            aria-live="polite"
          >
            {status.type === 'success' ? status.message : ''}
          </p>
          <p
            className={`form-feedback form-error${status.type === 'error' ? ' show' : ''}`}
            role="alert"
            aria-live="assertive"
          >
            {status.type === 'error' ? status.message : ''}
          </p>
        </form>
      </div>
    </section>
  );
}
