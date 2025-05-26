import styles from "../styles/auth_user.module.css";
import style from "../styles/style_global.module.css";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../services/api";
export default function SignIn() {
  const navigate = useNavigate();
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [alertKey, setAlertKey] = useState(0);
  const [checkSignIn, setCheckSignIn] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Hàm xử lý khi người dùng click vào icon
  const toggleIcon = () => {
    setIsEyeVisible((prevState) => !prevState);
  };
  // Nhập thông tin đăng nhập
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  // Đăng nhập
  const handleSignIn = async () => {
    setIsLoading(true);
    setErrorMessage(""); // Xóa lỗi cũ nếu có

    try {
      const results = await loginUser(formData);
      // console.log(results);
      Cookies.set("accessToken", results?.data?.accessToken, { expires: 7 });
      setCheckSignIn(true);
      setErrorMessage("Đăng nhập thành công!");

      setTimeout(() => {
        navigate("/home");
      }, 1000);
    } catch (error) {
      // ✅ Nếu lỗi từ server
      const message =
        error.response?.data?.error || "Đăng nhập thất bại. Vui lòng thử lại.";
      setErrorMessage(message);
      setCheckSignIn(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Ấn enter để đăng nhập
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      handleSignIn();
    }
  };
  // Hàm kiểm tra token trong cookie
  const checkAuthentication = () => {
    const cookies = document.cookie.split("; ");
    const tokenCookie = cookies.find((cookie) => cookie.startsWith("Token="));
    return !!tokenCookie; // Trả về true nếu token tồn tại
  };
  //=============== AccessToken====================
  // useEffect(() => {
  //   if (checkAuthentication()) {
  //     router.push("/");
  //   }
  // }, [router]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_sign_in}>
          <div className={styles.container_fill_sign_up}>
            <p className={style.font_bold_40px_text}>Đăng nhập </p>
            <input
              type="text"
              placeholder="Đăng nhập bằng Email *"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={styles.input}
              onKeyDown={handleKeyDown}
            />
            <div className={styles.container_input_pass}>
              <input
                type={isEyeVisible ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu *"
                className={styles.input_pass}
                onKeyDown={handleKeyDown}
              />
              <img
                src={isEyeVisible ? "/images/eye.svg" : "/images/eye-off.svg"}
                className={`${style.icon} ${style.item_bar}`}
                onClick={toggleIcon}
              />
            </div>
            <div className={styles.container_memorize}>
              <input type="checkbox" className={style.customCheckbox_require} />
              <p className={style.font_medium_text}>Ghi nhớ tài khoản</p>
            </div>
            <div
              className={`${styles.button_sign_in} ${style.item_text}`}
              onClick={handleSignIn}
            >
              <p className={style.font_medium_white}>Đăng nhập</p>
              <div>{isLoading ? <Loading /> : ""}</div>
            </div>
            <a
              href="/reset-password"
              className={`${styles.container_forget_pass} ${style.font_medium_16px_logo} ${style.item_text}`}
              passHref
            >
              Quên mật khẩu
            </a>
            <div className={styles.btnSignUp}>
              <p className={style.font_medium_16px}>Bạn chưa có tài khoản?</p>
              <a
                href="/cooperate/sign-up"
                className={`${style.font_medium_16px} ${style.item_text}`}
                style={{ color: "#f4ab01" }}
              >
                Đăng ký
              </a>
            </div>
          </div>
          <div className={styles.container_img_sign}>
            <div className={styles.container_btn_sign_in}>
              <p className={style.font_medium_18px_white}>
                Bạn chưa có tài khoản?
              </p>
              <a
                href="sign-up"
                className={`${styles.btn_sign_in} ${style.item_text}`}
                passHref
              >
                <p className={style.font_medium_white}>Đăng ký</p>
              </a>
            </div>
          </div>
        </div>
        {errorMessage && (
          <Alert
            key={alertKey}
            message={errorMessage}
            duration={1000}
            check={!checkSignIn ? 0 : 1}
            onClose={() => setErrorMessage("")}
          />
        )}
      </div>
    </>
  );
}
