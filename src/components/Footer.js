import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/common/footer.css";
import { iconFooter } from "../assets/img/icon";

const { FaLinkedinIn, FaInstagram, FaFacebookF, FaTwitter } = iconFooter;

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-top">
        <div className="footer-links">
          <Link to="/contact">CONTACT</Link>
          <Link to="/terms">TERMS OF SERVICES</Link>
          <Link to="/shipping">SHIPPING AND RETURNS</Link>
        </div>
        <div className="footer-newsletter">
          <div className="newsletter-input">
            <input
              type="email"
              placeholder="Give an email, get the newsletter."
            />
            <button>→</button>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>
          © 2021 Shelly. <Link to="/terms">Terms of use</Link> and{" "}
          <Link to="/privacy">privacy policy</Link>.
        </p>
        <div className="social-icons">
          <a href="#">
            <FaLinkedinIn />
          </a>
          <a href="#">
            <FaFacebookF />
          </a>
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
