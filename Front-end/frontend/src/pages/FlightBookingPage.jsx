import React, { useState } from "react";
import "../styles/FlightBooking.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
export default function FlightBooking() {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [passengers, setPassengers] = useState(1);
  const [classType, setClassType] = useState("economy");

  const handleSearch = () => {
    alert(
      `Tìm chuyến bay từ ${from} đến ${to} vào ngày ${date} cho ${passengers} hành khách - Hạng: ${classType}`
    );
  };

  return (
    <>
      <Header />
      <div className="flight-booking-container">
        <h1 className="title">Tìm vé máy bay giá rẻ</h1>
        <div className="flight-form">
          <div className="form-group">
            <label>Điểm đi</label>
            <input
              type="text"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              placeholder="TP Hồ Chí Minh (SGN)"
            />
          </div>

          <div className="form-group">
            <label>Điểm đến</label>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Hà Nội (HAN)"
            />
          </div>

          <div className="form-group">
            <label>Ngày đi</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Hành khách</label>
            <input
              type="number"
              value={passengers}
              onChange={(e) => setPassengers(e.target.value)}
              min="1"
            />
          </div>

          <div className="form-group">
            <label>Hạng ghế</label>
            <select
              value={classType}
              onChange={(e) => setClassType(e.target.value)}
            >
              <option value="economy">Phổ thông</option>
              <option value="business">Thương gia</option>
              <option value="first">Hạng nhất</option>
            </select>
          </div>

          <button className="search-btn" onClick={handleSearch}>
            🔍 Tìm chuyến bay
          </button>
        </div>
        {/* ƯU ĐÃI */}
        <div className="offers-section">
          <h2>Ưu đãi nổi bật</h2>
          <div className="offers-list">
            <div className="offer-card">
              <img
                src="https://via.placeholder.com/300x150?text=VietJet+Sale"
                alt="Khuyến mãi 1"
              />
              <p>Giảm đến 40% cho vé VietJet Air – Chỉ trong tuần này!</p>
            </div>
            <div className="offer-card">
              <img
                src="https://via.placeholder.com/300x150?text=Bay+cuối+tuần"
                alt="Khuyến mãi 2"
              />
              <p>Ưu đãi vé cuối tuần từ Bamboo Airways chỉ từ 499K</p>
            </div>
            <div className="offer-card">
              <img
                src="https://via.placeholder.com/300x150?text=Combo+vé+KS"
                alt="Khuyến mãi 3"
              />
              <p>Combo vé + khách sạn tiết kiệm đến 50%</p>
            </div>
          </div>
        </div>

        {/* BÀI VIẾT */}
        <div className="articles-section">
          <h2>Cẩm nang du lịch & mẹo săn vé</h2>
          <div className="articles-list">
            <div className="article-card">
              <h3>Mẹo săn vé máy bay giá rẻ đi Hà Nội</h3>
              <p>
                Khám phá 5 bí quyết giúp bạn dễ dàng săn được vé rẻ bất kỳ lúc
                nào.
              </p>
              <a href="#">Đọc thêm →</a>
            </div>
            <div className="article-card">
              <h3>Du lịch Đà Nẵng tự túc từ A-Z</h3>
              <p>
                Lên lịch trình, chọn khách sạn, điểm tham quan và món ngon không
                thể bỏ qua.
              </p>
              <a href="#">Đọc thêm →</a>
            </div>
            <div className="article-card">
              <h3>So sánh các hãng bay nội địa Việt Nam</h3>
              <p>
                Vietnam Airlines, VietJet hay Bamboo? Bài viết này sẽ giúp bạn
                quyết định.
              </p>
              <a href="#">Đọc thêm →</a>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
