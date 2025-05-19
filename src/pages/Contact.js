import React, { useState, useEffect } from "react";
import "../assets/css/contact.css";
import { useUser } from "../context/userContext";

export default function Contact() {
  const { user } = useUser();

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    subject: "",
    message: "",
  });

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        first_name: user.firstName || "",
        last_name: user.lastName || "",
        email: user.email || "",
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="contact-container">
      <h2>Contact Us</h2>
      <p>
        Say Hello, send us your thoughts about our products or share <br />
        your ideas with our Team!
      </p>

      <form
        className="contact-form"
        action="https://formspree.io/f/myzwveov"
        method="POST"
      >
        <div className="form-row">
          <input
            type="text"
            name="first_name"
            placeholder="First name"
            value={formData.first_name}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="last_name"
            placeholder="Last name"
            value={formData.last_name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-row">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <select
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
          >
            <option value="">Subject</option>
            <option value="feedback">Feedback</option>
            <option value="support">Support</option>
            <option value="partnership">Partnership</option>
          </select>
        </div>
        <div className="form-row">
          <textarea
            name="message"
            placeholder="Message"
            rows="4"
            value={formData.message}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="submit-btn">
          SEND
        </button>
      </form>
    </div>
  );
}
