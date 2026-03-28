import "../style/Footer.css";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Our Policies</h3>
          <ul>
            <li><Link to="/returns-policy">7 Days Returns Policy</Link></li>
            <li><Link to="/exchange-policy">Easy Exchange Policy</Link></li>
            <li><Link to="/support-policy">24/7 Customer Support</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/collection">Products</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
            <li><Link to="/orders">My Orders</Link></li>
            <li><Link to="/cart">Shopping Cart</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Customer Care</h3>
          <ul>
            <li><a href="tel:+1-800-123-4567">📞 1-800-123-4567</a></li>
            <li><a href="mailto:support@ecommerce.com">📧 support@ecommerce.com</a></li>
            <li><a href="https://wa.me/18001234567">💬 WhatsApp</a></li>
            <li><span>Available 24/7</span></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <ul className="social-links">
            <li><a href="#" title="Facebook">f</a></li>
            <li><a href="#" title="Twitter">𝕏</a></li>
            <li><a href="#" title="Instagram">📷</a></li>
            <li><a href="#" title="LinkedIn">in</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-text">
          Copyright © 2026 E-commerce.com – All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;