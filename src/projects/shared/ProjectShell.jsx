import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import './ProjectShell.css';

export default function ProjectShell({ className = 'project-demo-app', showBackLink = true, children }) {
  const { t } = useLanguage();

  return (
    <div className={className}>
      {showBackLink ? (
        <Link to="/" className="project-demo-app__back" aria-label={t('projectShell.back')}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <polyline points="15 18 9 12 15 6" />
          </svg>
          {t('projectShell.back')}
        </Link>
      ) : null}
      <div className="project-demo-app__content">{children}</div>
    </div>
  );
}
