// src/services/api.js
import axios from "axios";
import Cookies from "js-cookie";
// Đổi BASE_URL nếu cần
const BASE_URL = process.env.REACT_APP_API_URL;

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Gửi OTP
export const requestOtp = (email) => {
  return api.post("/client/auth/register/request-otp", { email });
};

// Xác minh OTP và đăng ký
export const verifyRegister = (data) => {
  return api.post("/client/auth/register/verOtp", data);
};
export const verifySignUp = (data) => {
  return api.post("/client/auth/register/verify", data);
};

// Đăng nhập
export const loginUser = (data) => {
  return api.post("/client/auth/login", data);
};
// Quên mật khẩu
export const forgotPass = (data) => {
  return api.post("/client/auth/forgot-password", data);
};
export const resetPassToken = (data, token) => {
  return api.post(`/client/auth/reset-password/${token}`, data);
};

// Đăng xuất
export const logOut = () => {
  return api.post("/client/auth/logout");
};
// ==========Tìm kiếm ==================

export const searchFly = (params, token) => {
  return api.get("/client/flights/search", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params,
  });
};
// Lấy cài đặt người dùng (token cần được đính kèm)
export const getUserSettings = (token) => {
  return api.get("/user/settings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// =========Máy bay ===================
export const bookingFly = (token, params) => {
  return api.post("/client/bookings", params, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// ===========Người dùng===================

export const getUser = (token) => {
  return api.get("/client/user/settings", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
//============== Khách sạn =================

export const getHotel = (token) => {
  return api.get("/client/hotels/hotels", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const searchHotel = (token, key) => {
  return api.get(`/client/hotels/iata/${key}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
// ========== đặt xe ======================
export const carRoute = (data) => {
  return api.get("/client/cars/car-routes", {
    params: data,
  });
};

api.interceptors.response.use(
  (response) => response, // nếu thành công thì return luôn
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refreshRes = await axios.post("/client/auth/refresh", null, {
          withCredentials: true, // Nếu refresh token nằm trong cookies
        });

        // Giả sử access token trả về ở refreshRes.data.accessToken
        const newToken = refreshRes.data.accessToken;
        Cookies.set("accessToken", newToken); // lưu lại vào cookies

        // Reload lại trang
        window.location.reload();

        // Nếu không muốn reload mà retry request:
        // originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
        // return api(originalRequest);
      } catch (refreshError) {
        console.error("Refresh token failed", refreshError);
        // logout hoặc chuyển về login nếu cần
        window.location.href = "/sign-in";
      }
    }

    return Promise.reject(error);
  }
);
