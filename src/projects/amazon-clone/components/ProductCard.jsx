import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/useCart';
import { useLang } from '../context/useLang';
import { amazonPaths } from '../paths';
import t from '../i18n';

function ProductCard({ product }) {
  const { addItem, cart } = useCart();
  const { lang } = useLang();
  const tx = t[lang];
  const [qty, setQty] = useState(1);

  const cartItem = cart.find((item) => item.id === product.id);
  const inCart = cartItem !== undefined;

  function handleAdd() {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
  }

  return (
    <div className='product-card' dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <Link to={amazonPaths.product(product.id)} className='product-card-link'>
        <div className='product-image-wrapper'>
          <img src={product.image} alt={product.name} />
        </div>
        <div className='product-info'>
          <h3>{product.name}</h3>
        </div>
      </Link>

      <div className='product-card-footer'>
        <div className='price-qty-row'>
          <p className='product-price'>${product.price.toFixed(2)}</p>
          <select
            id={`qty-${product.id}`}
            className='qty-select'
            value={qty}
            onChange={(e) => setQty(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
              <option key={n} value={n}>{n}</option>
            ))}
          </select>
        </div>

        <button
          className={`add-to-cart-btn ${inCart ? 'in-cart' : ''}`}
          onClick={handleAdd}
        >
          {inCart ? tx.inCart(cartItem.quantity) : tx.addToCart}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
