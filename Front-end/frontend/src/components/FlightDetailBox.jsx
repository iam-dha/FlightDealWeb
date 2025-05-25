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
          <strong>{flight.airline || "Chưa cập nhật"}</strong>
          <p>
            <strong>Chuyến bay: </strong>
            {flight.flight || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Khởi hành: </strong>
            {flight.departure || "Chưa cập nhật"} →{" "}
            {flight.arrival || "Chưa cập nhật"}
          </p>
          <p>
            <strong>Giờ bay: </strong>
            {flight.time || "Chưa cập nhật"} (
            {flight.duration || "Chưa cập nhật"})
          </p>
        </div>

        <div className="ticket-options">
          {flight.ticketOptions?.length > 0 ? (
            flight.ticketOptions.map((option, i) => (
              <div key={i} className="ticket-card">
                <h4>{option.name || "Chưa cập nhật"}</h4>
                <ul>
                  {option.details?.length > 0 ? (
                    option.details.map((d, j) => (
                      <li key={j}>{d || "Chưa cập nhật"}</li>
                    ))
                  ) : (
                    <li>Chưa cập nhật</li>
                  )}
                </ul>
                <button onClick={() => onChoose(option)}>Chọn</button>
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
