import React, { useState } from "react";
import "../styles/HotelCheckout.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const HotelCheckout = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("credit");

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Cảm ơn ${name}! Đơn đặt phòng của bạn đã được xác nhận.`);
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <h2>Thanh toán đặt phòng</h2>

        <div className="hotel-summary">
          <h3>Khách sạn Hà Nội</h3>
          <p>Ngày nhận phòng: 2025-05-10</p>
          <p>Ngày trả phòng: 2025-05-12</p>
          <p>2 khách, 1 phòng</p>
          <p className="price">Tổng tiền: 2.000.000đ</p>
        </div>

        <form className="checkout-form" onSubmit={handleSubmit}>
          <h3>Thông tin khách hàng</h3>
          <input
            className="hotel-input"
            type="text"
            placeholder="Họ và tên"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            className="hotel-input"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            className="hotel-input"
            type="tel"
            placeholder="Số điện thoại"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />

          <h3>Phương thức thanh toán</h3>
          <div className="payment-options">
            <label>
              <input
                type="radio"
                name="payment"
                value="credit"
                checked={paymentMethod === "credit"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Thẻ tín dụng/Ghi nợ
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="bank"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Chuyển khoản ngân hàng
            </label>
            <label>
              <input
                type="radio"
                name="payment"
                value="momo"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Momo/ZaloPay
            </label>
          </div>

          <button type="submit">Xác nhận đặt phòng</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default HotelCheckout;
