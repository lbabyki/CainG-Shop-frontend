import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../assets/css/blog/blogelement.css";
import { iconFooter } from "../assets/img/icon";
import Comments from "../components/blog/comment.bloge";
import axios from "axios";
import { APP_API_URL } from "../assets/config/API";

const { FaInstagram, FaFacebookF, FaTwitter } = iconFooter;

export default function BLogElement() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const response = await axios.get(`${APP_API_URL}/api/blogs/${id}`);
        const data = response.data;

        // Thay tất cả src="/uploads/... thành src="https://domain.com/uploads/..."
        const updatedBlocks = data.contentBlocks?.map((block) =>
          block.replace(/src="\/uploads\//g, `src="${APP_API_URL}/uploads/`)
        );

        setBlog({ ...data, contentBlocks: updatedBlocks });
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (!blog) return <p>Blog not found</p>;

  return (
    <div className="blog-e-container">
      <div className="blog-e-title-box">
        <h1 className="blog-e-title margin-auto">{blog.title}</h1>
        <p className="blog-e-author margin-auto">
          by <span>{blog.author?.name || "Unknown"}</span> -{" "}
          {new Date(blog.publishedAt).toLocaleDateString()}
        </p>
      </div>

      {blog.contentBlocks?.map((block, index) => (
        <div key={index} dangerouslySetInnerHTML={{ __html: block }} />
      ))}

      <div className="blog-tags-share margin-auto">
        <div className="tags">
          <span className="label">Tags</span>
          <span className="line" />
          <span className="content">
            {blog.category?.name || "Fashion, Style, Season"}
          </span>
        </div>
        <div className="share">
          <span className="label">Share</span>
          <span className="line" />
          <span className="icons">
            <a
              href={blog.shareLinks?.facebook}
              target="_blank"
              rel="noreferrer"
            >
              <FaFacebookF />
            </a>
            <a
              href={blog.shareLinks?.instagram}
              target="_blank"
              rel="noreferrer"
            >
              <FaInstagram />
            </a>
            <a href={blog.shareLinks?.twitter} target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </span>
        </div>
      </div>

      <div className="blog-comment-form margin-auto">
        <h2>Leave a Reply</h2>
        <p>
          Your email address will not be published. Required fields are marked *
        </p>

        <form>
          <input type="text" placeholder="Enter your name*" required />
          <input type="email" placeholder="Enter your Email*" required />
          <input type="text" placeholder="Enter your Website" />

          <div className="checkbox">
            <input type="checkbox" id="saveInfo" />
            <label htmlFor="saveInfo">
              Save my name, email, and website in this browser for the next time
              I comment
            </label>
          </div>

          <textarea placeholder="Your Comment*" rows="5" required></textarea>

          <button type="submit">POST COMMENT</button>
        </form>
      </div>

      <Comments />
    </div>
  );
}
