import { useState } from 'react';
import { Link } from 'react-router-dom';
import { amazonPaths } from '../paths';
import Header from '../components/Header';
import CartItem from '../components/CartItem';
import { useCart } from '../context/useCart';
import t from '../i18n';

const SHIPPING = 10;

function Checkout() {
  const { cart, subtotal, totalItems, placeOrder } = useCart();
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
        <div className='page-content'>
          <div className='order-success'>
            <div className='order-success-icon'>✅</div>
            <h2>{t.orderPlaced}</h2>
            <p>{t.thankYou}</p>
            <Link to={amazonPaths.home} className='continue-shopping-btn'>
              {t.browseProducts}
            </Link>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Header />

      <div className='page-content'>
        {cart.length === 0 ? (
          <div className='empty-state'>
            <p>🛒 {t.emptyCart}</p>
            <Link to={amazonPaths.home} className='continue-shopping-btn'>
              {t.browseProducts}
            </Link>
          </div>
        ) : (
          <div className='checkout-page'>
            <div className='checkout-left'>
              <h2>{t.yourCart(totalItems)}</h2>
              {cart.map((item) => (
                <CartItem key={item.id} item={item} />
              ))}
            </div>

            <div className='checkout-right'>
              <h2>{t.orderSummary}</h2>

              <div className='summary-row'>
                <span>{t.subtotal}</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <div className='summary-row'>
                <span>{t.shipping}</span>
                <span>${SHIPPING.toFixed(2)}</span>
              </div>

              <div className='summary-divider' />

              <div className='summary-row total'>
                <span>{t.total}</span>
                <span>${total.toFixed(2)}</span>
              </div>

              <button className='place-order-btn' onClick={handlePlaceOrder}>
                {t.placeOrder}
              </button>

              <Link to={amazonPaths.home} className='back-link'>
                {t.continueShopping}
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Checkout;
