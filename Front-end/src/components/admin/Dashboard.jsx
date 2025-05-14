import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import UserManagement from "./UserManagement.jsx";
import OrderManagement from "./OrderManagement.jsx";
import TicketManagement from "./TicketManagement.jsx";
import PromotionManagement from "./PromotionManagement.jsx";
import Statistics from "./Statistics.jsx";
import "../../styles/Dashboard.css";

const Dashboard = () => {
  const handleLogout = () => {
    // Điều hướng về trang đăng nhập
    window.location.href = "/login"; // Thay "/login" bằng đường dẫn thực tế của giao diện đăng nhập
  };
  const navigateToHome = () => {
    // Điều hướng về trang chủ
    window.location.href = "/home"; // Thay "/home" bằng đường dẫn thực tế của trang chủ
  };
  return (
    <Router>
      <div className="dashboard">
        <Sidebar handleLogout={handleLogout} navigateToHome={navigateToHome} />
        <div className="content">
          <Routes>
            <Route path="/admin/dashboard" element={<Statistics />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/tickets" element={<TicketManagement />} />
            <Route path="/admin/promotions" element={<PromotionManagement />} />
            <Route path="*" element={<h2>404 - Page not found</h2>} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
