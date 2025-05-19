import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/cartContext";
import { APP_API_URL } from "../../assets/config/API";

export default function ProductCard({ product }) {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const handleClick = () => {
    navigate(`/shop/${product._id}`);
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-img">
        <img
          src={`${APP_API_URL}${product.images[0]}`}
          alt={product.name}
        ></img>
        <button
          className="add-to-cart-btn"
          onClick={(e) => {
            e.stopPropagation();
            addToCart({ ...product, quantity: 1 });
          }}
        >
          ADD TO CART
        </button>
      </div>
      <p className="product-title">{product.name}</p>
      <p className="product-price">$ {product.price}</p>
    </div>
  );
}
