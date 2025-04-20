import { useEffect, useState } from "react";
import axios from "axios";

export default function PromotionManagement() {
  const [promotions, setPromotions] = useState([]);
  const [form, setForm] = useState({ code: "", discount: "", expires: "" });

  useEffect(() => {
    axios.get("/api/promotions").then((res) => setPromotions(res.data));
  }, []);

  const handleAdd = (e) => {
    e.preventDefault();
    axios.post("/api/promotions", form).then(() => {
      alert("Đã thêm mã khuyến mãi");
      setForm({ code: "", discount: "", expires: "" });
    });
  };

  return (
    <div className="admin-section">
      <h2>Quản lý khuyến mãi</h2>
      <form onSubmit={handleAdd}>
        <input
          placeholder="Mã KM"
          value={form.code}
          onChange={(e) => setForm({ ...form, code: e.target.value })}
        />
        <input
          placeholder="Giảm (%)"
          value={form.discount}
          onChange={(e) => setForm({ ...form, discount: e.target.value })}
        />
        <input
          type="date"
          value={form.expires}
          onChange={(e) => setForm({ ...form, expires: e.target.value })}
        />
        <button>Thêm</button>
      </form>
      <ul>
        {promotions.map((promo) => (
          <li key={promo._id}>
            {promo.code} - Giảm {promo.discount}% (HSD: {promo.expires})
          </li>
        ))}
      </ul>
    </div>
  );
}
