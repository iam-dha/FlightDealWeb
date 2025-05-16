import React, { useState } from "react";
import "../styles/PromotionPage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";

const promotions = [
  {
    id: 1,
    title: "Siêu ưu đãi mùa hè - Vé máy bay khứ hồi giảm đến 50%",
    description:
      "Chuyến bay khứ hồi trong mùa hè này với giá cực kỳ ưu đãi, chỉ dành riêng cho bạn. Đặt ngay để không bỏ lỡ cơ hội bay cùng gia đình và bạn bè!",
    image: "/images/promotion/promotion1.jpg",
    badge: "Hot",
    discountCode: "SUMMER50",
  },
  {
    id: 2,
    title: "Combo nghỉ dưỡng & bay giá siêu rẻ",
    description:
      "Đặt combo khách sạn và vé máy bay để nhận giá ưu đãi tốt nhất thị trường. Tiết kiệm tối đa cho kỳ nghỉ mơ ước của bạn!",
    image: "/images/promotion/promotion1.jpg",
    discountCode: "COMBO20",
  },
  {
    id: 3,
    title: "Thứ 4 bay rẻ - Ưu đãi cực lớn chỉ hôm nay!",
    description:
      "Chỉ duy nhất vào ngày thứ 4, giảm giá cực sốc cho các chặng bay trong nước và quốc tế. Nhanh tay lên!",
    image: "/images/promotion/promotion2.jpg",
    badge: "Mới",
    discountCode: "WEDFLY",
  },
  {
    id: 4,
    title: "Ưu đãi đặc quyền dành cho thành viên Traveloka",
    description:
      "Thành viên Traveloka được tặng voucher 300.000đ khi đặt vé và dịch vụ du lịch. Đăng ký ngay để tận hưởng ưu đãi!",
    image: "/images/promotion/promotion2.jpg",
    discountCode: "VIP300",
  },
];

export default function PromotionPage() {
  const [selectedPromo, setSelectedPromo] = useState(null);
  const [copied, setCopied] = useState(false);

  const openModal = (promo) => {
    setSelectedPromo(promo);
    setCopied(false);
  };

  const closeModal = () => {
    setSelectedPromo(null);
    setCopied(false);
  };

  const copyCode = () => {
    if (selectedPromo?.discountCode) {
      navigator.clipboard.writeText(selectedPromo.discountCode);
      setCopied(true);
    }
  };

  return (
    <div className="promotion-page">
      <Header />
      <main className="promotion-container">
        <h1 className="promo-title">🎁 Ưu Đãi Nổi Bật</h1>

        <div className="promotion-grid">
          {promotions.map(({ id, title, description, image, badge }) => (
            <div key={id} className="promo-card">
              <div className="image-wrapper">
                <img src={image} alt={title} />
                {badge && (
                  <span className={`promo-badge ${badge.toLowerCase()}`}>
                    {badge}
                  </span>
                )}
              </div>
              <div className="promo-content">
                <h3>{title}</h3>
                <p>{description}</p>
                <button
                  className="promo-btn"
                  onClick={() => openModal(promotions.find((p) => p.id === id))}
                >
                  Xem chi tiết
                </button>
              </div>
            </div>
          ))}
        </div>

        {selectedPromo && (
          <div className="modal-overlay" onClick={closeModal}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <button className="modal-close" onClick={closeModal}>
                &times;
              </button>
              <img
                src={selectedPromo.image}
                alt={selectedPromo.title}
                className="modal-image"
              />
              <h2>{selectedPromo.title}</h2>
              <p>{selectedPromo.description}</p>
              {selectedPromo.discountCode && (
                <div className="discount-section">
                  <p>Mã giảm giá:</p>
                  <div className="discount-code">
                    <span>{selectedPromo.discountCode}</span>
                    <button onClick={copyCode} className="copy-btn">
                      {copied ? "Đã sao chép!" : "Lấy mã giảm giá"}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
