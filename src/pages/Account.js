import React, { useEffect } from "react";
import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useUser } from "../context/userContext";
import "../assets/css/auth/account.css";
import userEvent from "@testing-library/user-event";

function Account() {
  const { logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    localStorage.removeItem("token");
    navigate("/auth");
  };

  return (
    <div className="account-container">
      <h2 className="account-title">My Account</h2>
      <div className="account-tabs">
        <NavLink
          to="dashboard"
          className={({ isActive }) =>
            `account-tab ${isActive ? "active" : ""}`
          }
        >
          Dashboard
        </NavLink>
        <NavLink
          to="orders"
          className={({ isActive }) =>
            `account-tab ${isActive ? "active" : ""}`
          }
        >
          Orders
        </NavLink>
        <NavLink
          to="downloads"
          className={({ isActive }) =>
            `account-tab ${isActive ? "active" : ""}`
          }
        >
          Downloads
        </NavLink>
        <NavLink
          to="addresses"
          className={({ isActive }) =>
            `account-tab ${isActive ? "active" : ""}`
          }
        >
          Addresses
        </NavLink>
        <NavLink
          to="Accountdetails"
          className={({ isActive }) =>
            `account-tab ${isActive ? "active" : ""}`
          }
        >
          Account details
        </NavLink>
        <span className="account-tab" onClick={handleLogout}>
          Logout
        </span>
      </div>
      <Outlet />
    </div>
  );
}

export default Account;
