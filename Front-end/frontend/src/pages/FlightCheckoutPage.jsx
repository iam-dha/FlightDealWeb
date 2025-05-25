import "../styles/FlightCheckoutPage.css";

function FlightCheckoutPage({
  selectedFlight,
  selectedOption,
  onConfirm,
  onClose,
}) {
  if (!selectedFlight || !selectedOption) return null;

  return (
    <div className="overlay">
      <div className="checkout-box">
        <div className="detail-header">
          <h3>🧾 Thanh toán chuyến bay</h3>
          <button onClick={onClose} className="btn-close">
            ×
          </button>
        </div>

        <div className="flight-info">
          <h4>✈️ {selectedFlight.airline || "Chưa cập nhật"}</h4>
          <p>
            <strong>Hành trình:</strong>{" "}
            {selectedFlight.departure || "Chưa cập nhật"} →{" "}
            {selectedFlight.arrival || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Thời gian:</strong> {selectedFlight.time || "Chưa cập nhật"}{" "}
            ({selectedFlight.duration || "Chưa cập nhật"})
          </p>
          <p>
            <strong>Hạng ghế:</strong> {selectedOption.name || "Chưa cập nhật"}
          </p>
          <p className="price">
            <strong>Giá vé:</strong>{" "}
            {selectedOption.price
              ? selectedOption.price.toLocaleString() + " đ"
              : "Chưa cập nhật"}
          </p>
        </div>

        <div className="passenger-form">
          <h4>👤 Thông tin hành khách</h4>

          <div className="form-group">
            <label htmlFor="fullname">Họ và tên</label>
            <input
              type="text"
              id="fullname"
              placeholder="Nguyễn Văn A"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="email@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Số điện thoại</label>
            <input type="tel" id="phone" placeholder="0123 456 789" required />
          </div>
        </div>

        <button className="btn-confirm" onClick={onConfirm}>
          ✅ Xác nhận thanh toán
        </button>
      </div>
    </div>
  );
}

export default FlightCheckoutPage;
