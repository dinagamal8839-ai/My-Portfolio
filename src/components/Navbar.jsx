import { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import '../styles/Navbar.css';

const NAV_KEYS = [
  { key: 'nav.home', href: '#home', id: 'home' },
  { key: 'nav.about', href: '#about', id: 'about' },
  { key: 'nav.skills', href: '#skills', id: 'skills' },
  { key: 'nav.services', href: '#services', id: 'services' },
  { key: 'nav.projects', href: '#projects', id: 'projects' },
  { key: 'nav.contact', href: '#contact', id: 'contact' },
];

export default function Navbar({ dark, onToggleDark }) {
  const { t, lang, toggleLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section[id]');
      let current = 'home';
      sections.forEach((s) => {
        if (window.scrollY >= s.offsetTop - 120) current = s.id;
      });
      setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);
  const langLabel = lang === 'en' ? t('nav.switchToArabic') : t('nav.switchToEnglish');

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__logo">Dina Abdelnasser</div>

      <ul className={`navbar__links${menuOpen ? ' open' : ''}`}>
        {NAV_KEYS.map(({ key, href, id }) => (
          <li key={id}>
            <a
              href={href}
              className={activeSection === id ? 'active' : ''}
              onClick={closeMenu}
            >
              {t(key)}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="navbar__lang-btn"
            onClick={toggleLanguage}
            aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
            lang={lang === 'en' ? 'ar' : 'en'}
          >
            {langLabel}
          </button>
        </li>
        <li>
          <button
            className="navbar__mode-btn"
            onClick={onToggleDark}
            aria-label={t('nav.toggleDark')}
          >
            <i className={dark ? 'fas fa-sun' : 'fas fa-moon'} />
          </button>
        </li>
      </ul>

      <div className="navbar__actions-mobile">
        <button
          type="button"
          className="navbar__lang-btn navbar__lang-btn--compact"
          onClick={toggleLanguage}
          aria-label={lang === 'en' ? 'Switch to Arabic' : 'Switch to English'}
          lang={lang === 'en' ? 'ar' : 'en'}
        >
          {langLabel}
        </button>
        <button
          className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={t('nav.toggleMenu')}
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>
    </nav>
  );
}
