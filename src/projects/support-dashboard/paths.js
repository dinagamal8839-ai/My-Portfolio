/** Base path for the Support Analytics Dashboard (nested under the portfolio app). */
export const SUPPORT_DASHBOARD_BASE = '/support-dashboard';

export const dashboardPaths = {
  home: SUPPORT_DASHBOARD_BASE,
  login: `${SUPPORT_DASHBOARD_BASE}/login`,
  orders: `${SUPPORT_DASHBOARD_BASE}/orders`,
  products: `${SUPPORT_DASHBOARD_BASE}/products`,
  customers: `${SUPPORT_DASHBOARD_BASE}/customers`,
  analytics: `${SUPPORT_DASHBOARD_BASE}/analytics`,
  notifications: `${SUPPORT_DASHBOARD_BASE}/notifications`,
  settings: `${SUPPORT_DASHBOARD_BASE}/settings`,
};

/** Strip portfolio base so route keys stay simple (e.g. `/orders`). */
export function stripDashboardBase(pathname) {
  if (pathname === SUPPORT_DASHBOARD_BASE) return '/';
  const prefix = `${SUPPORT_DASHBOARD_BASE}/`;
  if (pathname.startsWith(prefix)) return `/${pathname.slice(prefix.length)}`;
  return pathname;
}
