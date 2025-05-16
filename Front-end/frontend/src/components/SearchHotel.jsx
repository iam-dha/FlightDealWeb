import React, { useState } from "react";
import "../styles/SearchHotel.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaBed } from "react-icons/fa";

const HotelSearchBar = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [results, setResults] = useState([]);

  const hotelData = [
    {
      name: "Hotel Majestic Sài Gòn",
      location: "Quận 1, TP. Hồ Chí Minh",
      price: "2,000,000 đ/đêm",
      rating: 8.5,
      reviews: 1500,
      image:
        "https://cdn6.agoda.net/images/hotelimages/297/297/297_18050410450064028328.jpg",
    },
    {
      name: "InterContinental Hanoi",
      location: "Tây Hồ, Hà Nội",
      price: "3,500,000 đ/đêm",
      rating: 9.0,
      reviews: 1200,
      image:
        "https://pix10.agoda.net/hotelImages/124/12474/12474_16030410180040512058.jpg",
    },
    {
      name: "Vinpearl Resort Nha Trang",
      location: "Nha Trang, Khánh Hòa",
      price: "4,200,000 đ/đêm",
      rating: 8.8,
      reviews: 2000,
      image:
        "https://cdn6.agoda.net/images/hotelimages/333/3333/3333_16040414000040949304.jpg",
    },
  ];

  const handleSearch = () => {
    alert(
      `Tìm khách sạn ở ${location}, từ ${checkIn} đến ${checkOut}, ${guests} khách, ${rooms} phòng.`
    );
    // Lọc kết quả theo location (giả lập)
    const filtered = hotelData.filter((hotel) =>
      hotel.name.toLowerCase().includes(location.toLowerCase())
    );
    setResults(filtered.length ? filtered : hotelData);
  };

  return (
    <div>
      <div className="hotel-search-bar">
        <div className="input-group">
          <FaMapMarkerAlt className="icon" />
          <input
            type="text"
            placeholder="Địa điểm, tên khách sạn"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaCalendarAlt className="icon" />
          <input
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaCalendarAlt className="icon" />
          <input
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
          />
        </div>
        <div className="input-group">
          <FaUser className="icon" />
          <select value={guests} onChange={(e) => setGuests(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} khách
              </option>
            ))}
          </select>
        </div>
        <div className="input-group">
          <FaBed className="icon" />
          <select value={rooms} onChange={(e) => setRooms(e.target.value)}>
            {[1, 2, 3, 4, 5].map((num) => (
              <option key={num} value={num}>
                {num} phòng
              </option>
            ))}
          </select>
        </div>
        <button onClick={handleSearch}>🔍 Tìm kiếm</button>
      </div>

      {results.length > 0 && (
        <div className="hotels">
          {hotelData.map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img src={hotel.image} alt={hotel.name} className="hotel-image" />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.location}</p>
                <p className="hotel-price">{hotel.price}</p>
                <p>
                  ⭐ {hotel.rating} ({hotel.reviews} đánh giá)
                </p>
                <button>Đặt phòng</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelSearchBar;
