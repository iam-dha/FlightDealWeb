import React from "react";
import "../styles/Auth.css";

const SignUp = ({ switchToSignIn }) => {
  return (
    <div className="auth-container">
      <div className="auth-box">
        <h2>Đăng ký</h2>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Mật khẩu" />
        <input type="password" placeholder="Nhập lại mật khẩu" />
        <button>Đăng ký</button>
        <p>
          Đã có tài khoản? <span onClick={switchToSignIn}>Đăng nhập</span>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
