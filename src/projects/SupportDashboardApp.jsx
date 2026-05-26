import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { AuthProvider } from './support-dashboard/context/AuthContext.jsx';
import { NotificationsProvider } from './support-dashboard/context/NotificationsContext.jsx';
import { ProtectedRoute } from './support-dashboard/components/auth/ProtectedRoute.jsx';
import { DashboardLayout } from './support-dashboard/components/layout/DashboardLayout.jsx';
import { AnalyticsPage } from './support-dashboard/pages/AnalyticsPage.jsx';
import { CustomersPage } from './support-dashboard/pages/CustomersPage.jsx';
import { DashboardHome } from './support-dashboard/pages/DashboardHome.jsx';
import { LoginPage } from './support-dashboard/pages/LoginPage.jsx';
import { NotificationsPage } from './support-dashboard/pages/NotificationsPage.jsx';
import { OrdersPage } from './support-dashboard/pages/OrdersPage.jsx';
import { ProductsPage } from './support-dashboard/pages/ProductsPage.jsx';
import { SettingsPage } from './support-dashboard/pages/SettingsPage.jsx';
import ProjectShell from './shared/ProjectShell.jsx';
import './shared/ProjectShell.css';
import './support-dashboard/styles/global.css';
import './support-dashboard/styles/portfolioReturnButton.css';

export default function SupportDashboardApp() {
  const location = useLocation();

  return (
    <AuthProvider>
      <NotificationsProvider>
        <ProjectShell className="support-dashboard-app" showBackLink={false} key={location.pathname}>
          <Routes>
            <Route path="login" element={<LoginPage />} />
            <Route element={<ProtectedRoute />}>
              <Route element={<DashboardLayout />}>
                <Route index element={<DashboardHome />} />
                <Route path="orders" element={<OrdersPage />} />
                <Route path="products" element={<ProductsPage />} />
                <Route path="customers" element={<CustomersPage />} />
                <Route path="analytics" element={<AnalyticsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="settings" element={<SettingsPage />} />
                <Route path="*" element={<Navigate to="" replace />} />
              </Route>
            </Route>
          </Routes>
        </ProjectShell>
      </NotificationsProvider>
    </AuthProvider>
  );
}
