import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ handleLogout }) => {
  return (
    <div className="sidebar">
      <h2>Quản lý</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">Thống kê</Link>
        </li>
        <li>
          <Link to="/admin/users">Quản lý Người dùng</Link>
        </li>
        <li>
          <Link to="/admin/orders">Quản lý Đơn hàng</Link>
        </li>
        <li>
          <Link to="/admin/tickets">Quản lý Vé</Link>
        </li>
        <li>
          <Link to="/admin/promotions">Quản lý Khuyến mãi</Link>
        </li>
        <li className="logout-btn" onClick={handleLogout}>
          Đăng xuất
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
