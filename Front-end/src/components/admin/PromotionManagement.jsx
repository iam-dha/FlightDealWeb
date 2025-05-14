import React, { useEffect, useState } from "react";
import api from "../../services/api.js";
import "../../styles/PromotionManagement.css";

const PromotionManagement = () => {
  const [promotions, setPromotions] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [formData, setFormData] = useState({
    id: "",
    code: "",
    description: "",
    discount: "",
    validity: "",
    conditions: "",
  });
  const [notification, setNotification] = useState(""); // Thông báo thành công

  useEffect(() => {
    fetchPromotions();
  }, []);

  const fetchPromotions = async () => {
    const res = await api.get("/promotions");
    setPromotions(res.data);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Bạn có chắc chắn muốn xoá khuyến mãi này?"
    );
    if (confirmDelete) {
      await api.delete(`/promotions/${id}`);
      setPromotions(promotions.filter((p) => p._id !== id));
      showNotification("Xoá khuyến mãi thành công!");
    }
  };

  const handleEdit = (promo) => {
    setFormData(promo); // Đổ dữ liệu của khuyến mãi cần sửa vào form
    setIsEditMode(true); // Bật chế độ sửa
    setIsModalOpen(true); // Mở modal
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddOrEditPromotion = async (e) => {
    e.preventDefault();
    if (isEditMode) {
      // Chế độ sửa
      await api.post(`/promotions/${formData._id}`, formData);
      setPromotions(
        promotions.map((p) => (p._id === formData._id ? formData : p))
      );
      showNotification("Cập nhật khuyến mãi thành công!");
    } else {
      // Chế độ thêm mới
      await api.post("/promotions", formData);
      setPromotions([...promotions, formData]);
      showNotification("Thêm khuyến mãi thành công!");
    }
    setFormData({
      id: "",
      code: "",
      description: "",
      discount: "",
      validity: "",
      conditions: "",
    });
    setIsModalOpen(false);
    setIsEditMode(false); // Tắt chế độ sửa
    fetchPromotions();
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2000); // Ẩn thông báo sau 3 giây
  };

  return (
    <div className="container">
      <h2>Quản lý Khuyến mãi</h2>
      {notification && <div className="notification">{notification}</div>}
      <button className="add-btn" onClick={() => setIsModalOpen(true)}>
        Thêm khuyến mãi
      </button>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Mã code</th>
            <th>Mô tả</th>
            <th>Giảm giá</th>
            <th>Thời gian hiệu lực</th>
            <th>Điều kiện áp dụng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {promotions.map((promo) => (
            <tr key={promo._id}>
              <td>{promo.id}</td>
              <td>{promo.code}</td>
              <td>{promo.description}</td>
              <td>{promo.discount}%</td>
              <td>{new Date(promo.validity).toLocaleDateString()}</td>
              <td>{promo.conditions}</td>
              <td>
                <button
                  className="action-btn"
                  onClick={() => handleDelete(promo._id)}
                >
                  Xoá
                </button>
                <button
                  className="action-btn edit-btn"
                  onClick={() => handleEdit(promo)}
                >
                  Sửa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal thêm/sửa khuyến mãi */}
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button
              className="modal-close"
              onClick={() => {
                setIsModalOpen(false);
                setIsEditMode(false); // Tắt chế độ sửa khi đóng modal
              }}
            >
              ×
            </button>
            <h3>{isEditMode ? "Sửa khuyến mãi" : "Thêm khuyến mãi"}</h3>
            <form onSubmit={handleAddOrEditPromotion}>
              <label>ID mã khuyến mãi:</label>
              <input
                type="text"
                name="id"
                value={formData.id}
                onChange={handleInputChange}
                required
                disabled={isEditMode} // Không cho sửa ID khi ở chế độ sửa
              />

              <label>Mã code:</label>
              <input
                type="text"
                name="code"
                value={formData.code}
                onChange={handleInputChange}
                required
              />

              <label>Mô tả:</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                required
              ></textarea>

              <label>Phần trăm/giá trị giảm giá:</label>
              <input
                type="number"
                name="discount"
                value={formData.discount}
                onChange={handleInputChange}
                required
              />

              <label>Thời gian hiệu lực:</label>
              <input
                type="date"
                name="validity"
                value={formData.validity}
                onChange={handleInputChange}
                required
              />

              <label>Điều kiện áp dụng:</label>
              <textarea
                name="conditions"
                value={formData.conditions}
                onChange={handleInputChange}
                required
              ></textarea>

              <button type="submit" className="submit-btn">
                {isEditMode ? "Cập nhật" : "Thêm"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PromotionManagement;
