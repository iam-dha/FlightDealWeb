import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignUp = () => {
    alert("Đăng ký thành công testtest!");
    navigate("/");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>📝 Đăng ký</h2>
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
      <button onClick={handleSignUp}>Đăng ký</button>
      <p>
        Đã có tài khoản? <Link to="/">Đăng nhập</Link>
      </p>
    </div>
  );
};

export default SignUp;
