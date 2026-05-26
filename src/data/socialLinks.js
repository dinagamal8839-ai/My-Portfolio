import { DEFAULT_EMAIL_SUBJECT, getGmailComposeUrl } from '../utils/mailto';

/** Shared order: GitHub → LinkedIn → Email (matches contact info column). */
export const SOCIAL_LINKS = [
  {
    id: 'github',
    icon: 'fab fa-github',
    label: 'GitHub',
    href: 'https://github.com/dinagamal8839-ai/My-Projects',
    external: true,
  },
  {
    id: 'linkedin',
    icon: 'fab fa-linkedin-in',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/dina-gamal-63296b251/',
    external: true,
  },
  {
    id: 'email',
    icon: 'fas fa-envelope',
    label: 'Email',
    href: getGmailComposeUrl({ subject: DEFAULT_EMAIL_SUBJECT }),
    external: false,
    isEmail: true,
  },
];
