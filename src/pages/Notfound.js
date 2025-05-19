import React from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/notfound.css";

export default function NotFound() {
  const navigate = useNavigate();

  const goHome = () => {
    navigate("/");
  };

  return (
    <div className="notfound-container">
      <h1>404 ERROR</h1>
      <p>
        This page not found;
        <br />
        back to home and start again
      </p>
      <button onClick={goHome}>HOMEPAGE</button>
    </div>
  );
}
