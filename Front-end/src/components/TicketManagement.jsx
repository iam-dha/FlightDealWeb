import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/PromotionManagement.css";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    code: "",
    airline: "",
    departure: "",
    destination: "",
    price: "",
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
      code: "",
      airline: "",
      departure: "",
      destination: "",
      price: "",
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
            <th>Mã vé</th>
            <th>Hãng</th>
            <th>Khởi hành</th>
            <th>Điểm đến</th>
            <th>Giá</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {tickets.map((ticket) => (
            <tr key={ticket._id}>
              <td>{ticket.code}</td>
              <td>{ticket.airline}</td>
              <td>{ticket.departure}</td>
              <td>{ticket.destination}</td>
              <td>{ticket.price} VND</td>
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
              <label>Mã vé:</label>
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

              <label>Điểm khởi hành:</label>
              <input
                type="text"
                name="departure"
                value={formData.departure}
                onChange={handleInputChange}
                required
              />

              <label>Điểm đến:</label>
              <input
                type="text"
                name="destination"
                value={formData.destination}
                onChange={handleInputChange}
                required
              />

              <label>Giá vé:</label>
              <input
                type="number"
                name="price"
                value={formData.price}
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
