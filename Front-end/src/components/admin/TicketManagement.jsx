import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import "../../styles/TicketManagement.css";

const TicketManagement = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]); // Danh sách vé sau khi lọc
  const [searchTerm, setSearchTerm] = useState(""); // Từ khóa tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const itemsPerPage = 10; // Số hàng trên mỗi trang
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
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
  const [notification, setNotification] = useState("");

  useEffect(() => {
    fetchTickets();
  }, []);

  useEffect(() => {
    // Lọc danh sách vé dựa trên từ khóa tìm kiếm
    const filtered = tickets.filter((ticket) => {
      const flightId = ticket.flightId || ""; // Xử lý undefined
      const code = ticket.code || ""; // Xử lý undefined
      const airline = ticket.airline || ""; // Xử lý undefined

      return (
        flightId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        code.toLowerCase().includes(searchTerm.toLowerCase()) ||
        airline.toLowerCase().includes(searchTerm.toLowerCase())
      );
    });
    setFilteredTickets(filtered);
    setCurrentPage(1); // Quay về trang đầu tiên khi tìm kiếm
  }, [searchTerm, tickets]);

  const fetchTickets = async () => {
    const res = await api.get("/tickets");
    setTickets(res.data);
    setFilteredTickets(res.data); // Hiển thị tất cả vé ban đầu
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Bạn có chắc chắn muốn xoá vé này?");
    if (confirmDelete) {
      await api.delete(`/tickets/${id}`);
      setTickets(tickets.filter((t) => t._id !== id));
      showNotification("Xoá vé thành công!");
    }
  };

  const handleEdit = (ticket) => {
    setFormData(ticket);
    setIsEditMode(true);
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditTicket = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      await api.put(`/tickets/${formData._id}`, formData);
      setTickets(tickets.map((t) => (t._id === formData._id ? formData : t)));
      showNotification("Cập nhật vé thành công!");
    } else {
      await api.post("/tickets", formData);
      setTickets([...tickets, formData]);
      showNotification("Thêm vé thành công!");
    }
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
    setIsEditMode(false);
    fetchTickets();
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000);
  };

  // Tính toán dữ liệu hiển thị trên mỗi trang
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredTickets.slice(indexOfFirstItem, indexOfLastItem);

  // Chuyển sang trang khác
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="container">
      <h2>Quản lý Vé máy bay</h2>
      {notification && <div className="notification">{notification}</div>}

      {/* Thanh tìm kiếm */}
      <input
        type="text"
        placeholder="Tìm kiếm vé máy bay..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

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
          {currentItems.map((ticket) => (
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
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(ticket)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Phân trang */}
      <div className="pagination">
        {Array.from(
          { length: Math.ceil(filteredTickets.length / itemsPerPage) },
          (_, index) => (
            <button
              key={index + 1}
              onClick={() => paginate(index + 1)}
              className={currentPage === index + 1 ? "active" : ""}
            >
              {index + 1}
            </button>
          )
        )}
      </div>

      {/* Modal thêm/sửa vé máy bay */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditMode(false);
              }}
            >
              ×
            </button>
            <h3>{isEditMode ? "Sửa vé máy bay" : "Thêm vé máy bay"}</h3>
            <form onSubmit={handleAddOrEditTicket}>
              <label>ID chuyến bay:</label>
              <input
                type="text"
                name="flightId"
                value={formData.flightId}
                onChange={handleInputChange}
                required
                disabled={isEditMode}
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
                {isEditMode ? "Cập nhật" : "Thêm"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TicketManagement;
