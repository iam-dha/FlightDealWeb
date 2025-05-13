import axios from "axios";

// Cấu hình base URL cho toàn bộ request
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Đổi lại nếu bạn deploy ở server khác
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
/*
const mockUsers = [
  { _id: "1", name: "Nguyễn Văn A", email: "a@example.com" },
  { _id: "2", name: "Trần Thị B", email: "b@example.com" },
  { _id: "3", name: "Lê Văn C", email: "c@example.com" },
];
const mockOrders = [
  {
    _id: "101",
    userId: "1",
    total: 500000,
    status: "Completed",
    date: "2025-04-01",
  },
  {
    _id: "102",
    userId: "2",
    total: 300000,
    status: "Pending",
    date: "2025-04-02",
  },
  {
    _id: "103",
    userId: "3",
    total: 700000,
    status: "Cancelled",
    date: "2025-04-03",
  },
];
const mockTickets = [
  {
    _id: "201",
    flightCode: "VN123",
    from: "Hà Nội",
    to: "TP.HCM",
    price: 1500000,
    availableSeats: 50,
  },
  {
    _id: "202",
    flightCode: "VN456",
    from: "Đà Nẵng",
    to: "Hà Nội",
    price: 1200000,
    availableSeats: 30,
  },
  {
    _id: "203",
    flightCode: "VN789",
    from: "TP.HCM",
    to: "Phú Quốc",
    price: 1000000,
    availableSeats: 20,
  },
];
const mockPromotions = [
  {
    _id: "301",
    code: "SALE50",
    description: "Giảm 50%",
    discount: 50,
    validUntil: "2025-05-01",
  },
  {
    _id: "302",
    code: "SALE30",
    description: "Giảm 30%",
    discount: 30,
    validUntil: "2025-06-01",
  },
  {
    _id: "303",
    code: "SALE10",
    description: "Giảm 10%",
    discount: 10,
    validUntil: "2025-07-01",
  },
];
const mockStatistics = {
  totalOrders: 250,
  totalRevenue: 50000000,
  totalTicketsSold: 200,
  totalUsers: 100,
  bestSellingFlight: "VN123",
};
const api = {
  get: async (url) => {
    if (url === "/statistics") {
      console.log("Trả về mockStatistics:", mockStatistics);
      return { data: mockStatistics };
    }
    if (url === "/users") {
      return { data: mockUsers };
    }
    if (url === "/orders") {
      return { data: mockOrders };
    }
    if (url === "/tickets") {
      return { data: mockTickets };
    }
    if (url === "/promotions") {
      return { data: mockPromotions };
    }
    if (url === "/statistics") {
      return { data: mockStatistics };
    }
    return { data: [] };
  },
  post: async (url, newData) => {
    if (url === "/users") {
      const createdUser = { ...newData, _id: Date.now().toString() };
      mockUsers.push(createdUser);
      return { data: createdUser };
    }
    if (url === "/orders") {
      const createdOrder = { ...newData, _id: Date.now().toString() };
      mockOrders.push(createdOrder);
      return { data: createdOrder };
    }
    if (url === "/tickets") {
      const createdTicket = { ...newData, _id: Date.now().toString() };
      mockTickets.push(createdTicket);
      return { data: createdTicket };
    }
    if (url === "/promotions") {
      const createdPromotion = { ...newData, _id: Date.now().toString() };
      mockPromotions.push(createdPromotion);
      return { data: createdPromotion };
    }
    return { data: null };
  },
  delete: async (url) => {
    const id = url.split("/").pop();
    if (url.startsWith("/users")) {
      const index = mockUsers.findIndex((user) => user._id === id);
      if (index !== -1) mockUsers.splice(index, 1);
    }
    if (url.startsWith("/orders")) {
      const index = mockOrders.findIndex((order) => order._id === id);
      if (index !== -1) mockOrders.splice(index, 1);
    }
    if (url.startsWith("/tickets")) {
      const index = mockTickets.findIndex((ticket) => ticket._id === id);
      if (index !== -1) mockTickets.splice(index, 1);
    }
    if (url.startsWith("/promotions")) {
      const index = mockPromotions.findIndex(
        (promotion) => promotion._id === id
      );
      if (index !== -1) mockPromotions.splice(index, 1);
    }
    return { data: null };
  },
};

export default api;
*/
