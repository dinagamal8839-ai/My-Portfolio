import { useReducer } from 'react';
import { CartContext } from './cartContextValue';

function cartReducer(state, action) {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.cart.find((item) => item.id === action.product.id);
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item.id === action.product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cart: [...state.cart, { ...action.product, quantity: 1 }] };
    }
    case 'REMOVE_ITEM':
      return { ...state, cart: state.cart.filter((item) => item.id !== action.id) };
    case 'INCREMENT':
      return {
        ...state,
        cart: state.cart.map((item) =>
          item.id === action.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      };
    case 'DECREMENT':
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.id ? { ...item, quantity: item.quantity - 1 } : item
          )
          .filter((item) => item.quantity > 0),
      };
    case 'PLACE_ORDER': {
      const newOrder = {
        id: Date.now(),
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        items: state.cart,
        total: state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0) + 10,
        status: 'Processing',
      };
      return { cart: [], orders: [newOrder, ...state.orders] };
    }
    default:
      return state;
  }
}

const initialState = { cart: [], orders: [] };

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const { cart, orders } = state;

  const addItem = (product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (id) => dispatch({ type: 'REMOVE_ITEM', id });
  const increment = (id) => dispatch({ type: 'INCREMENT', id });
  const decrement = (id) => dispatch({ type: 'DECREMENT', id });
  const placeOrder = () => dispatch({ type: 'PLACE_ORDER' });

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, orders, addItem, removeItem, increment, decrement, placeOrder, totalItems, subtotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
