import { Routes, Route, useLocation } from 'react-router-dom';
import { CartProvider } from './amazon-clone/context/CartContext.jsx';
import { LangProvider } from './amazon-clone/context/LangContext.jsx';
import ProjectShell from './shared/ProjectShell.jsx';
import Home from './amazon-clone/pages/Home.jsx';
import Checkout from './amazon-clone/pages/Checkout.jsx';
import You from './amazon-clone/pages/You.jsx';
import ProductDetail from './amazon-clone/pages/ProductDetail.jsx';
import './shared/ProjectShell.css';
import './amazon-clone/index.css';

export default function AmazonCloneApp() {
  const location = useLocation();

  return (
    <LangProvider>
      <CartProvider>
        <ProjectShell className="amazon-clone-app" key={location.pathname}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="you" element={<You />} />
            <Route path="product/:id" element={<ProductDetail />} />
          </Routes>
        </ProjectShell>
      </CartProvider>
    </LangProvider>
  );
}
