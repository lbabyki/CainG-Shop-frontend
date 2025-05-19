import React from "react";
import "../../assets/css/auth/forget.css";

export default function ForgetPassword() {
  return (
    <div className="auth-container">
      <h2>Have you Forgotten Your Password ?</h2>
      <p className="forgot-description">
        If you've forgotten your password, enter your e-mail address and we'll
        send you an e-mail
      </p>
      <form className="auth-form">
        <input type="email" placeholder="Email" />
        <button type="submit" className="btn-submit">
          RESET PASSWORD
        </button>
      </form>
    </div>
  );
}
