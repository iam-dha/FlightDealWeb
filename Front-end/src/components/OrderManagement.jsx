import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/UserManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders").then((res) => setOrders(res.data));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/orders/${id}`);
    setOrders(orders.filter((o) => o._id !== id));
  };

  return (
    <div className="container">
      <h2>Quản lý Đơn đặt hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Khách hàng</th>
            <th>Tổng tiền</th>
            <th>Ngày đặt</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.code}</td>
              <td>{order.customerName}</td>
              <td>{order.total} VND</td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(order._id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;
