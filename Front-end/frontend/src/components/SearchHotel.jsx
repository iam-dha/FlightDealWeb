import React, { useState } from "react";
import "../styles/SearchHotel.css";
import { FaMapMarkerAlt, FaCalendarAlt, FaUser, FaBed } from "react-icons/fa";
import { searchHotel } from "../services/api";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const HotelSearchBar = () => {
  const [location, setLocation] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [rooms, setRooms] = useState(1);
  const [data, setData] = useState([]);
  const [hotelId, setHotelId] = useState("");
  const navigate = useNavigate();

  const handleBooking = (index) => {
    if (Array.isArray(data) && data.length > 0) {
      setHotelId(data[index]._id); // cập nhật hotelId ngay lập tức
      console.log("Hotel ID:", data[index]._id);
    } else {
      console.log("Không có khách sạn phù hợp");
      setHotelId(null); // hoặc undefined
    }
    navigate(`/details-hotel/${data[index]._id}`);
  };

  const handleSearch = async (index) => {
    const accessToken = Cookies.get("accessToken");
    const results = await searchHotel(accessToken, location);

    const newHotels = results.data.data;
    setData(newHotels); // cập nhật danh sách khách sạn
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

      {data.length > 0 && (
        <div className="hotels">
          {data.map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img
                src={hotel.thumbnail}
                alt={hotel.name}
                className="hotel-image"
              />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.address}</p>
                <button onClick={() => handleBooking(index)}>Đặt phòng</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HotelSearchBar;
