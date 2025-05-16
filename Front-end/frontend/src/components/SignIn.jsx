import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

const SignIn = ({ switchToSignUp }) => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    // Giả lập đăng nhập thành công
    navigate("/home");
  };
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng nhập</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mật khẩu" />
        <button onClick={handleSignIn}>Đăng nhập</button>
        <p>
          Chưa có tài khoản? <span onClick={switchToSignUp}>Đăng ký</span>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
