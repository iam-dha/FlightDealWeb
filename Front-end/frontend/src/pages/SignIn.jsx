import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    // Giả lập xác thực
    if (email === "test@example.com" && password === "123456") {
      document.cookie = `user=${email}; path=/;`;
      alert("Đăng nhập thành công!");
      // Điều hướng tới dashboard hoặc trang chính
    } else {
      alert("Sai email hoặc mật khẩu");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🔑 Đăng nhập</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Mật khẩu"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <br />
      <button onClick={handleLogin}>Đăng nhập</button>
      <p>
        Chưa có tài khoản? <Link to="/signup">Đăng ký</Link>
      </p>
    </div>
  );
};

export default SignIn;
