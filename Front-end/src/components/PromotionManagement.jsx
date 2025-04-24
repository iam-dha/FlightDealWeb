/*
import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/UserManagement.css";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);

  useEffect(() => {
    api.get("/promotions").then((res) => setPromotions(res.data));
  }, []);

  const handleDelete = async (id) => {
    await api.delete(`/promotions/${id}`);
    setPromotions(promotions.filter((p) => p._id !== id));
  };

  return (
    <div className="container">
      <h2>Quản lý Khuyến mãi</h2>
      <table>
        <thead>
          <tr>
            <th>Tên khuyến mãi</th>
            <th>Mã</th>
            <th>Giảm (%)</th>
            <th>Ngày hết hạn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo._id}>
              <td>{promo.name}</td>
              <td>{promo.code}</td>
              <td>{promo.discount}%</td>
              <td>{new Date(promo.expiry).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(promo._id)}
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

export default PromotionManagement;
*/

import React, { useEffect, useState } from "react";
import api from "../services/api.js";
import "../styles/PromotionManagement.css";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    discount: "",
    expiry: "",
  });

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const res = await api.get("/promotions");
    setPromotions(res.data);
  };

  const handleDelete = async (id) => {
    await api.delete(`/promotions/${id}`);
    setPromotions(promotions.filter((p) => p._id !== id));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddPromotion = async (e) => {
    e.preventDefault();
    await api.post("/promotions", formData);
    setFormData({ name: "", code: "", discount: "", expiry: "" });
    setIsModalOpen(false);
    fetchPromotions();
  };

  return (
    <div className="container">
      <h2>Quản lý Khuyến mãi</h2>
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        Thêm khuyến mãi
      </button>

      <table>
        <thead>
          <tr>
            <th>Tên khuyến mãi</th>
            <th>Mã</th>
            <th>Giảm (%)</th>
            <th>Ngày hết hạn</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo._id}>
              <td>{promo.name}</td>
              <td>{promo.code}</td>
              <td>{promo.discount}%</td>
              <td>{new Date(promo.expiry).toLocaleDateString()}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(promo._id)}
                >
                  Xoá
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm khuyến mãi */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => setIsModalOpen(false)}
            >
              ×
            </button>
            <h3>Thêm khuyến mãi</h3>
            <form onSubmit={handleAddPromotion}>
              <label>Tên khuyến mãi:</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />

              <label>Mã khuyến mãi:</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />

              <label>Giảm giá (%):</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />

              <label>Ngày hết hạn:</label>
              <input
                type="date"
                name="expiry"
                value={formData.expiry}
                onChange={handleInputChange}
                required
              />

              <button type="submit" className="submit-btn">
                Thêm
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManagement;
