import "../styles/FlightDetailBox.css";

function FlightDetailBox({ flight, onClose, onChoose }) {
  if (!flight) return null;

  return (
    <div className="overlay">
      <div className="flight-detail-box">
        <div className="detail-header">
          <h3>Chi tiết chuyến bay</h3>
          <button onClick={onClose} className="btn-close">
            ×
          </button>
        </div>

        <div className="flight-summary">
          <strong>{flight.airline || "VietJa"}</strong>
          <p>
            <strong>Chuyến bay: </strong>
            {flight.flight_number || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Khởi hành: </strong>
            {flight.iata_from || "Chưa cập nhật"} →{" "}
            {flight.iata_to || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Giờ bay: </strong>
            {flight?.departure_date && flight?.departure_time
              ? `${flight.departure_date.split("T")[0]} / ${
                  flight.departure_time
                }`
              : "Chưa cập nhật"}
          </p>
        </div>

        <div className="ticket-options">
          {flight.seat ? (
            ["economy", "premium"].map((type, i) => (
              <div key={i} className="ticket-card">
                <ul>
                  <li>
                    Ghế {type.charAt(0).toUpperCase() + type.slice(1)}:{" "}
                    {flight.seat[type] ?? "Chưa cập nhật"}
                  </li>
                </ul>
                <button
                  onClick={() =>
                    onChoose({ type, quantity: flight.seat[type] })
                  }
                >
                  Chọn
                </button>
              </div>
            ))
          ) : (
            <p className="no-ticket">Chưa có thông tin vé</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default FlightDetailBox;
