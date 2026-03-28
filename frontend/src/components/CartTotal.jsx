import { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import '../style/CartTotal.css';

const CartTotal = () => {
  const { currency, delivery_fee, checkoutItems,getCartAmount ,products} = useContext(ShopContext);

  
  let subtotal = 0
checkoutItems.forEach((item) => {
  const product = products.find(p => p._id === item.productId)
  if(product){
    subtotal += product.price * item.quantity
  }
})
  return (
    <div className="cart-total">
      <div className="cart-total-title">
        <Title text1="CART" text2="TOTALS" />
      </div>

      <div className="cart-total-details">
        <div className="cart-total-row">
          <p>Subtotal</p>
          <p>
            {currency} {subtotal}.00
          </p>
        </div>

        <hr />

        <div className="cart-total-row">
          <p>Shipping Fee</p>
          <p>
            {currency} {delivery_fee}.00
          </p>
        </div>

        <hr />

        <div className="cart-total-row cart-total-final">
          <b>Total</b>
          <b>
  
          {currency} {subtotal + delivery_fee}.00
          </b>
        </div>
      </div>
    </div>
  );
};

export default CartTotal;