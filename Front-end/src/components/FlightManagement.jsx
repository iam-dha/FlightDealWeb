import { useState, useEffect } from "react";
import axios from "axios";

export default function FlightManagement() {
  const [flights, setFlights] = useState([]);
  const [form, setForm] = useState({ from: "", to: "", date: "", price: "" });

  useEffect(() => {
    axios.get("/api/flights").then((res) => setFlights(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/flights", form).then(() => {
      alert("Đã thêm chuyến bay");
      setForm({ from: "", to: "", date: "", price: "" });
    });
  };

  return (
    <div className="admin-section">
      <h2>Quản lý chuyến bay</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Từ đâu"
          value={form.from}
          onChange={(e) => setForm({ ...form, from: e.target.value })}
        />
        <input
          placeholder="Đến đâu"
          value={form.to}
          onChange={(e) => setForm({ ...form, to: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          placeholder="Giá vé"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
        />
        <button type="submit">Thêm chuyến bay</button>
      </form>
      <ul>
        {flights.map((flight) => (
          <li key={flight._id}>
            {flight.from} → {flight.to} ({flight.date}) - {flight.price} VND
          </li>
        ))}
      </ul>
    </div>
  );
}
