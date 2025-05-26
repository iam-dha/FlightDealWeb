import React, { useState } from "react";
import "../styles/AirportTransfer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faClock,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ResultSearchVehicle from "../components/ResultSearchVehicle";
import { carRoute } from "../services/api";
const AirportTransfer = () => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [resultSearch, setResultSearch] = useState(false);
  const [formData, setFormData] = useState();
  const data = {
    iata: from,
  };
  const handleSearch = async () => {
    const result = await carRoute(data);
    setFormData(result.data.data);
    setResultSearch(true);
  };
  // console.log(formData);
  return (
    <>
      <Header />
      <div className="airport-transfer-wrapper">
        <div className="search-card shadow-lg">
          {/* Điểm đi */}
          <div className="form-grid-transfer">
            <div className="form-grid-item_transfer">
              <p className="text-item-search-transfer">Từ sân bay</p>
              <div className="input-with-icon">
                <span className="icon">✈️</span>
                <input
                  type="text"
                  placeholder="Sân bay quốc tế Nội Bài"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                />
              </div>
            </div>
            {/* Điểm đến */}
            <div className="form-grid-item_transfer">
              <p className="text-item-search-transfer">
                Đến khu vực, địa chỉ, toà nhà
              </p>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faLocationDot} className="icon" />
                <input
                  type="text"
                  placeholder="Hồ Đại Lải"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                />
              </div>
            </div>
            {/* Ngày đón  */}
            <div className="form-grid-item_transfer">
              <p className="text-item-search-transfer">Ngày đón</p>
              <div className="input-with-icon">
                <span className="icon">📅</span>
                <DatePicker
                  selected={date ? new Date(date) : null}
                  onChange={(date) => setDate(date.toISOString().slice(0, 10))}
                  dateFormat="dd/MM/yyyy"
                  className="custom-date-input"
                  placeholderText="Chọn ngày đi"
                />
              </div>
            </div>
            {/* Giờ đón */}
            <div className="form-grid-item_transfer">
              <p className="text-item-search-transfer">Giờ đón</p>
              <div className="input-with-icon">
                <FontAwesomeIcon icon={faClock} className="icon" />
                <input
                  type="time"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />
              </div>
            </div>
          </div>
          <button className="btn-primary" onClick={handleSearch}>
            <FontAwesomeIcon
              icon={faMagnifyingGlass}
              style={{ marginRight: "8px" }}
            />
            Tìm chuyến xe
          </button>
        </div>
        {!resultSearch ? (
          <>
            <div className="des-select-vehicle">
              <p className="text_why_vehicle">
                Tại sao tôi nên đặt xe đưa đón sân bay qua TravelFly?
              </p>
              <div className="des_list_item_vehicle">
                <div className="des_item_vehicle">
                  <img
                    src="/images/airportTransfer/1602575545560-6dae87c0db3aee2120066d7e66628677.webp"
                    className="img_des_vehicle"
                  />
                  <div className="container_text_vehicle">
                    <p className="text_bold_des_vehicle">Phù hợp với nhu cầu</p>
                    <p className="viewer_content_vehicle">
                      Với nhiều lựa chọn từ xe riêng đến xe buýt sân bay, bạn có
                      thể dễ dàng tìm lựa chọn phương tiện đến sân bay phù hợp
                      nhất.
                    </p>
                  </div>
                </div>
                <div className="des_item_vehicle">
                  <img
                    src="/images/airportTransfer/1602575548755-6be702e660aba5dadc0db5079b7cac20.webp"
                    className="img_des_vehicle"
                  />
                  <div className="container_text_vehicle">
                    <p className="text_bold_des_vehicle">Không cần lo lắng</p>
                    <p className="viewer_content_vehicle">
                      Đặt trước để không phải xếp hàng tại sân bay. Giá cuối
                      cùng đã bao gồm phí cầu đường và đậu xe, bạn không cần
                      phải lo lắng phải trả thêm phí.
                    </p>
                  </div>
                </div>
                <div className="des_item_vehicle">
                  <img
                    src="/images/airportTransfer/1602575551840-c0690511d837b645c85558300fe07dbe.webp"
                    className="img_des_vehicle"
                  />
                  <div className="container_text_vehicle">
                    <p className="text_bold_des_vehicle">Đối tác tốt nhất</p>
                    <p className="viewer_content_vehicle">
                      Sự thoải mái của bạn là ưu tiên của chúng tôi. Vì thế,
                      chúng tôi luôn chọn làm việc cùng những đối tác có nhiều
                      kinh nghiệm tốt nhất trên thị trường.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ResultSearchVehicle />
        )}
      </div>
      <Footer />
    </>
  );
};

export default AirportTransfer;
