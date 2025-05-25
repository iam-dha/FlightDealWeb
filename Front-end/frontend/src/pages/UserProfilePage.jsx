import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/UserProfilePage.css";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { getUser } from "../services/api";
const UserProfilePage = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const navigate = useNavigate();

  const [avatar, setAvatar] = useState(
    "https://www.w3schools.com/howto/img_avatar.png"
  );
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const accessToken = Cookies.get("accessToken"); // Lấy token từ cookie
        // console.log("accessToken:", accessToken);
        if (!accessToken) {
          console.warn("Không có accessToken trong cookies.");
          return;
        }

        const userData = await getUser(accessToken);
        setProfile({
          name: userData?.data?.fullName || "",
          email: userData?.data?.email || "",
          phone: userData?.data?.phone || "",
          address: userData?.data?.address || "",
        });
        // console.log("Dữ liệu người dùng:", userData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchUser();
  }, []);
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAvatar(imageUrl);
    }
  };
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Nguyễn Văn A",
    email: "nguyenvana@gmail.com",
    phone: "0123 456 789",
    address: "ngõ 123",
  });

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    setIsEditing(false);
    alert("Thông tin đã được cập nhật!");
  };
  return (
    <div className="user-profile-container">
      <div className="profile-content">
        <aside className="profile-sidebar">
          <ul>
            <li className="back-button-user" onClick={() => navigate("/home")}>
              ← Quay lại
            </li>
            <li
              className={activeTab === "profile" ? "active" : ""}
              onClick={() => setActiveTab("profile")}
            >
              Hồ sơ của tôi
            </li>
            <li
              className={activeTab === "settings" ? "active" : ""}
              onClick={() => setActiveTab("settings")}
            >
              Cài đặt
            </li>
            <li
              className={activeTab === "bookings" ? "active" : ""}
              onClick={() => setActiveTab("bookings")}
            >
              Đơn đặt chỗ
            </li>
            <li
              className={activeTab === "logout" ? "active" : ""}
              onClick={() => {
                // Xử lý logout tại đây
                window.location.href = "/";
              }}
            >
              Đăng xuất
            </li>
          </ul>
        </aside>

        <main className="profile-main">
          {activeTab === "profile" && (
            <div className="profile-section">
              <h2>Thông tin cá nhân</h2>
              <div className="profile-info">
                <div className="avatar-wrapper">
                  <img src={avatar} alt="Avatar" className="profile-avatar" />
                  <label htmlFor="upload" className="change-avatar">
                    Đổi ảnh
                  </label>
                  <input
                    type="file"
                    id="upload"
                    hidden
                    onChange={handleImageChange}
                  />
                </div>
                <div className="profile-details">
                  <p>
                    <strong>Họ tên:</strong> {profile.name}
                  </p>
                  <p>
                    <strong>Email:</strong> {profile.email}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong> {profile.phone}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {profile.address}
                  </p>
                </div>
              </div>
              <div className="button-group">
                <button
                  className="edit-button"
                  onClick={() => setIsEditing(true)}
                >
                  ✍️ Chỉnh sửa
                </button>
                <button className="save-button" onClick={handleSave}>
                  💾 Lưu
                </button>
              </div>

              {/* Hộp chỉnh sửa */}
              {isEditing && (
                <div className="modal-overlay">
                  <div className="modal-container">
                    <h3>✍️ Chỉnh sửa thông tin</h3>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      placeholder="Họ tên"
                    />
                    <input
                      type="email"
                      name="email"
                      value={profile.email}
                      onChange={handleChange}
                      placeholder="Email"
                    />
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      placeholder="Số điện thoại"
                    />
                    <input
                      type="text"
                      name="address"
                      value={profile.address}
                      onChange={handleChange}
                      placeholder="Địa chỉ"
                    />
                    <div className="modal-buttons">
                      <button className="save-btn" onClick={handleSave}>
                        💾 Lưu
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => setIsEditing(false)}
                      >
                        ❌ Hủy
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === "settings" && (
            <div className="settings-section">
              <h2>Cài đặt tài khoản</h2>
              <p>Thông báo, mật khẩu, bảo mật...</p>
            </div>
          )}

          {activeTab === "bookings" && (
            <div className="bookings-section">
              <h2>Đơn đặt chỗ của tôi</h2>
              <p>Danh sách chuyến bay / khách sạn đã đặt.</p>
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
};

export default UserProfilePage;
