import React from "react";
import { useCart } from "../../context/cartContext";
function QuantityInput({ itemId, quantity, setQuantity }) {
  const { updateQuantity } = useCart();

  const handleDecrease = () => {
    if (setQuantity) {
      setQuantity((prev) => Math.max(1, prev - 1));
    } else if (itemId) {
      updateQuantity(itemId, -1);
    }
  };

  const handleIncrease = () => {
    if (setQuantity) {
      setQuantity((prev) => prev + 1);
    } else if (itemId) {
      updateQuantity(itemId, 1);
    }
  };

  return (
    <div className="quantity-input">
      <button className="downbtn" onClick={handleDecrease}>
        -
      </button>
      <span className="value">{quantity}</span>
      <button className="upbtn" onClick={handleIncrease}>
        +
      </button>
    </div>
  );
}

export default QuantityInput;
