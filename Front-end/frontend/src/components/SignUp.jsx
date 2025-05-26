import styles from "../styles/auth_user.module.css";
import style from "../styles/style_global.module.css";
import { useState, useEffect, useRef } from "react";
import Cookies from "js-cookie";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { requestOtp, verifyRegister, verifySignUp } from "../services/api";
export default function SignUp() {
  const [auth, setAuth] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkSignUp, setCheckSignUp] = useState(false);
  const [alertKey, setAlertKey] = useState(0);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repass: "",
    token: "",
    fullname: "",
    address: "",
    phone: "",
  });
  const toggleIcon = () => {
    setIsEyeVisible((prevState) => !prevState);
  };
  const [isEyeVisible1, setIsEyeVisible1] = useState(false);
  const toggleIcon1 = () => {
    setIsEyeVisible1((prevState) => !prevState);
  };
  // Biến lưu trạng thái
  const [dotSelected, setDotSelected] = useState(2);
  // =============== Mã xác thực =======================
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef([]); // Tham chiếu đến các ô input

  const handleCodeChange = (e, index) => {
    const value = e.target.value;

    // Nếu ký tự không phải là số, bỏ qua không làm gì
    if (/[^0-9]/.test(value)) {
      return;
    }

    const newCode = [...code];
    newCode[index] = value; // Cập nhật giá trị ô

    setCode(newCode);

    // Tự động focus vào ô tiếp theo nếu có giá trị và chưa phải ô cuối
    if (value && index < 5) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" || e.key === "Delete") {
      const newCode = [...code];

      // Nếu ô hiện tại trống, focus về ô trước
      if (!code[index] && index > 0) {
        newCode[index - 1] = "";
        setCode(newCode);
        inputsRef.current[index - 1]?.focus();
      } else {
        // Xóa giá trị ô hiện tại nếu không trống
        newCode[index] = "";
        setCode(newCode);
      }
    }
  };
  const handleInput = (e, index) => {
    // Xử lý trên thiết bị di động để luôn focus đúng ô tiếp theo
    const value = e.target.value;

    if (value && index < 5) {
      inputsRef.current[index + 1].focus();
    }
  };
  const handlePaste = (e) => {
    e.preventDefault(); // Ngăn hành động paste mặc định

    const pasteData = e.clipboardData.getData("text").slice(0, 6); // Lấy tối đa 6 ký tự
    const newCode = [...code];

    pasteData.split("").forEach((char, index) => {
      if (index < newCode.length) {
        newCode[index] = char;
      }
    });

    setCode(newCode);

    // Focus vào ô cuối cùng được điền
    const lastFilledIndex = pasteData.length - 1;
    if (lastFilledIndex >= 0 && lastFilledIndex < inputsRef.current.length) {
      inputsRef.current[lastFilledIndex].focus();
    }
  };
  // =====================================================================
  const [notifi, setNotifi] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  //   =========================================

  const handleNavigation = () => {
    setAuth(auth - 1);
    setErrorField((prevState) => ({
      ...prevState,
      email: false,
    }));
    setNotifi(false);
    if (dotSelected === 2) {
      // router.push({
      //   pathname: "/sign-up",
      // });
    }
  };
  const formVerOTP = {
    email: formData.email,
    otp: "",
  };
  //============= Bước 3 toogle mật khẩu==========
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Dot
  const handleClickConfirm = async () => {
    const fullCode = code.join("");
    formVerOTP.otp = fullCode;

    try {
      const results = await verifyRegister(formVerOTP);
      if (results?.data?.token) {
        setCheckSignUp(true);
        setErrorMessage("OTP xác thực thành công");
        Cookies.set("token", results?.data?.token, { expires: 7 });
        setAuth(3);
      }
    } catch (error) {
      setCheckSignUp(false);
      setErrorMessage("Đã xảy ra lỗi khi xác thực OTP. Vui lòng thử lại sau.");
    }
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  // =======================form data ====================

  // Hàm xử lý khi người dùng nhập dữ liệu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errorField, setErrorField] = useState({
    email: false,
  });

  const handleClickSignUp = async () => {
    setIsLoading(true);
    const results = await requestOtp(formData.email);
    setIsLoading(false);
    setCheckSignUp(true);
    setErrorMessage("Đăng ký thành công. Tiếp tục xác thực OTP !");
    setAuth(2);
    // alert(results);
  };
  const formDone = {
    email: formData.email,
    password: formData.password,
    token: Cookies.get("token"),
    fullName: formData.fullname,
    address: formData.address,
    phone: formData.phone,
  };
  const handleClickDoneSignUp = async () => {
    if (formData.password != formData.repass) {
      setCheckSignUp(false);
      setErrorMessage("Mật khẩu không khớp. Vui lòng nhập lại !");
    } else {
      setIsLoading(true);
      setCheckSignUp(true);
      const results = await verifySignUp(formDone);
      Cookies.set("accessToken", results?.data?.accessToken, { expires: 7 });
      setAuth(4);
    }
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_sign_in}>
          <div className={styles.container_img_sign}>
            <div className={styles.container_btn_sign_in}>
              <p className={styles.font_medium_18px_white}>
                Bạn đã có tài khoản?
              </p>
              <a
                href="/sign-in"
                className={`${styles.btn_sign_in} ${style.item_text}`}
              >
                <p className={style.font_medium_white}>Đăng nhập</p>
              </a>
            </div>
          </div>
          {auth == 1 && (
            // Bước 1: Đăng ký bằng Email
            <div className={styles.container_fill_sign_up1}>
              <p className={style.font_bold_40px_text}>Đăng ký</p>
              <input
                type="text"
                placeholder="Email đăng ký của bạn*"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                style={{
                  borderColor: errorField.email ? "#DB242D" : "#1c1b1e",
                  color: errorField.email ? "#DB242D" : "#1c1b1e",
                }}
              />
              <div
                className={`${styles.btn_signIn_SignUp} ${style.item_text}`}
                onClick={handleClickSignUp}
              >
                <p className={style.font_medium_white}>Đăng ký</p>
                <div>{isLoading ? <Loading /> : ""}</div>
              </div>
              <a
                href="sign-in"
                className={`${styles.btnSignIn} ${style.font_medium_16px_logo} ${style.item_text}`}
              >
                Đăng nhập
              </a>
            </div>
          )}

          {auth == 2 && (
            // Bước 2: Nhập mã OTP
            <div className={styles.container_forgot}>
              <div className={styles.container_back}>
                <div
                  onClick={handleNavigation}
                  className={`${style.icon} ${style.item_text}`}
                >
                  <img
                    src="/images/arrow-narrow-left.svg"
                    className={style.icon}
                  />
                </div>
                <p className={style.font_regular}>Quay lại</p>
              </div>

              <p
                className={style.font_bold_40px_text}
                style={{ textAlign: "center", marginTop: "64px" }}
              >
                Nhập mã OTP
              </p>

              {notifi && (
                <p
                  className={style.font_regular}
                  style={{ textAlign: "center" }}
                >
                  Mã OTP đã được gửi đến Email của bạn. <br />
                  Vui lòng kiểm tra và nhập mã OTP để xác nhận.
                </p>
              )}

              <div className={styles.codeContainer}>
                {code.map((digit, index) => (
                  <input
                    key={index}
                    id={`code-input-${index}`}
                    type="text"
                    maxLength="1"
                    value={digit}
                    onPaste={index === 0 ? handlePaste : null}
                    onChange={(e) => handleCodeChange(e, index)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onInput={(e) => handleInput(e, index)}
                    ref={(el) => (inputsRef.current[index] = el)}
                    className={styles.codeInput}
                  />
                ))}
              </div>

              {/* Nút xác nhận OTP */}
              <div
                className={`${styles.button_sign_in} ${style.item_text}`}
                onClick={handleClickConfirm}
              >
                <p className={style.font_medium_white}>Xác nhận</p>
                <div>{isLoadingOTP ? <Loading /> : ""}</div>
              </div>

              {/* Thông báo gửi lại mã */}
              {notifi && (
                <p
                  className={style.font_medium_16px_logo}
                  style={{ textAlign: "center" }}
                >
                  Mã xác thực đã được gửi lại
                </p>
              )}
            </div>
          )}
          {auth == 3 && (
            <div
              className={styles.container_fill_sign_up}
              style={{ paddingTop: "20px !important" }}
            >
              <div className={styles.container_back}>
                <div
                  onClick={handleNavigation}
                  className={`${style.icon} ${style.item_text}`}
                >
                  <img
                    src="/images/arrow-narrow-left.svg"
                    className={style.icon}
                  />
                </div>
                <p className={style.font_regular}>Quay lại</p>
              </div>
              <p
                className={style.font_bold_40px_text}
                style={{ textAlign: "center" }}
              >
                Hoàn tất đăng ký
              </p>
              <input
                type="text"
                placeholder="Email đăng ký của bạn*"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                style={{
                  borderColor: errorField.email ? "#DB242D" : "#1c1b1e",
                  color: errorField.email ? "#DB242D" : "#1c1b1e",
                }}
              />
              <div
                className={styles.container_input_pass}
                style={{
                  borderColor: errorField.password ? "#DB242D" : "#1c1b1e",
                  color: errorField.password ? "#DB242D" : "#1c1b1e",
                }}
              >
                <input
                  type={isEyeVisible1 ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Mật khẩu *"
                  className={styles.input}
                  style={{
                    border: "none",
                    color: errorField.password ? "#DB242D" : "#1c1b1e",
                  }}
                />
                <img
                  src={
                    isEyeVisible1
                      ? "/images/cooperate/eye.svg"
                      : "/images/cooperate/eye-off.svg"
                  }
                  className={`${style.icon} ${style.item_bar}`}
                  onClick={toggleIcon1}
                />
              </div>
              <div
                className={styles.container_input_pass}
                style={{
                  borderColor: errorField.rePassword ? "#DB242D" : "#1c1b1e",
                  color: errorField.rePassword ? "#DB242D" : "#1c1b1e",
                }}
              >
                <input
                  type={isEyeVisible ? "text" : "password"}
                  name="repass"
                  value={formData.repass}
                  onChange={handleChange}
                  placeholder="Nhập lại mật khẩu *"
                  className={styles.input}
                  style={{
                    border: "none",
                    color: errorField.rePassword ? "#DB242D" : "#1c1b1e",
                  }}
                />
                <img
                  src={
                    isEyeVisible
                      ? "/images/cooperate/eye.svg"
                      : "/images/cooperate/eye-off.svg"
                  }
                  className={`${style.icon} ${style.item_bar}`}
                  onClick={toggleIcon}
                />
              </div>
              <input
                type="text"
                placeholder="Họ và tên*"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                className={styles.input}
                style={{
                  borderColor: errorField.email ? "#DB242D" : "#1c1b1e",
                  color: errorField.email ? "#DB242D" : "#1c1b1e",
                }}
              />
              <input
                type="text"
                placeholder="Địa chỉ*"
                name="address"
                value={formData.address}
                onChange={handleChange}
                className={styles.input}
                style={{
                  borderColor: errorField.email ? "#DB242D" : "#1c1b1e",
                  color: errorField.email ? "#DB242D" : "#1c1b1e",
                }}
              />
              <input
                type="number"
                placeholder="Số điện thoại*"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                style={{
                  borderColor: errorField.email ? "#DB242D" : "#1c1b1e",
                  color: errorField.email ? "#DB242D" : "#1c1b1e",
                }}
              />
              <div
                className={`${styles.btn_signIn_SignUp} ${style.item_text}`}
                onClick={handleClickDoneSignUp}
              >
                <p className={style.font_medium_white}>Đăng ký</p>
                <div>{isLoading ? <Loading /> : ""}</div>
              </div>
              <a
                href="sign-in"
                className={`${styles.btnSignIn} ${style.font_medium_16px_logo} ${style.item_text}`}
              >
                Đăng nhập
              </a>
            </div>
          )}
          {auth == 4 && isModalVisible && (
            // Bước 3: Hiển thị modal thành công
            <div className={styles.overlay}>
              <div className={styles.modal}>
                <div className={styles.confirm}>
                  <img src="/images/confirm.svg" className={style.icon} />
                  <p className={style.font_semibold_14px_gray9}>
                    Đăng ký thành công
                  </p>
                </div>
                <div className={styles.container_cancel_confirm}>
                  <p
                    className={`${style.font_regular_gray8} ${style.item_text}`}
                    onClick={handleCloseModal}
                  >
                    Hủy
                  </p>
                  <a
                    href="sign-in"
                    className={`${styles.btn_sign_in_b3} ${style.item_text}`}
                  >
                    <p className={style.font_medium_16px_logo}>Đăng nhập</p>
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
        {errorMessage && (
          <Alert
            key={alertKey}
            message={errorMessage}
            duration={3000}
            check={!checkSignUp ? 0 : 1}
            onClose={() => setErrorMessage("")}
          />
        )}
      </div>
    </>
  );
}
