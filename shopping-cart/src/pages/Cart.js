import { useContext } from "react";
import { CartContext } from "../context";
import { CartItem } from "./CartItem";

export const Cart = () => {
  const { showHideCart, cartItems, showCart } = useContext(CartContext);
  return (
    <>
      {showCart && (
        <div className="cart_wrapper">
          <div>
            <i
              className="fa fa-times-circle"
              aria-hidden="true"
              onClick={showHideCart}
            ></i>
          </div>
          <div className="cart_innerWrapper">
            {cartItems.length == 0 ? (
              <h4>Cart is Empty</h4>
            ) : (
              <ul>
                {cartItems.map((x) => {
                return  <CartItem key={x._id} x={x} />;
                })}
              </ul>
            )}
          </div>
          <div className="cart_total">
            <h3>Cart Total:</h3>
            <div></div>
            <div className="">
              {(cartItems.reduce((oldAmount, x) => oldAmount + x.price, 0)).toFixed(2)} $
            </div>
          </div>
        </div>
      )}
    </>
  );
};
