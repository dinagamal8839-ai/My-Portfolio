import { SOCIAL_LINKS } from '../data/socialLinks';
import { useFloatingSocialSidebar } from '../hooks/useFloatingSocialSidebar';
import { openEmailCompose, DEFAULT_EMAIL_SUBJECT } from '../utils/mailto';
import '../styles/FloatingSocialSidebar.css';

export default function FloatingSocialSidebar() {
  const { hidden } = useFloatingSocialSidebar();

  return (
    <aside
      className={`social-sidebar${hidden ? ' social-sidebar--hidden' : ''}`}
      aria-label="Social links"
      aria-hidden={hidden}
    >
      {SOCIAL_LINKS.map((link) => {
        const linkProps = link.external
          ? { target: '_blank', rel: 'noopener noreferrer' }
          : {};

        const emailProps = link.isEmail
          ? {
              target: '_blank',
              rel: 'noopener noreferrer',
              onClick: (e) => {
                e.preventDefault();
                openEmailCompose({ subject: DEFAULT_EMAIL_SUBJECT });
              },
            }
          : linkProps;

        return (
          <a
            key={link.id}
            href={link.href}
            className="social-sidebar__link"
            aria-label={link.label}
            tabIndex={hidden ? -1 : 0}
            {...emailProps}
          >
            <i className={link.icon} />
          </a>
        );
      })}
    </aside>
  );
}
