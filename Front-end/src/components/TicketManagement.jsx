import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/PromotionManagement.css";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    flightId: "",
    code: "",
    airline: "",
    departureAirport: "",
    arrivalAirport: "",
    departureTime: "",
    arrivalTime: "",
    ticketType: "",
    price: "",
    availableSeats: "",
  });

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/tickets/${id}`);
    setTickets(tickets.filter((t) => t._id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddTicket = async (e) => {
    e.preventDefault();
    await api.post("/tickets", formData);
    setFormData({
      flightId: "",
      code: "",
      airline: "",
      departureAirport: "",
      arrivalAirport: "",
      departureTime: "",
      arrivalTime: "",
      ticketType: "",
      price: "",
      availableSeats: "",
    });
    setIsModalOpen(false);
    fetchTickets();
  };

  return (
    <div className="container">
      <h2>Quản lý Vé máy bay</h2>
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        Thêm vé máy bay
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã chuyến bay</th>
            <th>Hãng hàng không</th>
            <th>Sân bay đi</th>
            <th>Sân bay đến</th>
            <th>Thời gian khởi hành</th>
            <th>Thời gian đến</th>
            <th>Loại vé</th>
            <th>Giá vé</th>
            <th>Số ghế còn trống</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.flightId}</td>
              <td>{ticket.code}</td>
              <td>{ticket.airline}</td>
              <td>{ticket.departureAirport}</td>
              <td>{ticket.arrivalAirport}</td>
              <td>{ticket.departureTime}</td>
              <td>{ticket.arrivalTime}</td>
              <td>{ticket.ticketType}</td>
              <td>{ticket.price} VND</td>
              <td>{ticket.availableSeats}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(ticket._id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm vé máy bay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3>Thêm vé máy bay</h3>
            <form onSubmit={handleAddTicket}>
              <label>ID chuyến bay:</label>
              <input
                type="text"
                name="flightId"
                value={formData.flightId}
                onChange={handleInputChange}
                required
              />

              <label>Mã chuyến bay:</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />

              <label>Hãng hàng không:</label>
              <input
                type="text"
                name="airline"
                value={formData.airline}
                onChange={handleInputChange}
                required
              />

              <label>Sân bay đi:</label>
              <input
                type="text"
                name="departureAirport"
                value={formData.departureAirport}
                onChange={handleInputChange}
                required
              />

              <label>Sân bay đến:</label>
              <input
                type="text"
                name="arrivalAirport"
                value={formData.arrivalAirport}
                onChange={handleInputChange}
                required
              />

              <label>Thời gian khởi hành:</label>
              <input
                type="datetime-local"
                name="departureTime"
                value={formData.departureTime}
                onChange={handleInputChange}
                required
              />

              <label>Thời gian đến:</label>
              <input
                type="datetime-local"
                name="arrivalTime"
                value={formData.arrivalTime}
                onChange={handleInputChange}
                required
              />

              <label>Loại vé:</label>
              <select
                name="ticketType"
                value={formData.ticketType}
                onChange={handleInputChange}
                required
              >
                <option value="">Chọn loại vé</option>
                <option value="Phổ thông">Phổ thông</option>
                <option value="Thương gia">Thương gia</option>
              </select>

              <label>Giá vé:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleInputChange}
                required
              />

              <label>Số ghế còn trống:</label>
              <input
                type="number"
                name="availableSeats"
                value={formData.availableSeats}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="submit-btn">
                Thêm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;
