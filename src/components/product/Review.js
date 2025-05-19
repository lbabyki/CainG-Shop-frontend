import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import "../../assets/css/product/review.css";
import axios from "axios";
import { APP_API_URL } from "../../assets/config/API";
import { useUser } from "../../context/userContext";

const Review = () => {
  const { user } = useUser();
  const { product, handleSetReviewNumber } = useOutletContext();
  const productId = product?._id;
  const userId = user?._id;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (comment.trim().length < 5) {
      setError("Nội dung đánh giá phải ít nhất 5 ký tự.");
      return;
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${APP_API_URL}/api/reviews/${productId}`,
        {
          rating,
          comment,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComment("");
      setRating(0);
      fetchReviews();
    } catch (err) {
      setError(err.response?.data?.message || "Lỗi khi gửi đánh giá");
    }
  };
  const fetchReviews = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${APP_API_URL}/api/reviews/${productId}`
      );
      setReviews(response.data);
      handleSetReviewNumber(response.data.length);
    } catch (err) {
      console.error("Lỗi khi lấy review:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [productId]);
  console.log(reviews);
  return (
    <div className="review-wrapper">
      <div className="review-block">
        <h3 className="title">
          {reviews.length} Reviews for {product?.name}
        </h3>
        <div className="review-box">
          {loading ? (
            <p>Đang tải đánh giá...</p>
          ) : reviews.length === 0 ? (
            <p>Chưa có đánh giá nào.</p>
          ) : (
            reviews.map((r, index) => (
              <div key={index} className="review">
                <div className="review-header">
                  <span className="reviewer-name">
                    {r.userId?.firstName + r.userId?.lastName ||
                      "Người dùng ẩn danh"}
                  </span>
                  <span className="review-date">
                    {new Date(r.createdAt).toLocaleDateString("vi-VN")}
                  </span>
                </div>
                <div className="review-stars">
                  {"★".repeat(r.rating) + "☆".repeat(5 - r.rating)}
                </div>
                <p className="review-text">{r.comment}</p>
              </div>
            ))
          )}
        </div>
      </div>

      <div className="add-review">
        <h3 className="review-title">Add a Review</h3>
        <p className="sub-title">
          Your email address will not be published. Required fields are marked *
        </p>

        <form onSubmit={handleSubmit}>
          <div>
            <label className="label">Your Review*</label>
            <textarea
              required
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows="4"
              className="review-textarea"
            />
          </div>

          <div className="rating-container">
            <label className="label">Your Rating*</label>
            <select
              className="review-input"
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              required
            >
              <option value={0}>-- Chọn --</option>
              {[1, 2, 3, 4, 5].map((s) => (
                <option key={s} value={s}>
                  {s} sao
                </option>
              ))}
            </select>
          </div>

          {/* Nếu bạn muốn thêm name/email thì thêm thêm state & logic xử lý */}
          <button type="submit" className="submit-btn">
            Submit
          </button>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default Review;
