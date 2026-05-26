import project1 from '../assets/project1.png';
import amazonClonePreview from '../assets/amazon-clone.png';
import supportDashboardPreview from '../assets/support-dashboard.png';
import { AMAZON_CLONE_BASE } from '../projects/amazon-clone/paths';
import { CHATBOT_BASE } from '../projects/chatbot/paths';
import { SUPPORT_DASHBOARD_BASE } from '../projects/support-dashboard/paths';

const projects = [
  {
    id: 1,
    title: 'E-commerace Website',
    description: 'A clean, responsive shopping interface featuring product grids and cart functionality.',
    image: amazonClonePreview,
    tags: ['React', 'React Router', 'CSS'],
    routePath: AMAZON_CLONE_BASE,
  },
  {
    id: 2,
    title: 'ChatBot',
    description: 'Interactive chatbot that can flip a coin, play rock-paper-scissors, and display today\'s date.',
    image: project1,
    tags: ['React', 'JavaScript', 'API'],
    routePath: CHATBOT_BASE,
  },
  {
    id: 3,
    title: 'Support Analytics Dashboard',
    description: 'Internal tool for tracking technical support tickets and response times.',
    image: supportDashboardPreview,
    tags: ['React', 'Recharts', 'Lucide'],
    routePath: SUPPORT_DASHBOARD_BASE,
    cardVariant: 'glow',
  },
];

export default projects;
