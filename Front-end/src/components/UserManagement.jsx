import { useState, useEffect } from "react";
import axios from "axios";

export default function UserManagement() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/users").then((res) => setUsers(res.data));
  }, []);

  return (
    <div className="admin-section">
      <h2>Quản lý người dùng</h2>
      <table>
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Email</th>
            <th>Vai trò</th>
            <th>Thao tác</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.fullname}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>
                <button>Sửa</button>
                <button>Xoá</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
