import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ handleLogout, navigateToHome }) => {
  return (
    <div className="sidebar">
      <h2>Admin</h2>
      <ul>
        <li>
          <Link to="/admin/dashboard">Tổng quan</Link>
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
        <li onClick={handleLogout}>Đăng xuất</li>
        <li onClick={navigateToHome}> Quay về Trang Chủ</li>
      </ul>
    </div>
  );
};

export default Sidebar;
