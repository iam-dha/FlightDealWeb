import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import "../styles/TransactionHistory.css";

const transactions = [
  {
    id: 1,
    date: "20 Thg 5, 2025 - 14:00",
    amount: 500000,
    type: "Thanh toán khách sạn",
    status: "Thành công",
    code: "HDX123456",
    location: "Khách sạn Da Nang Central",
    method: "Thẻ VISA",
    icon: "🏨",
  },
  {
    id: 2,
    date: "18 Thg 5, 2025 - 09:35",
    amount: -200000,
    type: "Hoàn tiền vé máy bay",
    status: "Đã hoàn tiền",
    code: "HDX654321",
    location: "Chuyến bay Hà Nội - HCM",
    method: "Ví MoMo",
    icon: "✈️",
  },
  {
    id: 3,
    date: "15 Thg 5, 2025 - 17:45",
    amount: 1000000,
    type: "Thanh toán tour",
    status: "Thành công",
    code: "HDX789123",
    location: "Tour du lịch Phú Quốc",
    method: "Thẻ MasterCard",
    icon: "🗺️",
  },
];

export default function TransactionHistory() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const filteredTransactions = transactions.filter(
    (txn) =>
      txn.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      txn.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (txn) => {
    const doc = new jsPDF();
    doc.text("HÓA ĐƠN GIAO DỊCH", 10, 10);
    doc.text(`Mã giao dịch: ${txn.code}`, 10, 20);
    doc.text(`Loại: ${txn.type}`, 10, 30);
    doc.text(`Ngày: ${txn.date}`, 10, 40);
    doc.text(`Số tiền: ${txn.amount.toLocaleString()} đ`, 10, 50);
    doc.text(`Địa điểm: ${txn.location}`, 10, 60);
    doc.text(`Phương thức: ${txn.method}`, 10, 70);
    doc.save(`HoaDon_${txn.code}.pdf`);
  };

  return (
    <div className="transaction-history-container">
      <div className="header">
        <button className="back-button" onClick={() => navigate("/home")}>
          ⬅ Quay lại
        </button>
        <h2>Lịch sử giao dịch</h2>
      </div>

      <input
        type="text"
        className="search-input"
        placeholder="Tìm kiếm theo mã giao dịch hoặc địa điểm..."
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {filteredTransactions.map((txn) => (
        <div
          key={txn.id}
          className="transaction-card"
          onClick={() => setSelectedTransaction(txn)}
        >
          <div className="transaction-top">
            <div className="icon">{txn.icon}</div>
            <div className="info">
              <div className="type">{txn.type}</div>
              <div className="location">{txn.location}</div>
              <div className="date">{txn.date}</div>
            </div>
            <div
              className={`amount ${txn.amount < 0 ? "negative" : "positive"}`}
            >
              {txn.amount.toLocaleString("vi-VN")} đ
            </div>
          </div>

          <div className="transaction-bottom">
            <div className="code">Mã: {txn.code}</div>
            <div className="method">Phương thức: {txn.method}</div>
            <div
              className={`status ${
                txn.status === "Thành công"
                  ? "success"
                  : txn.status === "Đã hoàn tiền"
                  ? "refund"
                  : "pending"
              }`}
            >
              {txn.status}
            </div>
          </div>
        </div>
      ))}

      {selectedTransaction && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedTransaction(null)}
        >
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h3>Chi tiết giao dịch</h3>
            <p>
              <strong>Mã:</strong> {selectedTransaction.code}
            </p>
            <p>
              <strong>Loại:</strong> {selectedTransaction.type}
            </p>
            <p>
              <strong>Ngày:</strong> {selectedTransaction.date}
            </p>
            <p>
              <strong>Địa điểm:</strong> {selectedTransaction.location}
            </p>
            <p>
              <strong>Phương thức:</strong> {selectedTransaction.method}
            </p>
            <p>
              <strong>Số tiền:</strong>{" "}
              {selectedTransaction.amount.toLocaleString("vi-VN")} đ
            </p>
            <p>
              <strong>Trạng thái:</strong> {selectedTransaction.status}
            </p>
            <button
              className="download-btn"
              onClick={() => handleDownload(selectedTransaction)}
            >
              📄 Tải hóa đơn PDF
            </button>
            <button
              className="close-btn"
              onClick={() => setSelectedTransaction(null)}
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
