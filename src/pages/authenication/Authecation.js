import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import "../../assets/css/auth/auth.css";
import { useUser } from "../../context/userContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const { login, logout } = useUser();

  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="auth-container">
      <h2>My account</h2>
      <div className="auth-tabs">
        <NavLink
          to="login"
          className={({ isActive }) => `authe ${isActive ? "active" : ""}`}
        >
          Sign in
        </NavLink>
        <NavLink
          to="register"
          className={({ isActive }) => `authe ${isActive ? "active" : ""}`}
        >
          Register
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
}
