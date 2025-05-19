import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import "../assets/css/home.css";
import "../assets/css/reset.css";
import { Link } from "react-router-dom";
import ProductCard from "../components/home/ProductCard";
import { banners } from "../components/home/dataBannerHome";
import { APP_API_URL } from "../assets/config/API";

function Home() {
  const [slides, setSlides] = useState(banners);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef();
  const [products, setProducts] = useState(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${APP_API_URL}/api/products`);
        setProducts(res.data);
        // console.log(`${APP_API_URL}/api/products`);
      } catch (err) {
        console.error("Lỗi khi fetch sản phẩm:", err);
      }
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const handleNextSlide = () => {
    if (!sliderRef.current) return;

    sliderRef.current.style.transition = "transform 0.5s ease-in-out";

    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex + 1;

      // Nếu vượt qua slide cuối
      if (newIndex >= slides.length) {
        if (!sliderRef.current) return;
        sliderRef.current.style.transition = "none";
        const newSlides = [
          slides[slides.length - 1],
          ...slides.slice(0, slides.length - 1),
        ];
        setSlides(newSlides);
        setCurrentIndex(0);
      }

      return newIndex;
    });
  };

  const handleClickDot = (index) => {
    if (index >= 0 && index < slides.length) {
      setCurrentIndex(index);
    }
  };

  return (
    <div className="home-container">
      <div className="home-banner-slider">
        <div
          className="home-banner-track"
          ref={sliderRef}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {slides.map((banner, index) => (
            <div className="banner-slide" key={banner._id || index}>
              <img
                src={`${APP_API_URL}${banner.images[0]}` || "/default.jpg"}
                alt={`Slide ${index}`}
              />
              <div className="content-banner">
                <div className="content-block">
                  <h2 className="banner-title">{banner.name}</h2>
                  <h4 className="banner-price">$ {banner.price}</h4>
                </div>
                <Link to={`/shop/${banner._id}`}>
                  <button className="view-more">View Product</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="select-slider">
          {slides.map((_, index) => (
            <span
              key={index}
              className={index === currentIndex ? "active" : ""}
              onClick={() => handleClickDot(index)}
            ></span>
          ))}
        </div>
      </div>

      <div className="box-latest">
        <div className="title">
          <h1>Shop The Latest</h1>
          <Link to="/shop" className="viewall">
            View All
          </Link>
        </div>
        <div className="product-grid">
          {products && products.length > 0 ? (
            products
              .slice(0, 6)
              .map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Home;
