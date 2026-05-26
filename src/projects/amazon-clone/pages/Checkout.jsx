import { useState } from 'react';
import { Link } from 'react-router-dom';
import { amazonPaths } from '../paths';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { useCart } from '../context/useCart';
import { useLang } from '../context/useLang';
import t from '../i18n';

const SHIPPING = 10;

function Checkout() {
  const { cart, subtotal, totalItems, placeOrder } = useCart();
  const { lang } = useLang();
  const tx = t[lang];
  const [orderPlaced, setOrderPlaced] = useState(false);

  const total = cart.length > 0 ? subtotal + SHIPPING : 0;

  function handlePlaceOrder() {
    placeOrder();
    setOrderPlaced(true);
  }

  if (orderPlaced) {
    return (
      <>
        <Header />
        <div className='page-content' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
          <div className='order-success'>
            <div className='order-success-icon'>✅</div>
            <h2>{tx.orderPlaced}</h2>
            <p>{tx.thankYou}</p>
            <Link to={amazonPaths.home} className='continue-shopping-btn'>
              {tx.browseProducts}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className='page-content' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
        {cart.length === 0 ? (
          <div className='empty-state'>
            <p>🛒 {tx.emptyCart}</p>
            <Link to={amazonPaths.home} className='continue-shopping-btn'>
              {tx.browseProducts}
            </Link>
          </div>
        ) : (
          <div className='checkout-page'>
            <div className='checkout-left'>
              <h2>{tx.yourCart(totalItems)}</h2>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className='checkout-right'>
              <h2>{tx.orderSummary}</h2>

              <div className='summary-row'>
                <span>{tx.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className='summary-row'>
                <span>{tx.shipping}</span>
                <span>${SHIPPING.toFixed(2)}</span>
              </div>

              <div className='summary-divider' />

              <div className='summary-row total'>
                <span>{tx.total}</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className='place-order-btn' onClick={handlePlaceOrder}>
                {tx.placeOrder}
              </button>

              <Link to={amazonPaths.home} className='back-link'>
                {tx.continueShopping}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
