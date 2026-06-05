import { useCart } from '../context/useCart';
import t from '../i18n';

function CartItem({ item }) {
  const { removeItem, increment, decrement } = useCart();

  return (
    <div className='cart-item'>
      <img src={item.image} alt={item.name} />

      <div className='cart-item-details'>
        <h3>{item.name}</h3>
        <p className='cart-item-price'>${(item.price * item.quantity).toFixed(2)}</p>
        <p className='cart-item-unit-price'>${item.price} {t.each}</p>
      </div>

      <div className='cart-item-controls'>
        <div className='quantity-controls'>
          <button className='qty-btn' onClick={() => decrement(item.id)}>−</button>
          <span className='qty-value'>{item.quantity}</span>
          <button className='qty-btn' onClick={() => increment(item.id)}>+</button>
        </div>
        <button className='remove-btn' onClick={() => removeItem(item.id)}>
          {t.remove}
        </button>
      </div>
    </div>
  );
}

export default CartItem;
