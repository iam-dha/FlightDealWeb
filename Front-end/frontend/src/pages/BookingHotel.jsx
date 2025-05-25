import styles from "../styles/booking_hotel.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useState } from "react";
export default function BookingHotel() {
  const data_hotel = {
    imgHotel: "/images/hotel/booking.png",
    imgRoomHotel: "/images/hotel/roomHotel.png",
    nameHotel: "The Shells Resort & Spa Phú Quốc",
    typeHotel: "Khu nghỉ dưỡng",
    addressHotel: "64, Trần Hưng Đạo, Phú Quốc, Kiên Giang, Việt Nam",
    checkinHotel: "29/01/2022",
    checkoutHotel: "3/02/2022",
    countNight: "1",
    priceRoomOneDay: "1.500.000 đ",
    discountHotel: "3%",
    discountHotel1: "100.000 đ",
    price_airport_shuttle: "200.000 đ",
    tax: "234.000 đ",
    // Phòng
    typeRoom: "SUPERIOR  ĐƠN",
    nameRoom: "Phòng Premier Ban công hướng Vườn - Góc vườn",
    maximum_person: "4",
    area: "42 m2",
    direction: "Hướng thành phố",
    breakfast: "Free",
    bed: "1 giường King",
    codeDiscount: [
      {
        id: 0,
        name: "Ma5050",
        expiry: "31/01/2023",
        discount: "80.000 đ",
      },
      {
        id: 1,
        name: "MaGiamGia01",
        expiry: "12/02/2019",
        discount: "3%",
        maxDiscount: "30.000 đ",
      },
      {
        id: 2,
        name: "Ma1010",
        expiry: "31/07/2021",
        discount: "100.000 đ",
      },
      {
        id: 3,
        name: "MaGiamGia03",
        expiry: "15/06/2013",
        discount: "5%",
        maxDiscount: "50.000 đ",
      },
      {
        id: 4,
        name: "Ma2022",
        expiry: "31/01/2099",
        discount: "50.000 đ",
      },
      {
        id: 5,
        name: "MaGiamGia05",
        expiry: "15/05/2111",
        discount: "10%",
        maxDiscount: "80.000 đ",
      },
      {
        id: 6,
        name: "Ma3030",
        expiry: "27/08/2022",
        discount: "70.00 đ",
      },
      {
        id: 7,
        name: "MaGiamGia07",
        expiry: "31/01/2022",
        discount: "7%",
        maxDiscount: "150.000 đ",
      },
      {
        id: 8,
        name: "Ma4040",
        expiry: "31/01/2022",
        discount: "20.000 đ",
      },
      {
        id: 9,
        name: "MaGiamGia09",
        expiry: "31/01/2022",
        discount: "15%",
        maxDiscount: "75.000 đ",
      },
    ],
  };
  // =============Tính số đêm ở =============================
  // Hàm chuyển đổi từ định dạng "DD/MM/YYYY" sang "YYYY-MM-DD"
  const convertToDateFormat = (dateString) => {
    const [day, month, year] = dateString.split("/");
    return `${year}-${month}-${day}`;
  };
  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("/").map(Number);
    return new Date(year, month - 1, day);
  };
  const calculateTotalNights = () => {
    const checkinFormatted = convertToDateFormat(data_hotel.checkinHotel);
    const checkoutFormatted = convertToDateFormat(data_hotel.checkoutHotel);
    const checkin = new Date(checkinFormatted);
    const checkout = new Date(checkoutFormatted);

    // Đảm bảo check-in và check-out bắt đầu từ 00:00:00
    checkin.setHours(0, 0, 0, 0);
    checkout.setHours(0, 0, 0, 0);
    if (checkout <= checkin) {
      return 0;
    }

    const timeDifference = checkout - checkin;
    const totalNights = Math.floor(timeDifference / (1000 * 3600 * 24));
    return totalNights;
  };
  const generateNights = () => {
    const totalNights = calculateTotalNights();
    const checkin = parseDate(data_hotel.checkinHotel);
    const nights = [];

    for (let i = 0; i < totalNights; i++) {
      const nightDate = new Date(checkin);
      nightDate.setDate(checkin.getDate() + i);
      nights.push(nightDate);
    }

    return nights;
  };
  // ========================================================
  const [selectedOption, setSelectedOption] = useState(null);
  const [selectedBedOption, setSelectedBedOption] = useState(null);
  const [showItemDiscount, setShowItemDiscount] = useState(false);
  const [isBoxVisible, setIsBoxVisible] = useState(false);
  const [isDiscountSelected, setIsDiscountSelected] = useState(null);
  const handleCheckboxChange = (option) => {
    setSelectedOption(option); // Đặt lựa chọn
  };
  const handleCheckboxBedChange = (option) => {
    setSelectedBedOption(option); // Đặt lựa chọn
  };
  const handleButtonClick = () => {
    setIsBoxVisible(!isBoxVisible);
  };
  const handleClickUse = (id) => {
    setIsDiscountSelected(id);
    setShowItemDiscount(true);
  };
  const handleClickCancle = () => {
    setShowItemDiscount(false);
  };
  // Phân biệt các mã giảm giá
  const [isUseCodeDiscountVisibility, setIsUseCodeDiscountVisibility] =
    useState(
      data_hotel.codeDiscount.map((item) => ({
        id: item.id,
        visible: false,
      }))
    );

  const handleUseCodeDiscount = (id) => {
    setIsUseCodeDiscountVisibility((prevState) =>
      prevState.map((item) =>
        item.id === id
          ? { ...item, visible: !item.visible }
          : { ...item, visible: false }
      )
    );
    setIsBoxVisible(false);
  };
  // Phân loại đ với %
  const sortedCodeDiscount = [...data_hotel.codeDiscount].sort((a, b) => {
    const getNumericValue = (discount) => {
      // Chuyển đổi giá trị giảm giá thành số
      if (discount.includes("đ")) {
        return parseFloat(discount.replace("đ", "").replace(".", "").trim());
      } else if (discount.includes("%")) {
        return parseFloat(discount.replace("%", "").trim());
      }
      return 0;
    };

    // Sắp xếp giảm dần
    return getNumericValue(b.discount) - getNumericValue(a.discount);
  });
  // ========Mở dropbox xem chi tiết giá gốc ======
  const [isDropboxOriginalPrice, setIsDropboxOriginalPrice] = useState(false);
  const handleClickDropboxOriginal = () => {
    setIsDropboxOriginalPrice(!isDropboxOriginalPrice);
  };
  // ========Check xem có dùng đưa đón tại sân bay không ================

  const [isCheckedAirportShuttle, setIsCheckedAirportShuttle] = useState(false);
  const handleCheckAirportShuttleChange = (event) => {
    setIsCheckedAirportShuttle(event.target.checked);
  };
  // ========== Tính giá tiền ============
  // Chuyển 100.000đ -> 100000
  const parsePrice = (priceString) => {
    const numericString = priceString.replace(/[^\d]/g, "");
    return parseInt(numericString, 10);
  };
  // chuyển 100000 -> 100.000đ
  const formatPrice = (price) => {
    return price.toLocaleString("vi-VN") + " đ";
  };
  const nights = calculateTotalNights();
  const originalPrice = nights * parsePrice(data_hotel.priceRoomOneDay);
  const originalDiscountPrice =
    (originalPrice * (100 - parsePrice(data_hotel.discountHotel))) / 100;
  const originalDiscountPrice1 =
    originalPrice - parsePrice(data_hotel.discountHotel1);

  const discountPrice =
    isDiscountSelected !== null && sortedCodeDiscount[isDiscountSelected]
      ? (() => {
          const discountItem = sortedCodeDiscount[isDiscountSelected];
          const maxDiscount = discountItem.maxDiscount
            ? parsePrice(discountItem.maxDiscount)
            : null;

          if (discountItem.discount.includes("%")) {
            // Nếu là dạng phần trăm
            const percentageDiscount =
              originalPrice * (parseFloat(discountItem.discount) / 100);
            return maxDiscount && percentageDiscount > maxDiscount
              ? maxDiscount
              : percentageDiscount;
          } else {
            // Nếu là dạng số tiền (đ)
            return parsePrice(discountItem.discount);
          }
        })()
      : 0;

  // console.log(discountPrice);
  const taxPrice = parsePrice(data_hotel.tax);
  const airportShuttlePrice = parsePrice(data_hotel.price_airport_shuttle);

  const finalPrice = originalDiscountPrice + taxPrice;
  const finalPriceHaveDiscount =
    originalDiscountPrice - discountPrice + taxPrice;
  const finalPriceHaveAirportShuttle =
    originalDiscountPrice + taxPrice + airportShuttlePrice;
  const finalPriceHaveDiscountandAirportShuttle =
    originalDiscountPrice - discountPrice + taxPrice + airportShuttlePrice;
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.containerBookingHotel}>
          {/* Titel  Đặt phòng*/}
          <p className={styles.textTitleBooking}>Đặt phòng</p>
          {/* Hotel 1166 */}
          <div className={styles.containerHotel1166}>
            {/* Ảnh hotel */}
            <div className={styles.containerImgHotel}>
              <img
                src={data_hotel.imgHotel}
                alt="Img"
                className={styles.imgHotel}
              />
            </div>
            {/* Thông tin khách sạn */}
            <div className={styles.containerInforHotel}>
              {/* Tên hotel */}
              <div className={styles.containerDetailsHotels}>
                <p className={styles.textNameHotel}>{data_hotel.nameHotel}</p>

                {/* Số sao, loại hotel */}
                <div className={styles.containerTypeHotel}>
                  {/* Số sao */}
                  <div className={styles.containerStarHotel}>
                    <img
                      src="/images/hotel/star.svg"
                      alt="star"
                      className={styles.icon}
                    />
                    <img
                      src="/images/hotel/star.svg"
                      alt="star"
                      className={styles.icon}
                    />
                    <img
                      src="/images/hotel/star.svg"
                      alt="star"
                      className={styles.icon}
                    />
                  </div>
                  {/* loại hotel */}
                  <div className={styles.TypeHotel}>
                    <p className={styles.textTypeHotel}>
                      {data_hotel.typeHotel}
                    </p>
                  </div>
                </div>
                {/* Địa chỉ */}
                <div className={styles.containerAddressHotel}>
                  <img
                    src="/images/hotel/directions.svg"
                    alt="star"
                    className={styles.icon}
                  />
                  <p className={styles.textNormal}>{data_hotel.addressHotel}</p>
                </div>
              </div>
              {/* Nhận, trả phòng */}
              <div className={styles.containerCheckHotel}>
                <div className={styles.checkHotel}>
                  <p className={styles.textCheck}>Nhận phòng:</p>
                  <p className={styles.textNormal}>{data_hotel.checkinHotel}</p>
                </div>
                <div className={styles.checkHotel}>
                  <p className={styles.textCheck}>Trả phòng:</p>
                  <p className={styles.textNormal}>
                    {data_hotel.checkoutHotel}
                  </p>
                </div>
                <div className={styles.checkHotel}>
                  <p className={styles.textCheck}>Số đêm:</p>
                  <p className={styles.textNormal}>{data_hotel.countNight}</p>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.containerBooking}>
            {/* Hotel, thông tin liên hệ, yêu cầu đặc biệt, mã giảm giá, xác nhận đặt phòng */}
            <div className={styles.containerHotelInforCustomer}>
              {/* Hotel */}
              <div className={styles.containerHotel}>
                {/* Ảnh hotel */}
                <div className={styles.containerImgHotel}>
                  <img
                    src={data_hotel.imgHotel}
                    alt="Img"
                    className={styles.imgHotel}
                  />
                </div>
                {/* Thông tin khách sạn */}
                <div className={styles.containerInforHotel}>
                  {/* Tên hotel */}
                  <div className={styles.containerDetailsHotels}>
                    <p className={styles.textNameHotel}>
                      {data_hotel.nameHotel}
                    </p>
                    {/* Số sao, loại hotel */}
                    <div className={styles.containerTypeHotel}>
                      {/* Số sao */}
                      <div className={styles.containerStarHotel}>
                        <img
                          src="/images/hotel/star.svg"
                          alt="star"
                          className={styles.icon}
                        />
                        <img
                          src="/images/hotel/star.svg"
                          alt="star"
                          className={styles.icon}
                        />
                        <img
                          src="/images/hotel/star.svg"
                          alt="star"
                          className={styles.icon}
                        />
                      </div>
                      {/* loại hotel */}
                      <div className={styles.TypeHotel}>
                        <p className={styles.textTypeHotel}>
                          {data_hotel.typeHotel}
                        </p>
                      </div>
                    </div>
                    {/* Địa chỉ */}
                    <div className={styles.containerAddressHotel}>
                      <img
                        src="/images/hotel/directions.svg"
                        alt="star"
                        className={styles.icon}
                      />
                      <p className={styles.textNormal}>
                        {data_hotel.addressHotel}
                      </p>
                    </div>
                  </div>
                  {/* Nhận, trả phòng */}
                  <div className={styles.containerCheckHotel}>
                    <div className={styles.checkHotel}>
                      <p className={styles.textCheck}>Nhận phòng:</p>
                      <p className={styles.textNormal}>
                        {data_hotel.checkinHotel}
                      </p>
                    </div>
                    <div className={styles.checkHotel}>
                      <p className={styles.textCheck}>Trả phòng:</p>
                      <p className={styles.textNormal}>
                        {data_hotel.checkoutHotel}
                      </p>
                    </div>
                    <div className={styles.checkHotel}>
                      <p className={styles.textCheck}>Số đêm:</p>
                      <p className={styles.textNormal}>
                        {data_hotel.countNight}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Thông tin liên hệ */}
              <div className={styles.containerInformationCustomer}>
                {/* Tilte */}
                <p className={styles.textNameHotel}>Thông tin liên hệ</p>
                {/* Thông báo đăng nhập */}
                <div className={styles.containerNotificationSignIn}>
                  <div className={styles.btnSignIn}>
                    <p className={styles.textSignIn}>Đăng nhập</p>
                  </div>
                  <p className={styles.textNormal}>
                    để đặt phòng nhanh hơn, không cần nhập thông tin
                  </p>
                </div>
                {/* Input họ và tên */}
                <div className={styles.containerInputName}>
                  <input
                    placeholder="Nhập họ và tên *"
                    className={styles.containerInput}
                  />
                </div>
                {/* Input số điện thoại và gmail */}
                <div className={styles.containerInputNumberPhoneGmail}>
                  {/* Input số điện thoại */}
                  <div className={styles.containerInputNumberPhone}>
                    <input
                      placeholder="Số điện thoại *"
                      className={styles.containerInput}
                    />
                  </div>
                  {/* Input gmail */}
                  <div className={styles.containerInputEmail}>
                    <input
                      placeholder="Email *"
                      className={styles.containerInput}
                    />
                  </div>
                </div>
                {/* Check box đặt hộ hay là ở */}
                <div className={styles.containerCheckBooking}>
                  <div className={styles.containerCheck}>
                    <input
                      type="checkbox"
                      className={styles.customCheckbox}
                      checked={selectedOption === "option1"}
                      onChange={() => handleCheckboxChange("option1")}
                    />
                    <p className={styles.textNormal}>Tôi là khách lưu trú</p>
                  </div>
                  <div className={styles.containerCheck}>
                    <input
                      type="checkbox"
                      className={styles.customCheckbox}
                      checked={selectedOption === "option2"}
                      onChange={() => handleCheckboxChange("option2")}
                    />
                    <p className={styles.textNormal}>Tôi đặt cho người khác</p>
                  </div>
                </div>
              </div>
              {/* Yêu cầu đặc biệt */}
              <div className={styles.containerRequireSpecial}>
                {/* title */}
                <div className={styles.TitleRequireSpecial}>
                  <p className={styles.textNameHotel}>
                    Yêu cầu đặc biệt{" "}
                    <span className={styles.textOptional}>
                      (Không bắt buộc)
                    </span>
                  </p>
                </div>
                {/* Loại giường */}
                <div className={styles.containerTypeBed}>
                  <p className={styles.textSemibold}>Chọn loại giường</p>
                  {/* Check box giường King hay Queen*/}
                  <div className={styles.containerCheckBooking}>
                    <div className={styles.containerCheck}>
                      <input
                        type="checkbox"
                        className={styles.customCheckbox}
                        checked={selectedBedOption === "option1"}
                        onChange={() => handleCheckboxBedChange("option1")}
                      />
                      <p className={styles.textNormal}>1 giường King</p>
                    </div>
                    <div className={styles.containerCheck}>
                      <input
                        type="checkbox"
                        className={styles.customCheckbox}
                        checked={selectedBedOption === "option2"}
                        onChange={() => handleCheckboxBedChange("option2")}
                      />
                      <p className={styles.textNormal}>1 giường Queen</p>
                    </div>
                  </div>
                </div>
                {/* Yêu cầu đặc biệt */}
                <div className={styles.RequireSpecial}>
                  <p className={styles.textSemibold}>Yêu cầu đặc biệt</p>
                  <div className={styles.containerCheckRequire}>
                    <input
                      type="checkbox"
                      className={styles.customCheckbox_require}
                    />
                    <p className={styles.textNormal}>Không hút thuốc</p>
                  </div>
                  <div className={styles.containerCheckRequire}>
                    <input
                      type="checkbox"
                      className={styles.customCheckbox_require}
                    />
                    <p className={styles.textNormal}>Phòng ở tầng cao</p>
                  </div>
                  {/* Đưa đón tại sân bay */}
                  <div className={styles.containerCheckRequire}>
                    <input
                      type="checkbox"
                      className={styles.customCheckbox_require}
                      checked={isCheckedAirportShuttle}
                      onChange={handleCheckAirportShuttleChange}
                    />
                    <p className={styles.textNormal}>
                      Đưa đón tại sân bay (phí{" "}
                      {data_hotel.price_airport_shuttle} )
                    </p>
                  </div>
                </div>
                {/* Yêu cầu của riêng bạn */}
                <div className={styles.containerYourRequire}>
                  <p className={styles.textSemibold}>Yêu cầu của riêng bạn</p>
                  <textarea
                    className={styles.inputYourRequire}
                    placeholder="Nhập yêu cầu khác"
                  />
                </div>
              </div>
              {/* Mã giảm giá */}
              <div className={styles.containerCodeDiscount}>
                <div className={styles.containerTitleDiscount}>
                  <img
                    src="/images/hotel/iconDiscount.svg"
                    className={styles.imgDiscount}
                  />
                  <p className={styles.textNameHotel}>Mã giảm giá</p>
                </div>
                <div className={styles.containerListCodeDiscount}>
                  {/* item code discount */}
                  {showItemDiscount ? (
                    <div className={styles.containerItemCodeDiscount}>
                      <img
                        src="/images/hotel/circle-check.svg"
                        className={styles.icon}
                      />
                      <p className={styles.textSuccess}>
                        {sortedCodeDiscount[isDiscountSelected].name}
                      </p>
                    </div>
                  ) : (
                    <p className={styles.textMedium}>Chọn một mã giảm giá</p>
                  )}
                  {/* Button + */}
                  <div
                    className={styles.containerButtonPlus}
                    onClick={handleButtonClick}
                  >
                    <img
                      src="/images/hotel/circle-plus.svg"
                      className={styles.icon}
                    />
                  </div>
                </div>
                {isBoxVisible && (
                  <div className={styles.popupBox}>
                    <div className={styles.popupContent}>
                      <div className={styles.containerNameHotelCancel}>
                        <p className={styles.textNameHotel}>Mã giảm giá</p>
                        <div
                          className={styles.containerX}
                          onClick={handleButtonClick}
                        >
                          <img
                            src="/images/hotel/x.svg"
                            className={styles.icon}
                          />
                        </div>
                      </div>

                      <p className={styles.textNormal}>
                        Chọn 1 mã giảm giá dưới đây(Chọn 1 mã)
                      </p>
                      {/* List mã giảm giá */}
                      <div className={styles.containerListDiscount}>
                        {/* Mã giảm giá danh sách */}
                        {sortedCodeDiscount.map((discount, id) => (
                          <div
                            key={id}
                            className={styles.containerItemDiscount}
                          >
                            {/* Chọn và mã giảm giá */}
                            <div className={styles.containerSelectNameDiscount}>
                              {isUseCodeDiscountVisibility[id].visible ? (
                                <img
                                  src="/images/hotel/circle-check.svg"
                                  className={styles.icon}
                                  alt="Checked"
                                />
                              ) : (
                                <img
                                  src="/images/hotel/circle-nocheck.svg"
                                  className={styles.icon}
                                  alt="Unchecked"
                                />
                              )}

                              <p className={styles.textSuccess}>
                                {discount.name}
                              </p>
                            </div>
                            <div className={styles.containerDiscountDetail}>
                              <p className={styles.textMedium}>
                                {discount.discount} cho đơn hàng của bạn
                                {discount.discount.includes("%") &&
                                discount.maxDiscount
                                  ? ` (tối đa ${discount.maxDiscount})`
                                  : ""}{" "}
                              </p>
                            </div>
                            {/* Hạn sử dụng, nút sử dụng hoặc hủy */}
                            <div className={styles.containerExpiryUseCancle}>
                              <p className={styles.textMedium}>
                                Hạn sử dụng: {discount.expiry}
                              </p>
                              <div
                                className={styles.containerUseCancle}
                                onClick={() => handleUseCodeDiscount(id)}
                              >
                                {isUseCodeDiscountVisibility[id].visible ? (
                                  <div onClick={() => handleClickCancle()}>
                                    <p className={styles.textCancle}>Hủy</p>
                                  </div>
                                ) : (
                                  <div onClick={() => handleClickUse(id)}>
                                    <p className={styles.textUse}>Sử dụng</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
              {/* Giá */}
              <div className={styles.containerPriceHotel1166}>
                {/* giá gốc */}
                <div
                  className={styles.containerOriginalPrice}
                  onClick={handleClickDropboxOriginal}
                >
                  <div className={styles.containerTextOriginalPrice}>
                    <p className={styles.textMedium}>
                      Giá cho 1 phòng {calculateTotalNights()} đêm
                    </p>
                    <img
                      src={
                        isDropboxOriginalPrice
                          ? "/images/hotel/chevron-up_final.svg"
                          : "/images/hotel/chevron-down_final.svg"
                      }
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.containerOriginalPriceDetail}>
                    <div className={styles.containerDiscount}>
                      <p className={styles.textPriceOriginal}>
                        {" "}
                        {formatPrice(originalPrice)}
                      </p>
                      <p className={styles.textSuccess}>
                        -{data_hotel.discountHotel}
                      </p>
                    </div>

                    <p className={styles.textPriceDiscountOriginal}>
                      {formatPrice(originalDiscountPrice)}
                    </p>
                  </div>
                </div>
                {isDropboxOriginalPrice && (
                  <div className={styles.containerDropbox}>
                    {generateNights().map((night, index) => (
                      <div key={index} className={styles.containerItemOneNight}>
                        <p className={styles.textMedium}>
                          Đêm {index + 1} ({night.getDate()}/
                          {night.getMonth() + 1}) x 1 phòng
                        </p>
                        <p className={styles.textMedium}>
                          {data_hotel.priceRoomOneDay}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {showItemDiscount && (
                  <div className={styles.containerOriginalPrice}>
                    <p className={styles.textMedium}>
                      Mã giảm giá{" "}
                      <span className={styles.textSuccess}>
                        ({sortedCodeDiscount[isDiscountSelected].name})
                      </span>
                    </p>
                    <p className={styles.textSuccess}>
                      -{sortedCodeDiscount[isDiscountSelected].discount} (
                      {formatPrice(discountPrice)})
                    </p>
                  </div>
                )}
                <div className={styles.containerOriginalPrice}>
                  <p className={styles.textMedium}>Thuế và phí dịch vụ:</p>
                  <p className={styles.textMedium}>{data_hotel.tax}</p>
                </div>
                {isCheckedAirportShuttle && (
                  <div className={styles.containerOriginalPrice}>
                    <p className={styles.textMedium}>
                      Đưa đón khách tại sân bay:
                    </p>
                    <p className={styles.textMedium}>
                      {data_hotel.price_airport_shuttle}
                    </p>
                  </div>
                )}
                <div className={styles.containerOriginalPrice}>
                  <div className={styles.containerTextPayable}>
                    <p className={styles.textMedium}>Phải trả: </p>
                    <p className={styles.textTax}>
                      Bao gồm thuế và phí dịch vụ
                    </p>
                  </div>
                  <div className={styles.containerFinalPrice}>
                    <p className={styles.textMediumPrice}>
                      {showItemDiscount && isCheckedAirportShuttle
                        ? formatPrice(finalPriceHaveDiscountandAirportShuttle)
                        : showItemDiscount
                        ? formatPrice(finalPriceHaveDiscount)
                        : isCheckedAirportShuttle
                        ? formatPrice(finalPriceHaveAirportShuttle)
                        : formatPrice(finalPrice)}
                    </p>
                    <p className={styles.textTax}>Giá cho 2 người lớn</p>
                  </div>
                </div>
              </div>
              {/* btn Xác nhận đặt phòng */}
              <div className={styles.containerCheckedBooking}>
                <p className={styles.textCheckedBooking}>
                  TravelFly sẽ liên hệ lại với quý khách trong vòng 1 giờ để xác
                  nhận phòng trống và thanh toán.
                </p>
                <div className={styles.containerChecked}>
                  <div className={styles.btnChecked}>
                    <p className={styles.textChecked}>Xác nhận đặt phòng</p>
                  </div>
                </div>
              </div>
            </div>
            {/* Phòng, giá */}
            <div className={styles.containerRoomPrice}>
              {/* Phòng */}
              <div className={styles.containerRoomHotel}>
                {/* Img kiểu phòng */}
                <div className={styles.containerImgTypeHotel}>
                  <div className={styles.containerImgRoomHotel}>
                    <img
                      src={data_hotel.imgRoomHotel}
                      className={styles.imgRoom}
                    />
                  </div>
                  <div className={styles.containerTypeRoomHotel}>
                    <p>{data_hotel.typeRoom}</p>
                  </div>
                </div>
                {/* Detail phòng */}
                <div className={styles.containerDetailRoomHotel}>
                  <p className={styles.textNameRoom}>{data_hotel.nameRoom}</p>
                  <div className={styles.containerDetailRoom}>
                    {/* item phòng 1 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>Sức chứa tối đa:</p>
                      <p className={styles.textSemibold}>
                        {data_hotel.maximum_person} người
                      </p>
                      <div className={styles.containerIconInfor}>
                        <img
                          src="/images/hotel/info-circle.svg"
                          className={styles.icon}
                        />
                      </div>
                    </div>
                    {/* item phòng 2 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>Diện tích:</p>
                      <p className={styles.textSemibold}>{data_hotel.area}</p>
                    </div>
                    {/* item phòng 3 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>Hướng:</p>
                      <p className={styles.textSemibold}>
                        {data_hotel.direction}
                      </p>
                    </div>
                    {/* item phòng 4 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>Hoàn hủy một phần</p>
                      <div className={styles.containerIconInfor}>
                        <img
                          src="/images/hotel/info-circle.svg"
                          className={styles.icon}
                        />
                      </div>
                    </div>
                    {/* item phòng 5 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>Bữa sáng miễn phí</p>
                      <div className={styles.containerBreakfast}>
                        <p className={styles.textBreakfast}>
                          {data_hotel.breakfast}
                        </p>
                      </div>
                    </div>
                    {/* item phòng 6 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>Giường:</p>
                      <p className={styles.textSemibold}>{data_hotel.bed}</p>
                    </div>
                    {/* item phòng 7 */}
                    <div className={styles.containerItemDetail}>
                      <p className={styles.textInfor}>
                        Chính sách hành khách và trẻ em
                      </p>
                      <div className={styles.containerIconInfor}>
                        <img
                          src="/images/hotel/info-circle.svg"
                          className={styles.icon}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Giá */}
              <div className={styles.containerPriceHotel}>
                {/* giá gốc */}
                <div
                  className={styles.containerOriginalPrice}
                  onClick={handleClickDropboxOriginal}
                >
                  <div className={styles.containerTextOriginalPrice}>
                    <p className={styles.textMedium}>
                      Giá cho 1 phòng {calculateTotalNights()} đêm
                    </p>
                    <img
                      src={
                        isDropboxOriginalPrice
                          ? "/images/hotel/chevron-up_final.svg"
                          : "/images/hotel/chevron-down_final.svg"
                      }
                      className={styles.icon}
                    />
                  </div>
                  <div className={styles.containerOriginalPriceDetail}>
                    <div className={styles.containerDiscount}>
                      <p className={styles.textPriceOriginal}>
                        {" "}
                        {formatPrice(originalPrice)}
                      </p>
                      <p className={styles.textSuccess}>
                        -{data_hotel.discountHotel}
                      </p>
                    </div>

                    <p className={styles.textPriceDiscountOriginal}>
                      {formatPrice(originalDiscountPrice)}
                    </p>
                  </div>
                </div>
                {isDropboxOriginalPrice && (
                  <div className={styles.containerDropbox}>
                    {generateNights().map((night, index) => (
                      <div key={index} className={styles.containerItemOneNight}>
                        <p className={styles.textMedium}>
                          Đêm {index + 1} ({night.getDate()}/
                          {night.getMonth() + 1}) x 1 phòng
                        </p>
                        <p className={styles.textMedium}>
                          {data_hotel.priceRoomOneDay}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                {showItemDiscount && (
                  <div className={styles.containerOriginalPrice}>
                    <p className={styles.textMedium}>
                      Mã giảm giá{" "}
                      <span className={styles.textSuccess}>
                        ({sortedCodeDiscount[isDiscountSelected].name})
                      </span>
                    </p>
                    <p className={styles.textSuccess}>
                      - {sortedCodeDiscount[isDiscountSelected].discount}
                      {sortedCodeDiscount[isDiscountSelected].discount.includes(
                        "%"
                      ) && ` (${formatPrice(discountPrice)})`}
                    </p>
                  </div>
                )}
                <div className={styles.containerOriginalPrice}>
                  <p className={styles.textMedium}>Thuế và phí dịch vụ:</p>
                  <p className={styles.textMedium}>{data_hotel.tax}</p>
                </div>
                {isCheckedAirportShuttle && (
                  <div className={styles.containerOriginalPrice}>
                    <p className={styles.textMedium}>
                      Đưa đón khách tại sân bay:
                    </p>
                    <p className={styles.textMedium}>
                      {data_hotel.price_airport_shuttle}
                    </p>
                  </div>
                )}
                <div className={styles.containerOriginalPrice}>
                  <div className={styles.containerTextPayable}>
                    <p className={styles.textMedium}>Phải trả: </p>
                    <p className={styles.textTax}>
                      Bao gồm thuế và phí dịch vụ
                    </p>
                  </div>
                  <div className={styles.containerFinalPrice}>
                    <p className={styles.textMediumPrice}>
                      {showItemDiscount && isCheckedAirportShuttle
                        ? formatPrice(finalPriceHaveDiscountandAirportShuttle)
                        : showItemDiscount
                        ? formatPrice(finalPriceHaveDiscount)
                        : isCheckedAirportShuttle
                        ? formatPrice(finalPriceHaveAirportShuttle)
                        : formatPrice(finalPrice)}
                    </p>
                    <p className={styles.textTax}>Giá cho 2 người lớn</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* btn chat với chúng tôi */}
        <div className={styles.containerChatWith365}>
          <div className={styles.btnChatWith365}>
            <img
              src="/images/hotel/chat.svg"
              alt="img"
              className={styles.icon}
            />
            <p className={styles.textChat}>Chat với chúng tôi</p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
