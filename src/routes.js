import { AMAZON_CLONE_BASE } from './projects/amazon-clone/paths';
import { CHATBOT_BASE } from './projects/chatbot/paths';
import { SUPPORT_DASHBOARD_BASE } from './projects/support-dashboard/paths';

/** Central registry for portfolio app routes (add future project demos here). */
export const ROUTES = {
  portfolio: '/',
  amazonClone: AMAZON_CLONE_BASE,
  chatbot: CHATBOT_BASE,
  supportDashboard: SUPPORT_DASHBOARD_BASE,
};
