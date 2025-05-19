import React, { useState } from "react";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom"; // đổi Link thành NavLink
import { useUser } from "../context/userContext";
import icons from "../assets/img/icon";
import "../assets/css/common/nav.css";

const { CiSearch, CiShoppingCart, CiUser } = icons;

function Navbar({ handleToggle }) {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";

  const handleLogin = (e) => {
    e.preventDefault();
    if (user) {
      navigate("/account");
    } else {
      navigate("/auth");
    }
  };

  return (
    <header className={`navbar ${isHome ? "no-border" : ""}`}>
      <Link to="/" className="logo">
        <div>
          <span>C</span>ain<span>G</span>
        </div>
      </Link>
      <div className="nav-links">
        <div className="nav-link">
          <NavLink
            to="/shop"
            className={({ isActive }) => `nav-i ${isActive ? "active" : ""}`}
          >
            Shop
          </NavLink>
          <NavLink
            to="/blog"
            className={({ isActive }) => `nav-i ${isActive ? "active" : ""}`}
          >
            Blog
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) => `nav-i ${isActive ? "active" : ""}`}
          >
            Our Story
          </NavLink>
        </div>
        <span>|</span>
        <div className="nav-links-logo">
          <p className="nav-i">
            <CiSearch />
          </p>
          <p className="nav-i" onClick={handleToggle}>
            <CiShoppingCart />
          </p>
          <Link className="nav-i" onClick={handleLogin}>
            <CiUser />
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
