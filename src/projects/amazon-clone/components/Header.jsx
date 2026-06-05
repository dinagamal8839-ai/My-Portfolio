import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { amazonPaths } from '../paths';
import t from '../i18n';

function Header({ searchQuery, onSearchChange }) {
  const { totalItems } = useCart();
  const [accountOpen, setAccountOpen] = useState(false);

  return (
    <header className='header'>

      <div className='header-left'>
        <Link to={amazonPaths.home} className='logo'>{t.logo}</Link>

        <div className='header-location'>
          <svg width='15' height='15' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'>
            <path d='M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z' />
            <circle cx='12' cy='10' r='3' />
          </svg>
          <div className='location-text'>
            <span className='location-top'>Delivering to</span>
            <span className='location-bottom'>New Cairo</span>
          </div>
        </div>
      </div>

      <div className='search-wrapper'>
        {onSearchChange !== undefined ? (
          <input
            className='search-bar'
            type='text'
            placeholder={t.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        ) : (
          <div className='search-bar search-bar-disabled'>{t.searchPlaceholder}</div>
        )}
        <button className='search-btn' aria-label='Search'>
          <svg width='18' height='18' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
            <circle cx='11' cy='11' r='8' />
            <line x1='21' y1='21' x2='16.65' y2='16.65' />
          </svg>
        </button>
      </div>

      <div className='header-right'>

        <div className='header-account-wrapper'>
          <button
            className='header-account'
            onClick={() => setAccountOpen((p) => !p)}
            aria-label='Account menu'
          >
            <span className='account-top'>Hello, sign in</span>
            <span className='account-bottom'>
              Account & Lists
              <svg width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='3' strokeLinecap='round' strokeLinejoin='round'>
                <polyline points='6 9 12 15 18 9' />
              </svg>
            </span>
          </button>

          {accountOpen && (
            <div className='account-dropdown'>
              <Link to={amazonPaths.you} className='account-dropdown-item' onClick={() => setAccountOpen(false)}>
                👤 Your Account
              </Link>
              <div className='account-dropdown-divider' />
              <button className='account-dropdown-item account-dropdown-btn' onClick={() => setAccountOpen(false)}>
                🔄 Switch Account
              </button>
              <button className='account-dropdown-item account-dropdown-btn' onClick={() => setAccountOpen(false)}>
                🚪 Sign Out
              </button>
            </div>
          )}
        </div>

        <Link to={amazonPaths.you} className='header-orders'>
          <span className='account-top'>Returns</span>
          <span className='account-bottom'>& Orders</span>
        </Link>

        <Link to={amazonPaths.checkout} className='header-cart' aria-label={t.cart}>
          <div className='cart-icon-wrapper'>
            <svg width='34' height='34' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.8' strokeLinecap='round' strokeLinejoin='round'>
              <circle cx='9' cy='21' r='1' />
              <circle cx='20' cy='21' r='1' />
              <path d='M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6' />
            </svg>
            {totalItems > 0 && <span className='cart-badge'>{totalItems}</span>}
          </div>
          <span className='account-bottom'>{t.cart}</span>
        </Link>

      </div>
    </header>
  );
}

export default Header;
