import React, { useState } from "react";
import "../assets/css/checkoutpage.css";
import emailjs from "emailjs-com";
import { useCart } from "../context/cartContext";
import { useOrder } from "../context/orderContext";
import { useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import { useLocation } from "react-router-dom";

function CheckOutPage() {
  const { user, createUser, setUser } = useUser();
  const { cartItems, setCartItem } = useCart();
  const { CreateOrder } = useOrder();
  const navigate = useNavigate();
  const location = useLocation();
  const { shipping, coupon, country, city, zip } = location.state || {};
  const [nowshipping, setShipping] = useState(shipping);

  const [createAccount, setCreateAccount] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState("Direct bank transfer");

  const [formData, setFormData] = useState({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    displayName: user?.lastName || "",
    companyName: user?.companyName || "",
    country: user?.country || country || "",
    streetAddress: user?.streetAddress || "",
    postcode: user?.postcode || zip || "",
    city: user?.city || city || "",
    phone: user?.phone || "",
    email: user?.email || "",
  });

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = subtotal + nowshipping;

  const handlePlaceOrder = async () => {
    // Tạo tài khoản nếu chưa đăng nhập và người dùng chọn "create account"
    if (createAccount) {
      const newUser = {
        ...formData,
        ...(user ? {} : { password: "123456" }),
      };

      const created = await createUser(newUser);
      console.log(created);
      setUser(created);
      if (!created) {
        alert("Không thể tạo tài khoản. Vui lòng thử lại.");
        return;
      }
    }
    // Kiểm tra các trường bắt buộc
    const requiredFields = [
      "firstName",
      "lastName",
      "country",
      "streetAddress",
      "postcode",
      "city",
      "phone",
      "email",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc.");
        return;
      }
    }

    const orderData = {
      email: formData.email,
      phone: formData.phone,
      paymentMethod: paymentMethod,
      deliveryOption: "standard",
      deliveryAddress: {
        streetAddress: formData.streetAddress,
        city: formData.city,
        country: formData.country,
        postcode: formData.postcode,
      },
      items: cartItems.map((item) => ({
        productId: item._id || item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl,
      })),
      nowshipping,
      total,
    };

    const orderId = await CreateOrder(orderData);

    if (orderId) {
      setCartItem([]);
      alert("Order placed successfully!");
      navigate(`/account/orders/${orderId}`, {
        state: { message: "We’ve received your order" },
      });
    } else {
      if (!user) {
        alert("bạn chưa đăng nhập");
      } else {
        alert("Order khởi tạo không thành công ");
      }
    }
  };

  return (
    <div className="checkout-container">
      <div className="billing-details">
        <h3>Billing Details</h3>
        <div className="name-fields">
          <input
            type="text"
            placeholder="First name *"
            value={formData.firstName}
            onChange={(e) =>
              setFormData({ ...formData, firstName: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Last name *"
            value={formData.lastName}
            onChange={(e) =>
              setFormData({ ...formData, lastName: e.target.value })
            }
          />
        </div>
        <input
          type="text"
          placeholder="Company Name"
          value={formData.companyName}
          onChange={(e) =>
            setFormData({ ...formData, companyName: e.target.value })
          }
        />
        <select
          value={formData.country}
          onChange={(e) =>
            setFormData({ ...formData, country: e.target.value })
          }
        >
          <option value="">Country *</option>
          <option value="Vietnam">Vietnam</option>
          <option value="USA">USA</option>
        </select>
        <input
          type="text"
          placeholder="Street Address *"
          value={formData.streetAddress}
          onChange={(e) =>
            setFormData({ ...formData, streetAddress: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Postcode / ZIP *"
          value={formData.postcode}
          onChange={(e) =>
            setFormData({ ...formData, postcode: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Town / City *"
          value={formData.city}
          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone *"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email *"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />

        <textarea placeholder="Order notes" />
      </div>

      <div className="order-summary">
        <h3>Your Order</h3>
        <div className="orders-box">
          <div className="ordered-head">
            <h3>Product</h3>
            <h3>Total</h3>
          </div>
          {cartItems.map((item, index) => (
            <div className="ordered-item" key={index}>
              <p className="order-name">
                {item.name} x {item.quantity}
              </p>
              <p className="order-price">${item.price * item.quantity}</p>
            </div>
          ))}
          <div className="subtotal row">
            <h4>SUBTOTAL</h4>
            <p>${subtotal}</p>
          </div>
          <div className="shipping row">
            <h4>SHIPPING</h4>
            <p>{nowshipping === 0 ? "Free shipping" : `$${nowshipping}`}</p>
          </div>
          <div className="total row">
            <h4>TOTAL</h4>
            <p>${total}</p>
          </div>
        </div>

        <div className="payment-methods">
          <label>
            <input
              type="radio"
              name="payment"
              value="Direct bank transfer"
              checked={paymentMethod === "Direct bank transfer"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Direct bank transfer
          </label>
          <p className="bank-info">
            Make your payment directly into our bank account...
          </p>
          <label>
            <input
              type="radio"
              name="payment"
              value="Check payments"
              checked={paymentMethod === "Check payments"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Check payments
          </label>
          <label>
            <input
              type="radio"
              name="payment"
              value="Cash on delivery"
              checked={paymentMethod === "Cash on delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Cash on delivery
          </label>
        </div>

        <button className="place-order" onClick={handlePlaceOrder}>
          PLACE ORDER
        </button>
      </div>
    </div>
  );
}

export default CheckOutPage;
