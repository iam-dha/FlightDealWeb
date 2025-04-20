import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import UserManagement from "./components/UserManagement";
import OrderManagement from "./components/OrderManagement";
import FlightManagement from "./components/FlightManagement";
import PromotionManagement from "./components/PromotionManagement";
import "./styles/admin.css";

function App() {
  return (
    <Router>
      <div className="app-container">
        <nav className="sidebar">
          <h2>Admin Panel</h2>
          <ul>
            <li>
              <Link to="/users">Quản lý người dùng</Link>
            </li>
            <li>
              <Link to="/orders">Quản lý đơn đặt hàng</Link>
            </li>
            <li>
              <Link to="/flights">Quản lý chuyến bay</Link>
            </li>
            <li>
              <Link to="/promotions">Quản lý khuyến mãi</Link>
            </li>
          </ul>
        </nav>

        <main className="content">
          <Routes>
            <Route path="/users" element={<UserManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/flights" element={<FlightManagement />} />
            <Route path="/promotions" element={<PromotionManagement />} />
            <Route
              path="*"
              element={<h3>Chọn một mục ở thanh bên trái để bắt đầu.</h3>}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
