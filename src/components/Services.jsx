import { useEffect, useRef } from 'react';
import { SERVICES_CONFIG } from '../data/servicesConfig';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';
import '../styles/Services.css';

export default function Services() {
  const { t } = useLanguage();
  const cardRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 100);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    cardRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section className="section services-section" id="services">
      <SectionHeading
        tag="services.tag"
        title="services.title"
        titleHighlight="services.titleHighlight"
        center
      />

      <div className="services__grid">
        {SERVICES_CONFIG.map((s, i) => (
          <div
            className="service-card"
            key={s.id}
            ref={(el) => (cardRefs.current[i] = el)}
          >
            <div className="service-card__icon">
              <i className={s.icon} />
            </div>
            <h4>{t(`services.items.${s.key}.title`)}</h4>
            <p>{t(`services.items.${s.key}.description`)}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
