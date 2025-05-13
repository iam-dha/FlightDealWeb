import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import "../../styles/Statistics.css";

const Statistics = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalUsers: 0,
    bestSellingFlight: "N/A",
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/statistics"); // Đảm bảo endpoint đúng
      console.log("Dữ liệu thống kê:", res.data); // Kiểm tra dữ liệu trả về từ API
      setStats(
        res.data || {
          totalOrders: 0,
          totalRevenue: 0,
          totalTicketsSold: 0,
          totalUsers: 0,
          bestSellingFlight: "N/A",
        }
      );
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu thống kê:", error);
    }
  };

  return (
    <div className="statistics-container">
      <h2>Thống kê</h2>
      <div className="stats-overview">
        <div className="stat-item">
          <h3>Tổng số đơn đặt vé</h3>
          <p>{stats.totalOrders}</p>
        </div>
        <div className="stat-item">
          <h3>Doanh thu tổng</h3>
          <p>
            {stats.totalRevenue ? stats.totalRevenue.toLocaleString() : "0"} VND
          </p>
        </div>
        <div className="stat-item">
          <h3>Tổng số vé đã bán</h3>
          <p>{stats.totalTicketsSold}</p>
        </div>
        <div className="stat-item">
          <h3>Tổng số người dùng</h3>
          <p>{stats.totalUsers}</p>
        </div>
        <div className="stat-item">
          <h3>Chuyến bay bán chạy nhất</h3>
          <p>{stats.bestSellingFlight}</p>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
