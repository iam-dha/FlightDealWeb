import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import "../../styles/UserManagement.css";

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [notification, setNotification] = useState(""); // Thông báo thành công

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await api.get("/orders");
      setOrders(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách đơn hàng:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xoá đơn hàng này?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/orders/${id}`);
        setOrders(orders.filter((o) => o._id !== id));
        showNotification("Xoá đơn hàng thành công!");
      } catch (error) {
        console.error("Lỗi khi xoá đơn hàng:", error);
      }
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Ẩn thông báo sau 3 giây
  };

  return (
    <div className="container">
      <h2>Quản lý Đơn đặt hàng</h2>
      {notification && <div className="notification">{notification}</div>}
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
