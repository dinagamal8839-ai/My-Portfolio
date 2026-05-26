import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import PortfolioPage from './pages/PortfolioPage';
import AmazonCloneApp from './projects/AmazonCloneApp';
import ChatbotApp from './projects/ChatbotApp';
import SupportDashboardApp from './projects/SupportDashboardApp';
import { ROUTES } from './routes';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <LanguageProvider>
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path={ROUTES.portfolio} element={<PortfolioPage />} />
        <Route path={`${ROUTES.amazonClone}/*`} element={<AmazonCloneApp />} />
        <Route path={`${ROUTES.chatbot}/*`} element={<ChatbotApp />} />
        <Route path={`${ROUTES.supportDashboard}/*`} element={<SupportDashboardApp />} />
      </Routes>
    </BrowserRouter>
    </LanguageProvider>
  );
}
