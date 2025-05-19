import React, { useEffect, useState } from "react";
import ProductCard from "../components/home/ProductCard";
import "../assets/css/shop/shop.css";
import SideBar from "../components/shop/Sidebar";
import axios from "axios";
import { APP_API_URL } from "../assets/config/API";

function Shop() {
  const [products, setProducts] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Thêm state search
  const [filters, setFilters] = useState({
    shopby: [],
    sortby: "",
    price: 0,
    onSale: false,
    inStock: false,
  });

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(`${APP_API_URL}/api/products`);
        setProducts(res.data);
      } catch (err) {
        console.error("Lỗi khi fetch sản phẩm:", err);
      }
    }
    fetchProduct();
  }, []);

  useEffect(() => {
    if (products) {
      let filtered = [...products];

      if (filters.shopby.length > 0) {
        filtered = filtered.filter((product) =>
          filters.shopby.includes(product.category.name)
        );
      }

      filtered = filtered.filter((product) => product.price >= filters.price);

      if (filters.onSale) {
        filtered = filtered.filter((product) => product.sale === true);
      }

      if (filters.inStock) {
        filtered = filtered.filter((product) => product.stock > 0);
      }

      // 🔍 Tìm kiếm theo tên sản phẩm
      if (searchTerm.trim() !== "") {
        filtered = filtered.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (filters.sortby === "Giá tăng dần") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (filters.sortby === "Giá giảm dần") {
        filtered.sort((a, b) => b.price - a.price);
      } else if (filters.sortby === "Mới nhất") {
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      }

      setFilteredProducts(filtered);
    }
  }, [filters, products, searchTerm]);

  return (
    <div className="shop-container">
      <h1 className="shop-title">Shop The Latest</h1>
      <div className="main-container">
        <SideBar
          filters={filters}
          setFilters={setFilters}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <div className="product-grid-shop">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))
          ) : (
            <p>Không tìm thấy sản phẩm phù hợp.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Shop;
