import React from "react";
import "../styles/ResultSearchVehicle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBus,
  faMapMarkerAlt,
  faClock,
  faUserGroup,
  faSuitcaseRolling,
} from "@fortawesome/free-solid-svg-icons";

const dummyResults = [
  {
    id: 1,
    company: "Xe Limousine ABC",
    from: "Hà Nội",
    to: "Ninh Bình",
    time: "07:30",
    duration: "2h 30m",
    price: "200.000₫",
    passengers: 9,
    luggage: "20kg/người",
    image: "/images/airportTransfer/bus.jpg",
  },
  {
    id: 2,
    company: "Xe VIP 123",
    from: "Hà Nội",
    to: "Ninh Bình",
    time: "09:00",
    duration: "2h 15m",
    price: "220.000₫",
    passengers: 16,
    luggage: "15kg/người",
    image: "/images/airportTransfer/sedan.jpg",
  },
];

export default function ResultSearchVehicle() {
  return (
    <div className="result-container">
      <h2 className="result-title">🚍 Kết quả tìm kiếm chuyến xe</h2>
      <div className="vehicle-list">
        {dummyResults.map((item) => (
          <div className="vehicle-card" key={item.id}>
            <img src={item.image} alt={item.company} className="vehicle-img" />
            <div className="vehicle-info">
              <h3 className="company">{item.company}</h3>
              <p className="route">
                <FontAwesomeIcon icon={faMapMarkerAlt} /> {item.from} →{" "}
                {item.to}
              </p>
              <p className="time">
                <FontAwesomeIcon icon={faClock} /> {item.time} ({item.duration})
              </p>
              <p className="capacity">
                <FontAwesomeIcon icon={faUserGroup} /> {item.passengers} hành
                khách | <FontAwesomeIcon icon={faSuitcaseRolling} />{" "}
                {item.luggage}
              </p>
              <p className="price">{item.price}</p>
              <button className="book-btn">
                <FontAwesomeIcon icon={faBus} /> Đặt ngay
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
