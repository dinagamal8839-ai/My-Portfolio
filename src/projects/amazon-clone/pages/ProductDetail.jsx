import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import { useCart } from '../context/useCart';
import { useLang } from '../context/useLang';
import products from '../data/products';
import { getProductDetails } from '../data/productDetails';
import t from '../i18n';

function StarRating({ rating }) {
  return (
    <span className='stars' aria-label={`${rating} out of 5`}>
      {[1, 2, 3, 4, 5].map((s) => {
        const fill = rating >= s ? 'full' : rating >= s - 0.5 ? 'half' : 'empty';
        return (
          <span key={s} className={`star star--${fill}`}>
            {fill === 'full' ? '★' : fill === 'half' ? '⯨' : '☆'}
          </span>
        );
      })}
    </span>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem, cart } = useCart();
  const { lang } = useLang();
  const tx = t[lang];
  const [qty, setQty] = useState(1);

  const product = products.find((p) => p.id === Number(id));
  if (!product) {
    return (
      <>
        <Header />
        <div className='page-content'>
          <p>Product not found.</p>
        </div>
      </>
    );
  }

  const { shop, rating, reviewCount, stock, deliveryOptions, specs } = getProductDetails(product);
  const cartItem = cart.find((item) => item.id === product.id);
  const inCart = !!cartItem;

  function handleAdd() {
    for (let i = 0; i < qty; i++) addItem(product);
  }

  return (
    <>
      <Header />
      <div className='page-content pd-page' dir={lang === 'ar' ? 'rtl' : 'ltr'}>

        {/* Back arrow */}
        <button className='pd-back' onClick={() => navigate(-1)} aria-label='Go back'>
          <svg width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2.5' strokeLinecap='round' strokeLinejoin='round'>
            <polyline points='15 18 9 12 15 6' />
          </svg>
          {lang === 'ar' ? 'رجوع' : 'Back'}
        </button>

        <div className='pd-layout'>

          {/* ── Left: image ── */}
          <div className='pd-image-col'>
            <div className='pd-image-wrapper'>
              <img src={product.image} alt={product.name} />
            </div>
          </div>

          {/* ── Middle: info ── */}
          <div className='pd-info-col'>
            <p className='pd-shop'>
              <svg width='13' height='13' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round'><path d='M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z' /><polyline points='9 22 9 12 15 12 15 22' /></svg>
              {lang === 'ar' ? 'يُباع بواسطة' : 'Sold by'} <strong>{shop}</strong>
            </p>

            <h1 className='pd-title'>{product.name}</h1>

            <div className='pd-rating-row'>
              <StarRating rating={rating} />
              <span className='pd-rating-value'>{rating}</span>
              <span className='pd-review-count'>({reviewCount.toLocaleString()} {lang === 'ar' ? 'تقييم' : 'reviews'})</span>
            </div>

            <div className='pd-divider' />

            <p className='pd-price'>${product.price.toFixed(2)}</p>
            <p className='pd-vat'>{lang === 'ar' ? 'شامل ضريبة القيمة المضافة' : 'Inclusive of VAT'}</p>

            <div className='pd-stock'>
              <span className={stock > 10 ? 'in-stock' : 'low-stock'}>
                {stock > 10
                  ? (lang === 'ar' ? '✓ متوفر في المخزون' : '✓ In Stock')
                  : (lang === 'ar' ? `⚠ ${stock} قطع متبقية فقط` : `⚠ Only ${stock} left in stock`)}
              </span>
            </div>

            {/* Specs */}
            <div className='pd-specs'>
              <h3>{lang === 'ar' ? 'مواصفات المنتج' : 'Product Specifications'}</h3>
              <table className='specs-table'>
                <tbody>
                  {Object.entries(specs).map(([key, val]) => (
                    <tr key={key}>
                      <td className='spec-key'>{key}</td>
                      <td className='spec-val'>{val}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── Right: buy box ── */}
          <div className='pd-buy-col'>
            <div className='pd-buy-box'>
              <p className='pd-buy-price'>${product.price.toFixed(2)}</p>

              {/* Delivery options */}
              <div className='pd-delivery'>
                <h4>{lang === 'ar' ? 'خيارات التوصيل' : 'Delivery Options'}</h4>
                {deliveryOptions.map((opt) => (
                  <div key={opt.label} className='delivery-row'>
                    <div>
                      <p className='delivery-label'>{opt.label}</p>
                      <p className='delivery-days'>{opt.days}</p>
                    </div>
                    <span className={`delivery-price ${opt.price === 'Free' ? 'free' : ''}`}>
                      {opt.price === 'Free' ? (lang === 'ar' ? 'مجاني' : 'Free') : opt.price}
                    </span>
                  </div>
                ))}
              </div>

              <div className='pd-divider' />

              {/* Qty + Add to cart */}
              <div className='pd-buy-qty'>
                <label htmlFor='pd-qty'>{lang === 'ar' ? 'الكمية:' : 'Qty:'}</label>
                <select id='pd-qty' className='qty-select' value={qty} onChange={(e) => setQty(Number(e.target.value))}>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>

              <button className={`pd-add-btn ${inCart ? 'in-cart' : ''}`} onClick={handleAdd}>
                {inCart ? tx.inCart(cartItem.quantity) : tx.addToCart}
              </button>

              <div className='pd-trust'>
                <span>🔒 {lang === 'ar' ? 'دفع آمن' : 'Secure payment'}</span>
                <span>↩ {lang === 'ar' ? 'إرجاع مجاني خلال 30 يوم' : '30-day free returns'}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
