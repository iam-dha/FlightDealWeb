import styles from "../styles/details_hotel.module.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { dataTypeHotel } from "../utils/data";
import ListNumberHotelOther from "../components/list_number_hotel_other";
import { useState, useEffect } from "react";
export default function DetailsHotel({ data }) {
  const hotelType = dataTypeHotel.find(
    (type) => type.id === data?.hotel?.hotelType
  );
  const frontImages = data?.hotel?.exteriorImages?.split(",");
  const breadcrumbItems = [
    {
      href: "/",
      text: "Trang chủ",
    },
    {
      href: "/hotel/",
      text: "Khách sạn",
    },
    {
      href: "/hotel/search-result/",
      text: "Hà Nội",
    },
    {
      href: "/hotel/search-result/details-hotel",
      text: `${data?.hotel?.hotelName}`,
    },
  ];
  const information_hotel = {
    number_floor: "2",
    number_restaurant: "0",
    distance_airport: "10",
    number_room: "3",
    number_bar: "0",
    year_renovation: "2020",
    year_of_construction: "2018",
    distance_to_city: "2.5",
    number_restaurant_other: "20",
    number_location_tour: "32",
    scope: "10",
    utility: [
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
      { name: "Cửa hàng thể thao", img: "/images/hotel/shopping-cart.svg" },
      { name: "Free wifi", img: "/images/hotel/wifi.svg" },
      { name: "Internet có dây", img: "/images/hotel/access-point.svg" },
    ],
  };
  const [isDetailVisible, setIsDetailVisible] = useState(false);
  const maxItemsHotelUtilityToShow = 11;
  const visibleItems = information_hotel.utility.slice(
    0,
    maxItemsHotelUtilityToShow
  );
  const remainingItemsCount =
    information_hotel.utility.length - visibleItems.length;

  const toggleDetailVisibility = () => {
    setIsDetailVisible(!isDetailVisible);
  };

  const [sortedRooms, setSortedRooms] = useState([]);

  // Giả sử đây là dữ liệu thô của các phòng (bạn có thể thay thế bằng dữ liệu thực)
  const rawRooms = [
    {
      room: {
        id: 1,
        roomName: "Phòng Deluxe",
        roomCount: 3,
        maxAdults: 2,
        area: 25,
        roomView: 1,
        roomType: 101,
        roomImages: {
          bedroom: "room1.jpg,room2.jpg",
        },
        bathroomAmenities: [0, 1],
        bedroomAmenities: [2, 3],
        diningAmenities: [],
        minibarAmenities: [],
        otherAmenities: [],
      },
    },
    {
      room: {
        id: 2,
        roomName: "Phòng Standard",
        roomCount: 1,
        maxAdults: 1,
        area: 18,
        roomView: 0,
        roomType: 102,
        roomImages: {
          bedroom: "room3.jpg",
        },
        bathroomAmenities: [0],
        bedroomAmenities: [3],
        diningAmenities: [],
        minibarAmenities: [],
        otherAmenities: [],
      },
    },
    // ... thêm phòng khác nếu cần
  ];

  useEffect(() => {
    const sorted = [...rawRooms].sort((a, b) =>
      a.room.roomName.localeCompare(b.room.roomName)
    );
    setSortedRooms(sorted);
  }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        {/* Nội dung */}
        {/* Breadcumb */}
        <div className={styles.containerSearchResult}>
          <div className={styles.container_DetailsHotel}>
            {/* Giới thiệu hotel */}
            <div className={styles.container_review_img_hotel}>
              {/* Giới thiệu */}
              <div className={styles.container_title_review_introduce_hotel}>
                {/* Title and review */}
                <div className={styles.container_title_review_hotel}>
                  <p className={styles.text_title_hotel}>
                    {data?.hotel?.hotelName ||
                      "The Shells Resort & Spa Phú Quốc"}
                  </p>
                  <div className={styles.content_details_hotel}>
                    <div className={styles.review_hotel}>
                      <div className={styles.star}>
                        {Array.from(
                          { length: data?.hotel?.starRating || 3 },
                          (_, index) => (
                            <img
                              key={index}
                              src="/images/hotel/star.svg"
                              alt="star"
                              className={styles.icon_star}
                            />
                          )
                        )}
                      </div>
                      <div className={styles.typeHotel}>
                        <p className={styles.textTypeHotel}>Khu nghỉ dưỡng</p>
                      </div>
                    </div>
                    <div className={styles.detail_hotel}>
                      <div className={styles.totalReview}>
                        <img src="/images/hotel/writing_search.svg" alt="img" />
                        <p className={styles.text_point_review}>9.2</p>
                        <img
                          src="/images/hotel/star_red.svg"
                          alt="img"
                          className={styles.star_red}
                        />
                        <p className={styles.textReview}>Tuyệt vời</p>
                        <p className={styles.textTotalReview}>(156 đánh giá)</p>
                      </div>
                      <div className={styles.container_item_address}>
                        <img
                          src="/images/hotel/directions.svg"
                          alt="img"
                          className={styles.imgIcon}
                        />
                        <p>64, Trần Hưng Đạo, Phú Quốc, Kiên Giang</p>
                      </div>
                    </div>
                  </div>
                </div>
                {/* introduc_hotel */}
                <div className={styles.container_introduce_hotel}>
                  <div className={styles.container_title_introduce_hotel}>
                    <p className={styles.textTitleIntroduce}>Giới thiệu</p>
                  </div>
                  <p className={styles.text_introduce_hotel}>
                    Đỗ xe và Wi-Fi luôn miễn phí, vì vậy quý khách có thể giữ
                    liên lạc, đến và đi tùy ý. Nằm ở vị trí trung tâm tại Hải
                    Châu của Đà Nẵng, chỗ nghỉ này đặt quý khách ở gần các điểm
                    thu hút và tùy chọn ăn uống thú vị. Đừng rời đi trước khi
                    ghé thăm The Marble Mountains nổi tiếng. Được xếp hạng 5
                    sao, chỗ nghỉ chất lượng cao này cho phép khách nghỉ sử dụng
                    mát-xa, xông khô và bồn tắm nước nóng ngay trong khuôn viên.
                  </p>
                </div>
              </div>
              {/* Ảnh */}
              <div className={styles.container_img_hotel}>
                {/* contact - hotel */}
                <div className={styles.container_bar_contact}>
                  {/* chat */}
                  <div className={styles.item_contact}>
                    <p className={styles.text_item_contact}>Chat ngay</p>

                    <img
                      src="/images/hotel/brand-messenger.svg"
                      alt="chat"
                      className={styles.icon}
                    />
                  </div>
                  {/* Chia sẻ */}
                  <div className={styles.item_contact}>
                    <p className={styles.text_item_contact}>Chia sẻ</p>
                    <img
                      src="/images/hotel/share.svg"
                      alt="chat"
                      className={styles.icon}
                    />
                  </div>
                  {/* Yêu thích */}
                  <div className={styles.item_contact}>
                    <p className={styles.text_item_contact}>Yêu thích</p>
                    <img
                      src="/images/hotel/love.svg"
                      alt="chat"
                      className={styles.icon}
                    />
                  </div>
                </div>
                {/* ảnh hotel */}
                <div className={styles.container_contact_img_hotel}>
                  <div className={styles.container_img_hotel_left}>
                    <img
                      className={styles.img1}
                      src={`/images/hotel/roomHotel.png`}
                      alt="hungha"
                    />

                    <img
                      className={styles.img2}
                      src={`/images/hotel/roomHotel.png`}
                      alt="hungha"
                    />
                  </div>
                  <div className={styles.container_img_hotel_right}>
                    <img
                      className={styles.img3}
                      src={`/images/hotel/roomHotel.png`}
                      alt="hungha"
                    />
                  </div>
                </div>
                {/* btn xem thêm ảnh */}
                <div className={styles.container_btn_XemThemimg}>
                  <p
                    className={styles.text_Xemthemimg}
                    style={{ whiteSpace: "nowrap" }}
                  >
                    Xem thêm 12 bức ảnh
                  </p>
                  <img
                    src="/images/hotel/photo.svg"
                    alt="Icon"
                    className={styles.imgPhoto}
                  />
                </div>
              </div>
            </div>
            {/* Thông tin khác */}
            <div className={styles.container_information_hotel_other}>
              {/* Thông số */}
              <div className={styles.container_parameter_utility_hotel}>
                {/* Thông tin khác hotel */}
                <div className={styles.container_parameter_hotel}>
                  <p className={styles.textParameterUtilityHotel}>
                    Thông tin khác
                  </p>
                  {/* thông tin */}
                  <div className={styles.list_item_parameter_hotel}>
                    {/* Thông tin cột 1 */}
                    <div className={styles.list_item_parameter_1}>
                      {/* Số tầng */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/building.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Số tầng</p>
                          <p className={styles.text_information}>2 Tầng</p>
                        </div>
                      </div>
                      {/* Số nhà hàng */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/tools-kitchen-2.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Số nhà hàng</p>
                          <p className={styles.text_information}>3 Nhà hàng</p>
                        </div>
                      </div>
                      {/* Khoảng cách tới sân bay */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/map-pins.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>
                            Khoảng cách tới sân bay
                          </p>
                          <p className={styles.text_information}>10 Km</p>
                        </div>
                      </div>
                      {/* Năm xây dựng*/}
                      <div className={styles.item_parameter_hotel_Build}>
                        <img
                          src="/images/hotel/calendar-minus.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Năm xây dựng</p>
                          <p className={styles.text_information}>2017</p>
                        </div>
                      </div>
                    </div>
                    {/* Thông tin cột 2 */}
                    <div className={styles.list_item_parameter_1}>
                      {/* Số phòng */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/door.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Số phòng</p>
                          <p className={styles.text_information}>5 Phòng</p>
                        </div>
                      </div>
                      {/* Số quán bar */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/glass.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Số quán bar</p>
                          <p className={styles.text_information}>3 Quán bar</p>
                        </div>
                      </div>
                      {/* Năm tu sửa */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/calendar-minus.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Năm tu sửa</p>
                          <p className={styles.text_information}>2020</p>
                        </div>
                      </div>
                      {/* Khoảng cách tới thành phố */}
                      <div className={styles.item_parameter_hotel_distance}>
                        <img
                          src="/images/hotel/current-location.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>
                            Khoảng cách tới tt thành phố
                          </p>
                          <p className={styles.text_information}>
                            {information_hotel.distance_to_city} Km
                          </p>
                        </div>
                      </div>
                    </div>
                    {/* Thông tin cột 3 */}
                    <div className={styles.list_item_parameter_1_Delete768}>
                      {/* Năm xây dựng*/}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/calendar-minus.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>Năm xây dựng</p>
                          <p className={styles.text_information}>
                            {information_hotel.year_of_construction}
                          </p>
                        </div>
                      </div>
                      {/* Khoảng cách tới thành phố */}
                      <div className={styles.item_parameter_hotel}>
                        <img
                          src="/images/hotel/current-location.svg"
                          className={styles.imgPhoto}
                        />
                        <div className={styles.item_parameter_information}>
                          <p className={styles.text_parameter}>
                            Khoảng cách tới tt thành phố
                          </p>
                          <p className={styles.text_information}>
                            {information_hotel.distance_to_city} Km
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Tiện nghi */}
                <div className={styles.container_parameter_hotel}>
                  <p className={styles.textParameterUtilityHotel}>Tiện nghi</p>
                  <div className={styles.container_list_item_utility}>
                    {visibleItems.map((utility, index) => (
                      <div
                        className={styles.container_list_item_utility_row}
                        key={index}
                      >
                        {/* item - 1 */}
                        <div className={styles.container_item_utility}>
                          <img
                            src={utility.img}
                            alt="img"
                            className={styles.imgPhoto}
                          />
                          <p className={styles.text_item_utility}>
                            {"tiện ích nhe"}
                          </p>
                        </div>
                      </div>
                    ))}

                    {/* Nếu có phần tử còn lại, hiển thị số lượng phần tử còn lại */}
                    {remainingItemsCount > 0 && !isDetailVisible && (
                      <div
                        className={styles.container_item_utility}
                        onClick={toggleDetailVisibility}
                      >
                        <p className={styles.text_item_utility_more}>+</p>
                        <p className={styles.text_item_utility_more}>
                          {remainingItemsCount} tiện nghi
                        </p>
                      </div>
                    )}
                    {/* Nếu chi tiết được bật, hiển thị toàn bộ tiện ích */}
                    {isDetailVisible &&
                      information_hotel.utility
                        .slice(maxItemsHotelUtilityToShow)
                        .map((utility, index) => (
                          <div
                            className={styles.container_item_utility}
                            key={index}
                          >
                            <img
                              src={utility.img}
                              alt="img"
                              className={styles.imgPhoto}
                            />
                            <p className={styles.text_item_utility}>
                              {/* {utility.name || ""} */}
                            </p>
                          </div>
                        ))}
                    {isDetailVisible && (
                      <div
                        className={styles.container_item_utility}
                        onClick={toggleDetailVisibility}
                      >
                        <p className={styles.text_item_utility_more}>-</p>
                        <p className={styles.text_item_utility_more}>
                          Ẩn tiện nghi
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            {/* Số nhà hàng và số điểm du lịch*/}
            <div className={styles.container_number_restaurant_locationtour}>
              {/* Số nhà hàng */}
              <div className={styles.container_number_item}>
                {/* number */}
                <div className={styles.container_number_title_item}>
                  {/* title số nhà hàng */}
                  <div className={styles.number_restaurant}>
                    <p className={styles.titleNumber_restaurant}>
                      {data?.nearbyRestaurants?.length || 0}
                    </p>
                    <div className={styles.title_item_scope}>
                      <p className={styles.title_restaurant}>Nhà hàng</p>
                      <p className={styles.textScope}>trong phạm vi 3 km</p>
                    </div>
                  </div>
                  {/* btn Xem tất cả */}
                  <div className={styles.container_btn_ViewAll}>
                    <p className={styles.textViewAll}>Xem tất cả</p>
                  </div>
                </div>
                {/* List Item , ảnh*/}
                <div className={styles.container_list_item_restaurant_tour}>
                  {/* item */}
                  {data?.nearbyRestaurants.slice(0, 3).map((item) => (
                    <div className={styles.container_item_restaurant_tour}>
                      <img
                        src={
                          item.image
                            ? `${process.env.NEXT_PUBLIC_IMG_URL}${item.image}`
                            : "/images/hotel/numberRestaurant.png"
                        }
                        alt="img"
                        className={styles.img_res_tour}
                      />
                      <div className={styles.detail_item}>
                        <p className={styles.text_restaurant_other}>
                          {item.restaurantName}
                        </p>
                        <p className={styles.text_scope_restaurant}></p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              {/* Số điểm du lịch */}
              <div className={styles.container_number_item}>
                {/* number */}
                <div className={styles.container_number_title_item}>
                  {/* title số nhà hàng */}
                  <div className={styles.number_restaurant}>
                    <p className={styles.titleNumber_location_tour}>
                      {data?.nearbyHotelsWithRatings?.length || 0}
                    </p>
                    <div className={styles.title_item_scope}>
                      <p className={styles.title_location_tour}>Điểm du lịch</p>
                      <p className={styles.textScope}>
                        trong phạm vi {information_hotel.scope} km
                      </p>
                    </div>
                  </div>
                  {/* btn Xem tất cả */}
                  <div className={styles.container_btn_ViewAll}>
                    <p className={styles.textViewAll}>Xem tất cả</p>
                  </div>
                </div>
                <div className={styles.container_list_item_restaurant_tour}>
                  {data?.nearbyHotelsWithRatings.slice(0, 3).map((hotel) => (
                    <div
                      key={hotel.hotel_id}
                      className={styles.container_item_restaurant_tour}
                    >
                      <img
                        src="/images/hotel/numberLocationTour.png"
                        alt="hotel image"
                        className={styles.img_res_tour}
                      />
                      <div className={styles.detail_item}>
                        <p className={styles.text_restaurant_other}>
                          {hotel.rooms.length > 0
                            ? hotel.rooms[0].room.roomName
                            : "Unnamed Hotel"}
                        </p>
                        <p className={styles.text_scope_restaurant}>
                          {hotel.rooms.length > 0 && hotel.rooms[0].room.area
                            ? `${hotel.rooms[0].room.area} m`
                            : ""}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        <ListNumberHotelOther sortedRooms={sortedRooms} />
      </div>
      <Footer />
    </>
  );
}
