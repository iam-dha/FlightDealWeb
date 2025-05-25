import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays, faChair } from "@fortawesome/free-solid-svg-icons";
import "../styles/HomePage.css";
import FlightDetailBox from "../components/FlightDetailBox";
import FlightCheckoutPage from "./FlightCheckoutPage";
import { searchFly, getHotel } from "../services/api";
import Cookies from "js-cookie";
const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [from, setFrom] = useState("SGN");
  const [to, setTo] = useState("HAN");
  const [date, setDate] = useState("2025-06-01");
  const [passenger, setPassenger] = useState(1);
  const [flightClass, setFlightClass] = useState("ECONOMY");
  const [flights, setFlights] = useState([]);
  const [showDefaultFlights, setShowDefaultFlights] = useState(true);

  const formData = {
    from: from,
    to: to,
    date: date,
  };
  const handleSearch = async () => {
    const accessToken = Cookies.get("accessToken");
    const results = await searchFly(formData, accessToken);
    setFlights(results.data.results);

    setShowDefaultFlights(false);
  };
  useEffect(() => {
    handleSearch();
  }, []);
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
  // search
  const [adults, setAdults] = useState(2);
  const [children, setChildren] = useState(0);
  const [rooms, setRooms] = useState(1);
  const [isOpen, setIsOpen] = useState(false);

  const [tempAdults, setTempAdults] = useState(adults);
  const [tempChildren, setTempChildren] = useState(children);
  const [tempRooms, setTempRooms] = useState(rooms);
  const [seatClass, setSeatClass] = useState("economy"); //hạng ghê
  const [isRoundTrip, setIsRoundTrip] = useState(false); //Khứ hồi
  const [selectedFlight, setSelectedFlight] = useState(null); //Đặt vé
  const [selectedOption, setSelectedOption] = useState(null);
  const [showCheckout, setShowCheckout] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleIncrement = (setter) => setter((prev) => prev + 1);
  const handleDecrement = (setter, value) => {
    if (value > 0) setter((prev) => prev - 1);
  };

  const handleDone = () => {
    setAdults(tempAdults);
    setChildren(tempChildren);
    setRooms(tempRooms);
    setIsOpen(false);
  };
  // Chọn hạng vé khi đã ấn đặt vé
  const handleChooseOption = (option) => {
    setSelectedFlight(selectedFlight);
    setSelectedOption(option);
    setShowCheckout(false);
  };
  const handleBookticket = (flight) => {
    setSelectedFlight(flight);
    setShowCheckout(true);
  };
  // console.log(flights);
  return (
    <div className="homepage-container">
      <Header />
      <section className="homepage-hero">
        <h2 className="text_title_home">Đặt vé máy bay giá rẻ dễ dàng</h2>
        <p className="text_description_title_home">
          Hãy khám phá những khách sạn tốt nhất tại TravelFly, để bắt đầu chuyến
          hành trình kì diệu của bạn.
        </p>

        <div className="search-bar">
          <div className="container_search_value">
            <div className="titleSelect">
              <img src="/images/live-view.svg" alt="user" />
              <p className="textImageSearch">Thành phố, địa điểm đi:</p>
            </div>
            <input
              type="text"
              placeholder="Điểm đi"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
            />
          </div>
          <div className="container_search_value">
            <div className="titleSelect">
              <img src="/images/live-view.svg" alt="user" />
              <p className="textImageSearch">Thành phố, địa điểm đến:</p>
            </div>
            <input
              type="text"
              placeholder="Điểm đến"
              value={to}
              onChange={(e) => setTo(e.target.value)}
            />
          </div>
          <div className="container_search_value">
            <div className="titleSelect">
              <FontAwesomeIcon
                icon={faCalendarDays}
                className="calendar-icon"
              />
              <p className="textImageSearch">Ngày khởi hành:</p>
            </div>

            <DatePicker
              selected={date ? new Date(date) : null}
              onChange={(date) => setDate(date.toISOString().slice(0, 10))}
              dateFormat="dd/MM/yyyy"
              className="custom-Date"
              placeholderText="Chọn ngày đi"
            />
          </div>
          <div className="container_search_value">
            <div className="titleSelect">
              <FontAwesomeIcon icon={faChair} className="seat-icon" />
              <p className="textImageSearch">Hạng ghế:</p>
            </div>
            <select
              value={seatClass}
              onChange={(e) => setSeatClass(e.target.value)}
              className="select_class_seat"
            >
              <option value="economy">Phổ thông</option>
              <option value="business">Thương gia</option>
            </select>
          </div>
          <div className="container_search_value">
            <div className="titleSelect">
              <input
                type="checkbox"
                id="roundTrip"
                checked={isRoundTrip}
                onChange={() => setIsRoundTrip(!isRoundTrip)}
                className="check-box-input"
              />
              <p className="textImageSearch">Khứ hồi:</p>
            </div>
            {isRoundTrip && (
              <>
                <DatePicker
                  selected={date ? new Date(date) : null}
                  onChange={(date) => setDate(date.toISOString().slice(0, 10))}
                  dateFormat="dd/MM/yyyy"
                  className="custom-Date"
                  placeholderText="Chọn ngày về"
                />
              </>
            )}
          </div>
          <div className="container_ResponseSearch container_search_value">
            <div className="containerSelectInputSearch">
              <div className="titleSelect">
                <img src="/images/user.svg" alt="user" />
                <p className="textImageSearch">Số hành khách</p>
              </div>
              <div className="quantitySelector">
                <div className="selected_user" onClick={toggleDropdown}>
                  {`Người lớn: ${adults} - Trẻ em: ${children} - Em bé: ${rooms}`}
                </div>
                {isOpen && (
                  <div className="dropdown">
                    <div className="option">
                      <span>Người lớn</span>
                      <div className="containerplusadd">
                        <button
                          className="buttonplusadd"
                          onClick={() =>
                            handleDecrement(setTempAdults, tempAdults - 1)
                          }
                        >
                          -
                        </button>
                        <span className="textRoom">{tempAdults}</span>
                        <button
                          className="buttonplusadd"
                          onClick={() => handleIncrement(setTempAdults)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="option">
                      <span>Trẻ em</span>
                      <div className="containerplusadd">
                        <button
                          className="buttonplusadd"
                          onClick={() =>
                            handleDecrement(setTempChildren, tempChildren)
                          }
                        >
                          -
                        </button>
                        <span className="textRoom">{tempChildren}</span>
                        <button
                          className="buttonplusadd"
                          onClick={() => handleIncrement(setTempChildren)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="option">
                      <span>Em bé</span>
                      <div className="containerplusadd">
                        <button
                          className="buttonplusadd"
                          onClick={() =>
                            handleDecrement(setTempRooms, tempRooms - 1)
                          }
                        >
                          -
                        </button>
                        <span className="textRoom">{tempRooms}</span>
                        <button
                          className="buttonplusadd"
                          onClick={() => handleIncrement(setTempRooms)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <div className="">
                      <button className="" onClick={handleDone}>
                        Xong
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div className="containerSearchAll_copy">
              <img
                className="searchImage"
                src="/images/search.svg"
                alt="Search"
                onClick={handleSearch}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="flights-list">
        <h3>Các chuyến bay</h3>
        <div className="flights">
          {flights.map((flight, index) => (
            <div className="flight-card" key={index}>
              <div className="flight-logo">
                <img src="/images/air1.jpg" alt="" />
              </div>
              <div className="flight-info">
                <div className="flight-header">
                  <h4>{flight.title}</h4>
                  <span className="flight-discount">{flight.discount}</span>
                </div>
                <p className="flight-details">
                  <strong>Chuyến bay:</strong> {flight.flight}
                </p>
                <p className="flight-details">
                  <strong>Khởi hành:</strong> {flight.iata_from} &rarr;{" "}
                  {flight.iata_to}
                </p>
                {/* <p className="flight-details">
                  <strong>Giờ bay:</strong> {flight.time}
                </p> */}
                <p className="flight-details">
                  <strong>Thời gian bay:</strong> {flight.departure_time}
                </p>
                <p className="flight-price">
                  <strong>Giá vé:</strong> {flight.price}
                </p>
                <button onClick={() => handleBookticket(flight)}>Đặt vé</button>
              </div>
            </div>
          ))}
        </div>
        {/* Box chi tiết - NẰM NGOÀI .map() */}
        {showCheckout ? (
          <FlightDetailBox
            flight={selectedFlight}
            onClose={() => setSelectedFlight(null)}
            onChoose={handleChooseOption}
          />
        ) : (
          <>
            <FlightCheckoutPage
              selectedFlight={selectedFlight}
              selectedOption={selectedOption}
              onConfirm={() => alert("Thanh toán thành công")}
              onClose={() => setSelectedFlight(null)}
            />
          </>
        )}
      </section>
      <div className="place_explore">
        <div className="title_place_explore">
          <p className="text_title">Khám phá những chỗ bạn có thể thích</p>
        </div>
        <div className="item_place">
          <div className="title_list_item_place">
            <p className="text_title_list_item_place">
              Khách sạn gần những điểm đến nổi bật
            </p>
            <p className="text_des_list_item_place">
              Không cần mất quá nhiều thời gian để di chuyển đến những địa điểm
              này từ khách sạn của bạn
            </p>
            <div className="hotel-list" style={{ flexDirection: "row" }}>
              {hotels.map((name, index) => (
                <div className="hotel-card" key={index}>
                  <img
                    src="/images/hotel/item_explore.jpg"
                    alt="hotel"
                    className="hotel-image"
                  />
                  <div className="hotel-name">{name.name}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
