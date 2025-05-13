import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import "../../styles/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [notification, setNotification] = useState(""); // Thông báo thành công

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await api.get("/users");
      setUsers(res.data);
    } catch (error) {
      console.error("Lỗi khi tải danh sách người dùng:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xoá người dùng này?"
    );
    if (confirmDelete) {
      try {
        await api.delete(`/users/${id}`);
        setUsers(users.filter((u) => u._id !== id));
        showNotification("Xoá người dùng thành công!");
      } catch (error) {
        console.error("Lỗi khi xoá người dùng:", error);
      }
    }
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 3000); // Ẩn thông báo sau 3 giây
  };

  return (
    <div className="container">
      <h2>Quản lý Người dùng</h2>
      {notification && <div className="notification">{notification}</div>}
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên đầy đủ</th>
            <th>Email</th>
            <th>Số điện thoại</th>
            <th>Mật khẩu (mã hóa)</th>
            <th>Địa chỉ</th>
            <th>Thông tin thanh toán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone || "N/A"}</td>
              <td>{user.password || "********"}</td>
              <td>{user.address || "N/A"}</td>
              <td>
                {user.paymentInfo
                  ? user.paymentInfo.map((payment, index) => (
                      <div key={index}>{payment}</div>
                    ))
                  : "N/A"}
              </td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(user._id)}
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

export default UserManagement;
