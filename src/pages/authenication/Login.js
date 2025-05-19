import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../context/userContext";
import { APP_API_URL } from "../../assets/config/API";
import axios from "axios";

export default function Login() {
  const [username, setUsername] = useState("");
  const { login } = useUser();
  const navigate = useNavigate();

  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(`${APP_API_URL}/api/users/login`, {
        email: username,
        password: password,
      });

      const data = res.data;

      login(data.user, data.token);
      navigate("/account");
    } catch (err) {
      alert("Lỗi: " + (err.response?.data?.message || err.message));
    }
  };

  return (
    <>
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          required
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <label className="remember">
          <input type="checkbox" />
          Remember me
        </label>
        <button type="submit" className="btn-submit">
          SIGN IN
        </button>
        <p className="forgot">
          Have you forgotten your <Link to="/forgerpassword">password?</Link>
        </p>
      </form>
    </>
  );
}
