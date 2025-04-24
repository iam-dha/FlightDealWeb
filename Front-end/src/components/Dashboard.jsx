import React, { useState } from "react";
import Sidebar from "./Sidebar.jsx";
import UserManagement from "./UserManagement";
import OrderManagement from "./OrderManagement";
import TicketManagement from "./TicketManagement";
import PromotionManagement from "./PromotionManagement";
import "../styles/Dashboard.css";

const Dashboard = () => {
  const [page, setPage] = useState("users");

  const renderPage = () => {
    switch (page) {
      case "users":
        return <UserManagement />;
      case "orders":
        return <OrderManagement />;
      case "tickets":
        return <TicketManagement />;
      case "promotions":
        return <PromotionManagement />;
      default:
        return <UserManagement />;
    }
  };

  return (
    <div className="dashboard">
      <Sidebar setPage={setPage} />
      <div className="content">{renderPage()}</div>
    </div>
  );
};

export default Dashboard;
