import "../styles/FlightCheckoutPage.css";
import { useState } from "react";
import { bookingFly } from "../services/api";
import Cookies from "js-cookie";
function FlightCheckoutPage({ selectedFlight, selectedOption, onClose }) {
  const [loading, setLoading] = useState(false);
  const [fullName, setFullName] = useState("");
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState();
  if (!selectedFlight || !selectedOption) return null;

  const handleConfirm = async () => {
    setLoading(true);

    const formData = {
      flightId: selectedFlight._id || "abcd1234", // ID thực tế từ dữ liệu
      seat_class: (selectedOption.type || "ECONOMY").toUpperCase(),
      passenger_list: [
        {
          fullName: fullName, // có thể lấy từ form input sau
          type: "adult",
        },
      ],
      addons: [
        {
          type: "meal",
          label: "Bữa ăn chay",
          price: 0,
        },
      ],
    };

    try {
      const accessToken = Cookies.get("accessToken");
      const response = await bookingFly(accessToken, formData);
      setSuccess(true);
      alert("✅ Xác nhận thanh toán thành công!");

      // Gọi hàm đóng nếu cần
      setData(response.data.outbound_booking);
    } catch (error) {
      console.error(error);
      alert("❌ Không thể kết nối đến máy chủ.");
    } finally {
      setLoading(false);
    }
  };
  console.log(data);
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
            {selectedFlight.iata_from || "Chưa cập nhật"} →{" "}
            {selectedFlight.iata_to || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Thời gian:</strong>{" "}
            {selectedFlight?.departure_date && selectedFlight?.departure_time
              ? `${selectedFlight.departure_date.split("T")[0]} / ${
                  selectedFlight.departure_time
                }`
              : "Chưa cập nhật"}
          </p>
          <p>
            <strong>Hạng ghế:</strong> {selectedOption.type || "Chưa cập nhật"}
          </p>
          <p className="price">
            <strong>Giá vé:</strong>{" "}
            {selectedFlight.price
              ? selectedFlight.price.toLocaleString() + " đ"
              : "Chưa cập nhật"}
          </p>
        </div>
        {success ? (
          <>
            <div className="success-message">
              <h3>🎉 Đặt vé thành công!</h3>
              <p>
                <strong>Tổng giá tiền:</strong>{" "}
                {data?.total_price?.toLocaleString() || 0} đ
              </p>
              <p>
                <strong>Trạng thái thanh toán:</strong>{" "}
                {data?.payment_status == "pending"
                  ? "Đang chờ thanh toán"
                  : data?.payment_status}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="passenger-form">
              <h4>👤 Thông tin hành khách</h4>

              <div className="form-group">
                <label htmlFor="fullname">Họ và tên</label>
                <input
                  type="text"
                  id="fullname"
                  placeholder="Nguyễn Văn A"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
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
                <input
                  type="tel"
                  id="phone"
                  placeholder="0123 456 789"
                  required
                />
              </div>
            </div>

            <button className="btn-confirm" onClick={handleConfirm}>
              ✅ Xác nhận thanh toán
            </button>
          </>
        )}
      </div>
    </div>
  );
}
export default FlightCheckoutPage;
