import React from "react";
import "../assets/css/cartside.css";
import QuantityInput from "../components/product/QuantityInput";
import { useCart } from "../context/cartContext";
import { Link } from "react-router-dom";
import { APP_API_URL } from "../assets/config/API";
function CartSide({ handleToggle, openCart }) {
  const { cartItems, removeCart, updateQuantity } = useCart();

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  return (
    <div className={`cartside-container ${openCart ? "active" : ""}`}>
      <div className="cartside-title">
        <h2>Shopping bag</h2>
        <p onClick={handleToggle}>&times;</p>
      </div>
      <p className="item-count">{cartItems.length} items</p>

      <div className="bag-items">
        {Array.isArray(cartItems) &&
          cartItems.length > 0 &&
          cartItems?.map((item, index) => (
            <div className="bag-item" key={`${item._id}-${index}`}>
              <img
                src={`${APP_API_URL}${item?.images[0]}`}
                alt={item.name}
                className="item-image"
              />
              <div className="item-info">
                <div className="item-info-content">
                  <p className="item-name">{item.name}</p>
                  <p className="item-variant">{item.additionalInfo.material}</p>
                  <p className="item-price">${item.price}</p>
                </div>
                <QuantityInput itemId={item._id} quantity={item.quantity} />
              </div>
              <button
                className="remove-btn"
                onClick={() => removeCart(item._id)}
              >
                &times;
              </button>
            </div>
          ))}
      </div>

      <div className="subtotal">
        <p>Subtotal ({cartItems.length} items) </p>
        <p className="subtotal-amount">${subtotal.toFixed(2)}</p>
      </div>

      <Link
        to={`${cartItems.length > 0 ? "shoppingcart" : "/shop"}`}
        onClick={handleToggle}
      >
        <button className="view-cart-btn">VIEW CART</button>
      </Link>
    </div>
  );
}
export default CartSide;
