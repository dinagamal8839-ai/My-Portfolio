import aboutImg from '../assets/about.jpeg';
import { useLanguage } from '../context/LanguageContext';
import SectionHeading from './SectionHeading';
import '../styles/About.css';

export default function About() {
  const { t } = useLanguage();

  const stats = [
    { value: '20+', label: t('about.stats.projects') },
    { value: '3+', label: t('about.stats.technologies') },
    { value: '100%', label: t('about.stats.dedication') },
  ];

  return (
    <section className="section about-section" id="about">
      <div className="about__inner">
        <div className="about__img-wrap">
          <img src={aboutImg} alt={t('about.imageAlt')} className="about__img" />
          <div className="about__badge">
            <strong>{t('about.badgeYears')}</strong>
            <small style={{ whiteSpace: 'pre-line' }}>{t('about.badgeLabel')}</small>
          </div>
        </div>

        <div className="about__content">
          <SectionHeading
            tag="about.tag"
            title="about.title"
            titleHighlight="about.titleHighlight"
          />
          <p>{t('about.p1')}</p>
          <p>{t('about.p2')}</p>

          <div className="about__stats">
            {stats.map(({ value, label }) => (
              <div className="about__stat" key={label}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>

          <a href="#contact" className="btn btn-primary" style={{ marginTop: '1.8rem' }}>
            <i className="fas fa-handshake" /> {t('about.hireBtn')}
          </a>
        </div>
      </div>
    </section>
  );
}
