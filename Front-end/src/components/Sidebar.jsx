import React from "react";
import "../styles/Sidebar.css";

const Sidebar = ({ setPage }) => {
  return (
    <div className="sidebar">
      <h2>Admin Panel</h2>
      <ul>
        <li onClick={() => setPage("users")}>Người dùng</li>
        <li onClick={() => setPage("orders")}>Đơn hàng</li>
        <li onClick={() => setPage("tickets")}>Vé máy bay</li>
        <li onClick={() => setPage("promotions")}>Khuyến mãi</li>
      </ul>
    </div>
  );
};

export default Sidebar;
