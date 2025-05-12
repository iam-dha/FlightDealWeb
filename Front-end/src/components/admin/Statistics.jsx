import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import "../../styles/Statistics.css";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalTicketsSold: 0,
    totalUsers: 0,
    bestSellingFlight: "N/A",
  });
  const [revenueData, setRevenueData] = useState([]);

  useEffect(() => {
    fetchStats();
    fetchRevenueData();
  }, []);

  const fetchStats = async () => {
    try {
      const res = await api.get("/stats");
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

  const fetchRevenueData = async () => {
    try {
      const res = await api.get("/revenue");
      setRevenueData(res.data || []);
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu doanh thu:", error);
    }
  };

  const chartData = {
    labels: revenueData.map((data) => data.date),
    datasets: [
      {
        label: "Doanh thu (VND)",
        data: revenueData.map((data) => data.revenue),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
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

      <div className="chart-container">
        <h3>Biểu đồ doanh thu</h3>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            plugins: { legend: { position: "top" } },
          }}
        />
      </div>
    </div>
  );
};

export default Statistics;
