// src/pages/Product.jsx
import React, { useEffect, useState } from "react";
import { Outlet, useParams, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import icons from "../assets/img/icon";
import { productIcon } from "../assets/img/icon";
import ProductCard from "../components/home/ProductCard";
import QuantityInput from "../components/product/QuantityInput";
import "../assets/css/product/product.css";
import { useCart } from "../context/cartContext";
import { APP_API_URL } from "../assets/config/API";

const {
  FaRegHeart,
  FaRegEnvelope,
  FaInstagram,
  FaFacebookF,
  FaTwitter,
  FaHeart,
} = productIcon;

export default function Product() {
  const { cartItems, addToCart, updateQuantity } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isLiked, setIsLiked] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  const [reviewNumber, setReviewNumber] = useState(0);

  const handleSetReviewNumber = (number) => {
    setReviewNumber(number);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${APP_API_URL}/api/products/${id}`);
        setProduct(res.data.product);
        setRelatedProducts(res.data.similarProducts);
      } catch (err) {
        console.error("Lỗi khi fetch sản phẩm:", err);
        navigate("*");
      }
    };

    fetchProduct();
  }, [id]);

  const HeartIcon = isLiked ? FaHeart : FaRegHeart;
  const handleIsLiked = () => setIsLiked(!isLiked);

  return (
    <div className="product-wrapper">
      <div className="main-section">
        {/* Hình ảnh và nội dung chính */}
        <div className="main-pic-box">
          <div className="side-pic">
            {product?.images?.map((img, i) => (
              <img key={i} src={`${APP_API_URL}${img}`} alt={`side-img-${i}`} />
            ))}
          </div>
          <div className="main-pic">
            <img
              src={`${APP_API_URL}${product?.images?.[0]}`}
              alt="main-product"
            />
          </div>
        </div>

        <div className="main-product-content">
          <div className="basic-content">
            <h3 className="title">{product?.name}</h3>
            <p className="price">$ {product?.price?.toFixed(2)}</p>
          </div>

          <div className="review-descript">
            <div className="rate-star"></div>
            <div className="decription">{product?.description}</div>
          </div>

          <div className="add-cart-box">
            <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            <div className="add-to-cart">
              <button
                className="add-btn"
                onClick={() => addToCart({ ...product, quantity })}
              >
                ADD TO CART
              </button>
            </div>
          </div>

          <div className="social-icon">
            <div className="icon-item love-icon">
              <HeartIcon
                className="icon-item"
                style={{ color: `${isLiked ? "red" : "inherit"}` }}
                onClick={handleIsLiked}
              />
            </div>
            <span className="line-interupt"></span>
            <div className="contact-icon">
              <FaRegEnvelope className="icon-item" />
              <FaFacebookF className="icon-item" />
              <FaInstagram className="icon-item" />
              <FaTwitter className="icon-item" />
            </div>
          </div>

          <div className="categories">
            <h5 className="text">
              Categories:{" "}
              <span>
                {product?.category?.length
                  ? product.category.map((c) => c.name).join(", ")
                  : "Uncategorized"}
              </span>
            </h5>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="sub-section">
        <div className="main-title">
          <NavLink
            to="description"
            className={({ isActive }) => `title ${isActive ? "active" : ""}`}
          >
            Description
          </NavLink>
          <NavLink
            to="addInformation"
            className={({ isActive }) => `title ${isActive ? "active" : ""}`}
          >
            Additional information
          </NavLink>
          <NavLink
            to="review"
            className={({ isActive }) => `title ${isActive ? "active" : ""}`}
          >
            Reviews({reviewNumber})
          </NavLink>
        </div>
        {/* Truyền context cho các route con */}
        <Outlet context={{ product, handleSetReviewNumber }} />
      </div>

      {/* Similar Products */}
      <div className="similar-product-block">
        <h2 className="title">Similar Items</h2>
        <div className="similar-products">
          {relatedProducts && relatedProducts.length > 0 ? (
            relatedProducts.map((p) => <ProductCard key={p._id} product={p} />)
          ) : (
            <p>Không có sản phẩm liên quan</p>
          )}
        </div>
      </div>
    </div>
  );
}
