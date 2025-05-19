import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { APP_API_URL } from "../../assets/config/API";

export default function BlogCard({ blog }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/blog/${blog._id}`);
  };

  const date = new Date(blog.publishedAt);
  const formattedDate = `${date.getDate()}/${
    date.getMonth() + 1
  }/${date.getFullYear()}`;
  console.log(formattedDate);

  return (
    <div className="blog-card" onClick={handleClick}>
      <img src={`${APP_API_URL}${blog.image}`} alt={blog.title} />
      <p className="meta">
        {blog.category.name} - {formattedDate}
      </p>
      <h3>{blog.title}</h3>
      <p className="summary">{blog.summary}</p>
      <a href="#" className="read-more">
        Read More
      </a>
    </div>
  );
}
