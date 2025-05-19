import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../../assets/css/auth/register.css";
import axios from "axios";
import { APP_API_URL } from "../../assets/config/API";

export default function Register() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${APP_API_URL}/api/users/register`, {
        fullName,
        email,
        password,
      });

      navigate("/login");
    } catch (err) {
      alert(`Lỗi: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <form className="auth-form" onSubmit={handleRegister}>
      <input
        type="text"
        placeholder="Full name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        required
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="btn-submit">
        REGISTER
      </button>
    </form>
  );
}
