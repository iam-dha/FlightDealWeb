import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/UserManagement.css";

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    api.get("/users").then((res) => setUsers(res.data));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/users/${id}`);
    setUsers(users.filter((u) => u._id !== id));
  };

  return (
    <div className="container">
      <h2>Quản lý Người dùng</h2>
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
