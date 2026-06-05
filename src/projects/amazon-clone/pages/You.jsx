import { Link } from 'react-router-dom';
import { amazonPaths } from '../paths';
import Header from '../components/Header';
import { useCart } from '../context/useCart';
import t from '../i18n';

const USER = {
  name: 'Dina Gharib',
  email: 'dina.gharib@email.com',
  phone: '+1 (555) 204-8821',
  address: '42 Maple Street, Apt 3B, New York, NY 10012',
  memberSince: 'March 2022',
  avatar: 'DG',
};

function You() {
  const { orders, cart, subtotal } = useCart();

  return (
    <>
      <Header />

      <div className='page-content'>
        <div className='you-page'>

          <section className='you-section'>
            <h2 className='you-section-title'>{t.yourAccount}</h2>
            <div className='profile-card'>
              <div className='profile-avatar'>{USER.avatar}</div>
              <div className='profile-details'>
                <h3 className='profile-name'>{USER.name}</h3>
                <div className='profile-rows'>
                  <div className='profile-row'>
                    <span className='profile-label'>
                      <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z' /><polyline points='22,6 12,13 2,6' /></svg>
                      {t.email}
                    </span>
                    <span>{USER.email}</span>
                  </div>
                  <div className='profile-row'>
                    <span className='profile-label'>
                      <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.4 2 2 0 0 1 3.6 1.22h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z' /></svg>
                      {t.phone}
                    </span>
                    <span>{USER.phone}</span>
                  </div>
                  <div className='profile-row'>
                    <span className='profile-label'>
                      <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' /><circle cx='12' cy='10' r='3' /></svg>
                      {t.address}
                    </span>
                    <span>{USER.address}</span>
                  </div>
                  <div className='profile-row'>
                    <span className='profile-label'>
                      <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><rect x='3' y='4' width='18' height='18' rx='2' ry='2' /><line x1='16' y1='2' x2='16' y2='6' /><line x1='8' y1='2' x2='8' y2='6' /><line x1='3' y1='10' x2='21' y2='10' /></svg>
                      {t.memberSince}
                    </span>
                    <span>{USER.memberSince}</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className='you-section'>
            <h2 className='you-section-title'>{t.yourOrders}</h2>
            {orders.length === 0 ? (
              <div className='you-empty'>
                <span className='you-empty-icon'>📦</span>
                <p>{t.noOrders}</p>
                <Link to={amazonPaths.home} className='continue-shopping-btn'>{t.browseProducts}</Link>
              </div>
            ) : (
              <div className='orders-list'>
                {orders.map((order) => (
                  <div key={order.id} className='order-card'>
                    <div className='order-card-header'>
                      <div>
                        <span className='order-label'>{t.orderPlacedLabel}</span>
                        <span className='order-value'>{order.date}</span>
                      </div>
                      <div>
                        <span className='order-label'>{t.total}</span>
                        <span className='order-value'>${order.total.toFixed(2)}</span>
                      </div>
                      <div>
                        <span className='order-label'>{t.itemsLabel}</span>
                        <span className='order-value'>{order.items.reduce((s, i) => s + i.quantity, 0)}</span>
                      </div>
                      <span className={`order-status order-status--${order.status.toLowerCase()}`}>
                        {t.processing}
                      </span>
                    </div>
                    <div className='order-items-preview'>
                      {order.items.map((item) => (
                        <div key={item.id} className='order-item-row'>
                          <img src={item.image} alt={item.name} />
                          <div className='order-item-info'>
                            <p className='order-item-name'>{item.name}</p>
                            <p className='order-item-meta'>{t.qty}: {item.quantity} · ${(item.price * item.quantity).toFixed(2)}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>

          <section className='you-section'>
            <h2 className='you-section-title'>{t.draftCart}</h2>
            {cart.length === 0 ? (
              <div className='you-empty'>
                <span className='you-empty-icon'>🛒</span>
                <p>{t.cartEmpty}</p>
                <Link to={amazonPaths.home} className='continue-shopping-btn'>{t.addItems}</Link>
              </div>
            ) : (
              <div className='draft-cart-card'>
                <div className='draft-cart-items'>
                  {cart.map((item) => (
                    <div key={item.id} className='order-item-row'>
                      <img src={item.image} alt={item.name} />
                      <div className='order-item-info'>
                        <p className='order-item-name'>{item.name}</p>
                        <p className='order-item-meta'>{t.qty}: {item.quantity} · ${(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className='draft-cart-footer'>
                  <span className='draft-cart-total'>
                    {t.subtotalLabel(cart.reduce((s, i) => s + i.quantity, 0), subtotal.toFixed(2))}
                  </span>
                  <Link to={amazonPaths.checkout} className='continue-shopping-btn'>{t.goToCheckout}</Link>
                </div>
              </div>
            )}
          </section>

        </div>
      </div>
    </>
  );
}

export default You;
