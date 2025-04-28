import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/UserManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    const res = await api.get("/orders");
    setOrders(res.data);
  };

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
            <th>ID Đơn hàng</th>
            <th>ID Người dùng</th>
            <th>Loại sản phẩm</th>
            <th>Chi tiết sản phẩm</th>
            <th>Số lượng</th>
            <th>Giá tổng cộng</th>
            <th>Trạng thái</th>
            <th>Thời gian đặt</th>
            <th>Phương thức thanh toán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{order.userId}</td>
              <td>{order.productType}</td>
              <td>{order.productDetails}</td>
              <td>{order.quantity}</td>
              <td>{order.total} VND</td>
              <td>{order.status}</td>
              <td>{new Date(order.date).toLocaleString()}</td>
              <td>{order.paymentMethod}</td>
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
