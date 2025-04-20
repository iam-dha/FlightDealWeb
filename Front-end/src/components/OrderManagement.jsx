import { useEffect, useState } from "react";
import axios from "axios";

export default function OrderManagement() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("/api/orders").then((res) => setOrders(res.data));
  }, []);

  return (
    <div className="admin-section">
      <h2>Quản lý đơn đặt hàng</h2>
      <table>
        <thead>
          <tr>
            <th>Mã đơn</th>
            <th>Người đặt</th>
            <th>Chuyến bay</th>
            <th>Trạng thái</th>
            <th>Ngày đặt</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order.code}</td>
              <td>{order.userName}</td>
              <td>{order.flightCode}</td>
              <td>{order.status}</td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
