import project1 from '../assets/project1.png';
import amazonClonePreview from '../assets/amazon-clone.png';
import supportDashboardPreview from '../assets/support-dashboard.png';
import { AMAZON_CLONE_BASE } from '../projects/amazon-clone/paths';
import { CHATBOT_BASE } from '../projects/chatbot/paths';
import { SUPPORT_DASHBOARD_BASE } from '../projects/support-dashboard/paths';
import { PROJECT_KEYS } from '../i18n/translations';

export const PROJECTS_CONFIG = [
  {
    id: 1,
    key: PROJECT_KEYS[0],
    image: amazonClonePreview,
    tags: ['React', 'React Router', 'CSS'],
    routePath: AMAZON_CLONE_BASE,
  },
  {
    id: 2,
    key: PROJECT_KEYS[1],
    image: project1,
    tags: ['React', 'JavaScript', 'API'],
    routePath: CHATBOT_BASE,
  },
  {
    id: 3,
    key: PROJECT_KEYS[2],
    image: supportDashboardPreview,
    tags: ['React', 'Recharts', 'Lucide'],
    routePath: SUPPORT_DASHBOARD_BASE,
    cardVariant: 'glow',
  },
];
