import React from "react";
import "../styles/HomePage.css";

const Footer = () => {
  return (
    <footer className="homepage-footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Về chúng tôi</h4>
          <ul>
            <li>
              <a href="#">Giới thiệu</a>
            </li>
            <li>
              <a href="#">Điều khoản</a>
            </li>
            <li>
              <a href="#">Chính sách bảo mật</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Hỗ trợ</h4>
          <ul>
            <li>
              <a href="#">Trung tâm trợ giúp</a>
            </li>
            <li>
              <a href="#">Liên hệ</a>
            </li>
            <li>
              <a href="#">Góp ý</a>
            </li>
          </ul>
        </div>
        <div className="footer-section">
          <h4>Kết nối</h4>
          <div className="social-icons">
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#">
              <i className="fab fa-youtube"></i>
            </a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Công ty Du lịch của bạn. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
