import { useEffect, useRef } from 'react';

import { CONTACT_EMAIL, getGmailComposeUrl, openEmailCompose, DEFAULT_EMAIL_SUBJECT } from '../utils/mailto';

import { SOCIAL_LINKS } from '../data/socialLinks';

import { useLanguage } from '../context/LanguageContext';

import SectionHeading from './SectionHeading';

import '../styles/Contact.css';



const CONTACT_DISPLAY = {

  github: 'dinagamal8839-ai',

  linkedin: 'dina-gamal',

  email: CONTACT_EMAIL,

  whatsapp: '+20 115 556 2856',

};



const SOCIAL_LABEL_KEYS = {

  github: 'contact.github',

  linkedin: 'contact.linkedin',

  email: 'contact.email',

  whatsapp: 'contact.whatsapp',

};



const EMAIL_COMPOSE_HREF = getGmailComposeUrl({ subject: DEFAULT_EMAIL_SUBJECT });



export default function Contact() {

  const { t } = useLanguage();

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

        <div className="contact__cards">

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

                <div className="contact__item-text">

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



        <div className="contact__message">

          <h3 className="contact__message-title">{t('contact.ctaTitle')}</h3>

          <div className="contact__message-accent" aria-hidden="true" />

          <div className="contact__message-body">

            <p>{t('contact.ctaParagraph1')}</p>

            <p>{t('contact.ctaParagraph2')}</p>

            <p>{t('contact.ctaParagraph3')}</p>

          </div>

        </div>



        <div className="contact__actions">

          <a

            href={EMAIL_COMPOSE_HREF}

            className="btn btn-primary contact__cta"

            target="_blank"

            rel="noopener noreferrer"

            onClick={handleEmailClick}

          >

            <i className="fas fa-envelope" aria-hidden />

            {t('contact.emailMe')}

          </a>



          <p className="contact__note">

            <i className="fas fa-circle-check" aria-hidden />

            {t('contact.responseNote')}

          </p>

        </div>

      </div>



      <p className="contact__signoff">{t('contact.ctaFooter')}</p>

    </section>

  );

}


