import React, { useRef, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { CheckIcon } from "../../assets/img/icon";
import axios from "axios";
import "../../assets/css/auth/orderdetail.css";
import { APP_API_URL } from "../../assets/config/API";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function OrdersElement() {
  const { id } = useParams();
  const location = useLocation();
  const message = location.state?.message;
  const { FaCircleCheck } = CheckIcon;

  const contentRef = useRef();

  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await axios.get(`${APP_API_URL}/api/orders/${id}`);
        setOrderData(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to fetch order.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [id]);
  const generatePDF = () => {
    const input = contentRef.current;
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Bill_CainG__${id}.pdf`);
    });
  };

  useEffect(() => {
    if (location.state?.autoDownload && orderData) {
      setTimeout(() => {
        generatePDF();
      }, 500);
    }
  }, [location, orderData]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!orderData) return <p>Order not found</p>;

  // --- Lấy dữ liệu từ orderData ---
  const {
    _id,
    email,
    phone,
    paymentMethod,
    orderDate,
    deliveryOption,
    deliveryAddress,
    items,
    total,
    shipping,
    status,
    userId, // nếu muốn hiển thị user name cần populate từ backend
  } = orderData;
  console.log(orderData);
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      {message && (
        <div className="weareknow">
          <div className="weareknow-content">
            <p>
              <FaCircleCheck />
              {message}
            </p>
          </div>
        </div>
      )}

      <div className="order-detail-container">
        <div className="order-details">
          <h2>Order Details</h2>
          <div className="details-grid">
            <div className="col-items">
              <div className="detail-item">
                <label>Order Number</label>
                <span>{_id}</span>
              </div>
              <div className="detail-item">
                <label>Email</label>
                <span>{email}</span>
              </div>
              <div className="detail-item">
                <label>Payment Method</label>
                <span>{paymentMethod}</span>
              </div>

              <div className="detail-item">
                <label>Status</label>
                <span>{status}</span>
              </div>
            </div>
            <div className="col-items">
              <div className="detail-item">
                <label>Order Date</label>
                <span>{new Date(orderDate).toLocaleDateString()}</span>
              </div>
              <div className="detail-item">
                <label>Delivery Address</label>
                <span>
                  {deliveryAddress?.street} <br />
                  {deliveryAddress?.city} <br />
                  {deliveryAddress?.country} <br />
                  {deliveryAddress?.postcode}
                </span>
              </div>
              <div className="detail-item">
                <label>Contact Phone</label>
                <span>{phone}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="order-summary">
          <h2>Order Summary</h2>
          <div className="order-summary-box" ref={contentRef}>
            <div className="summary-header">
              <span>PRODUCT</span>
              <span>TOTAL</span>
            </div>
            <div className="list-bill">
              {items.map((item, index) => (
                <div key={index} className="summary-row">
                  <span>
                    {item.name} x{item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>
            <div className="subtotal">
              <p>SUBTOTAL</p>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="shipping">
              <p>SHIPPING</p>
              <span>{shipping !== 0 ? "Free shipping" : shipping}</span>
            </div>
            <div className="total-row">
              <p>TOTAL</p>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrdersElement;
