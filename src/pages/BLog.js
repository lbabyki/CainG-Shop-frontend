import React, { useState, useEffect } from "react";
import BlogCard from "../components/blog/BlogCard";
import "../assets/css/blog/blog.css";
import SearchBar from "../components/shop/searchbar";
import axios from "axios";
import { APP_API_URL } from "../assets/config/API";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const categories = ["Fashion", "Style", "Accessories", "Season"];

  const fetchBlogs = async (page = 1, category = null, keyword = "") => {
    setLoading(true);
    try {
      let url = `${APP_API_URL}/api/blogs?page=${page}&limit=4`;
      if (category) url += `&category=${encodeURIComponent(category)}`;
      if (keyword) url += `&search=${encodeURIComponent(keyword)}`;
      const res = await axios.get(url);
      setBlogs(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Lỗi khi lấy danh sách blog:", err);
    }
    setLoading(false);
  };

  // Gọi API khi trang, category hoặc từ khóa thay đổi
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      fetchBlogs(currentPage, selectedCategory, searchTerm);
    }, 500); // debounce 500ms

    return () => clearTimeout(delayDebounce);
  }, [currentPage, selectedCategory, searchTerm]);

  const handlePageClick = (page) => {
    if (page !== currentPage && page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category === selectedCategory ? null : category);
    setCurrentPage(1); // reset về trang 1 khi chọn category mới
  };

  return (
    <div className="blog-wrapper">
      <h1>Blog</h1>
      <div className="blog-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <h4>Categories</h4>
          <ul className="categories">
            {categories.map((cat) => (
              <li
                key={cat}
                onClick={() => handleCategoryClick(cat)}
                style={{
                  cursor: "pointer",
                  fontWeight: selectedCategory === cat ? "bold" : "normal",
                  color: selectedCategory === cat ? "#a18a68" : "inherit",
                }}
              >
                {cat}
              </li>
            ))}
          </ul>
        </aside>

        {/* Blog Content */}
        <div className="blog-content">
          <div className="blog-grid">
            {loading ? (
              <p>Đang tải...</p>
            ) : blogs.length > 0 ? (
              blogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
            ) : (
              <p>Không có blog nào.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="pagination">
            <button
              className="page"
              disabled={currentPage === 1}
              onClick={() => handlePageClick(currentPage - 1)}
            >
              {"<"}
            </button>

            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`page ${currentPage === i + 1 ? "active" : ""}`}
                onClick={() => handlePageClick(i + 1)}
              >
                {i + 1}
              </button>
            ))}

            <button
              className="page"
              disabled={currentPage === totalPages}
              onClick={() => handlePageClick(currentPage + 1)}
            >
              {">"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
