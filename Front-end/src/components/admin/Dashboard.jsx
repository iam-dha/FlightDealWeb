/*import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import UserManagement from "./UserManagement.jsx";
import OrderManagement from "./OrderManagement.jsx";
import TicketManagement from "./TicketManagement.jsx";
import PromotionManagement from "./PromotionManagement.jsx";
import Statistics from "./Statistics.jsx";
import "../styles/Dashboard.css";
import "../styles/Sidebar.css";

const Dashboard = () => {
  const [page, setPage] = useState("statistics");

  const handleLogout = () => {
    // Điều hướng về trang đăng nhập
    window.location.href = "/login"; // Thay "/login" bằng đường dẫn thực tế của giao diện đăng nhập
  };

  const renderPage = () => {
    switch (page) {
      case "statistics":
        return <Statistics />;
      case "users":
        return <UserManagement />;
      case "orders":
        return <OrderManagement />;
      case "tickets":
        return <TicketManagement />;
      case "promotions":
        return <PromotionManagement />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setPage={setPage} handleLogout={handleLogout} />
      <div className="content">{renderPage()}</div>
    </div>
  );
};

export default Dashboard;
*/
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

  return (
    <Router>
      <div className="dashboard">
        <Sidebar handleLogout={handleLogout} />
        <div className="content">
          <Routes>
            <Route path="/admin/dashboard" element={<Statistics />} />
            <Route path="/admin/users" element={<UserManagement />} />
            <Route path="/admin/orders" element={<OrderManagement />} />
            <Route path="/admin/tickets" element={<TicketManagement />} />
            <Route path="/admin/promotions" element={<PromotionManagement />} />
            <Route path="*" element={<Navigate to="/admin/dashboard" />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default Dashboard;
