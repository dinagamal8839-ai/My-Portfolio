import { useEffect, useMemo, useState } from 'react';
import useTyping from '../hooks/useTyping';
import { useLanguage } from '../context/LanguageContext';
import profileImg from '../assets/profile.jpeg';
import '../styles/Hero.css';

const SCROLL_HIDE_THRESHOLD = 50;

export default function Hero() {
  const { t, lang } = useLanguage();
  const words = useMemo(() => {
    const typingWords = t('hero.typingWords');
    return Array.isArray(typingWords) ? typingWords : [];
  }, [lang, t]);
  const typedText = useTyping(words);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrollIndicatorHidden(window.scrollY > SCROLL_HIDE_THRESHOLD);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="hero" id="home">
      <div className="hero__container">
        <div className="hero__content">
          <p className="hero__tag">{t('hero.tag')}</p>
          <h1>
            {t('hero.greeting')} <span>{t('hero.name')}</span>
          </h1>
          <h2 className="hero__sub">
            <span className="hero__typed">{typedText}</span>
            <span className="hero__cursor" aria-hidden="true" />
          </h2>
          <p>{t('hero.bio')}</p>
          <div className="hero__btns">
            <a href="#contact" className="btn btn-primary">
              <i className="fas fa-paper-plane" /> {t('hero.contactBtn')}
            </a>
            <a href="#projects" className="btn btn-outline">
              <i className="fas fa-folder-open" /> {t('hero.workBtn')}
            </a>
          </div>
        </div>

        <div className="hero__image">
          <div className="blob-wrap">
            <div className="blob-bg" />
            <img src={profileImg} alt={t('hero.profileAlt')} />
          </div>
        </div>
      </div>

      <div className={`scroll-down${scrollIndicatorHidden ? ' fade-out' : ''}`} aria-hidden="true">
        <i className="fas fa-chevron-down" />
        <span>{t('hero.scroll')}</span>
      </div>
    </section>
  );
}
