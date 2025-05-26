import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/HotelPage.css";
import HotelSearchBar from "../components/SearchHotel";
import { getHotel } from "../services/api";
import Cookies from "js-cookie";
const HotelPage = () => {
  const [hotels, setHotels] = useState([]);
  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const accessToken = Cookies.get("accessToken"); // Lấy token từ cookie
        // console.log("accessToken:", accessToken);
        if (!accessToken) {
          console.warn("Không có accessToken trong cookies.");
          return;
        }

        const hotelData = await getHotel(accessToken);
        setHotels(hotelData?.data?.data);
        // console.log("Dữ liệu người dùng:", hotelData);
      } catch (error) {
        console.error("Lỗi khi lấy thông tin người dùng:", error);
      }
    };

    fetchHotel();
  }, []);
  useEffect(() => {
    const defaultHotels = [
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
    setHotels(defaultHotels);
  }, []);

  return (
    <>
      <Header />
      <HotelSearchBar />
      <div className="hotel-list">
        <h2>Khách sạn nổi bật</h2>
        <div className="hotels">
          {hotels.map((hotel, index) => (
            <div className="hotel-card" key={index}>
              <img
                src={hotel.thumbnail}
                alt={hotel.name}
                className="hotel-image"
              />
              <div className="hotel-info">
                <h3>{hotel.name}</h3>
                <p>{hotel.address}</p>
                <button>Đặt phòng</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default HotelPage;
