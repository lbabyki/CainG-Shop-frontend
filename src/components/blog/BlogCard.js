import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API_URL } from "../../assets/config/API";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${blog._id}`);
  };
  return (
    <div className="blog-card" onClick={handleClick}>
      <img src={`${APP_API_URL}${blog.image}`} alt={blog.title} />
      <p className="meta">
        {blog.category.name} - {blog.publishedAt}
      </p>
      <h3>{blog.title}</h3>
      <p className="summary">{blog.summary}</p>
      <a href="#" className="read-more">
        Read More
      </a>
    </div>
  );
}
