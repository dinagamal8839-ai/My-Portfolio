import { useState, useEffect } from 'react';
import '../styles/Navbar.css';

const NAV_ITEMS = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Services', href: '#services' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ dark, onToggleDark }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Highlight active nav link on scroll
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

  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar__logo">Dina Abdelnasser</div>

      <ul className={`navbar__links${menuOpen ? ' open' : ''}`}>
        {NAV_ITEMS.map(({ label, href }) => (
          <li key={label}>
            <a
              href={href}
              className={activeSection === href.slice(1) ? 'active' : ''}
              onClick={closeMenu}
            >
              {label}
            </a>
          </li>
        ))}
        <li>
          <button
            className="navbar__mode-btn"
            onClick={onToggleDark}
            aria-label="Toggle dark mode"
          >
            <i className={dark ? 'fas fa-sun' : 'fas fa-moon'} />
          </button>
        </li>
      </ul>

      <button
        className={`navbar__hamburger${menuOpen ? ' open' : ''}`}
        onClick={() => setMenuOpen((o) => !o)}
        aria-label="Toggle menu"
        aria-expanded={menuOpen}
      >
        <span /><span /><span />
      </button>
    </nav>
  );
}
