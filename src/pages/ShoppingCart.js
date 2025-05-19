import React, { useState, useEffect } from "react";
import { useCart } from "../context/cartContext";
import { useUser } from "../context/userContext";
import QuantityInput from "../components/product/QuantityInput";
import { Link } from "react-router-dom";
import "../assets/css/shoppingcart/shoppingcart.css";
import { APP_API_URL } from "../assets/config/API";

const ShoppingCart = () => {
  const { cartItems, removeCart } = useCart();
  const { user } = useUser();

  const [coupon, setCoupon] = useState("");
  const [shipping, setShipping] = useState(null); // chưa tính shipping
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");

  const [error, setError] = useState(""); // thông báo lỗi
  const [shippingCalculated, setShippingCalculated] = useState(false); // kiểm tra đã tính chưa

  useEffect(() => {
    if (user) {
      setCountry(user.country || "");
      setCity(user.city || "");
      setZip(user.zip || "");
    }
  }, [user]);

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const total = subtotal + (shipping || 0);

  const handleApplyCoupon = () => {
    if (coupon === "Ujdueyh") {
      if (shippingCalculated) {
        setShipping(0);
      } else {
        setError("Please update totals before applying coupon.");
      }
    } else {
      if (shippingCalculated) {
        setShipping(5);
      }
      setError("Invalid coupon code.");
    }
  };

  const handleUpdateTotals = () => {
    if (!country || !city || !zip) {
      setError("Please fill in all shipping information.");
      return;
    }

    setError(""); // xóa lỗi
    setShipping(5); // gán shipping
    setShippingCalculated(true); // đã tính rồi
  };

  return (
    <div className="cart-page">
      <h2>Shopping Cart</h2>

      <div className="cart-main">
        {/* Left Side: Items */}
        <div className="cart-items">
          <div className="cart-items-wrapper">
            {cartItems.map((item) => (
              <div key={item._id} className="cart-item">
                <img
                  src={`${APP_API_URL}${item.images[0]}`}
                  alt={item.name}
                  className="item-img"
                />
                <div className="item-details">
                  <h4>{item.name}</h4>
                  <p>{item.material}</p>
                  <p>$ {item.price.toFixed(2)}</p>
                </div>
                <QuantityInput itemId={item._id} quantity={item.quantity} />
                <button
                  className="remove-btn"
                  onClick={() => removeCart(item._id)}
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <div className="update-cart-box">
            <Link to="/shop">
              <button className="update-cart">UPDATE CART</button>
            </Link>
          </div>
          <div className="cart-actions">
            <input
              type="text"
              placeholder="Coupon Code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
            />
            <button className="apply-coupon" onClick={handleApplyCoupon}>
              APPLY COUPON
            </button>
          </div>
        </div>

        {/* Right Side: Summary */}
        <div className="cart-summary">
          <h3>Cart totals</h3>
          <div className="summary-row">
            <span>SUBTOTAL</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="summary-row">
            <span>SHIPPING</span>
            <span>
              {shipping !== null
                ? `$${
                    shipping.toFixed(2) != 0
                      ? shipping.toFixed(2)
                      : "Free Shipping"
                  }`
                : "Not calculated"}
            </span>
          </div>

          <div className="shipping-form">
            <h4>CALCULATE SHIPPING</h4>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select a country</option>
              <option value="vn">Vietnam</option>
              <option value="us">USA</option>
            </select>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
            <input
              type="text"
              placeholder="Postal Code / ZIP"
              value={zip}
              onChange={(e) => setZip(e.target.value)}
            />
            <button className="update-totals" onClick={handleUpdateTotals}>
              UPDATE TOTALS
            </button>
            {error && <p className="error-msg">{error}</p>}
          </div>

          <div className="summary-total">
            <span>TOTAL</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link to="/checkout" state={{ shipping, country, city, zip }}>
            <button
              className="checkout-btn"
              disabled={!shippingCalculated}
              title={!shippingCalculated ? "Please update totals first" : ""}
            >
              PROCEED TO CHECKOUT
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
