/*import axios from "axios";

// Cấu hình base URL cho toàn bộ request
const api = axios.create({
  baseURL: "http://localhost:5000/api", // Đổi lại nếu bạn deploy ở server khác
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
*/

const mockUsers = [
  { _id: "1", name: "Nguyễn Văn A", email: "a@example.com" },
  { _id: "2", name: "Trần Thị B", email: "b@example.com" },
  { _id: "3", name: "Lê Văn C", email: "c@example.com" },
];

const api = {
  get: async (url) => {
    if (url === "/users") {
      return { data: mockUsers }; // Trả về dữ liệu giả lập
    }
    return { data: [] };
  },
  post: async (url, newUser) => {
    if (url === "/users") {
      const createdUser = { ...newUser, _id: Date.now().toString() };
      mockUsers.push(createdUser);
      return { data: createdUser };
    }
    return { data: null };
  },
  delete: async (url) => {
    const id = url.split("/").pop();
    const index = mockUsers.findIndex((user) => user._id === id);
    if (index !== -1) {
      mockUsers.splice(index, 1);
    }
    return { data: null };
  },
};

export default api;
