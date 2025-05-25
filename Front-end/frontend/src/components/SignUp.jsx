import styles from "../styles/auth_user.module.css";
import style from "../styles/style_global.module.css";
import { useState, useEffect, useRef } from "react";
// import {
//   registerUser,
//   sendOTP,
//   authAccount,
// } from "@/controllers/auth_user/data_api.js";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
export default function SignUp() {
  const [auth, setAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOTP, setIsLoadingOTP] = useState(false);
  const [isEyeVisible, setIsEyeVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [checkSignUp, setCheckSignUp] = useState(false);
  const [alertKey, setAlertKey] = useState(0);
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
  // Hàm gửi lại mã xác thực
  const resendCode = async () => {
    setIsRotating(true);
    setIsLoadingOTP(true);
    const check = 1;
    // const results_otp = await sendOTP(check);
    // if (results_otp.data?.result == true) {
    //   setCheckSignUp(true);
    //   setErrorMessage(results_otp.data?.message || "Gửi OTP thành công");
    //   setIsLoadingOTP(false);
    //   setIsRotating(false);
    //   setNotifi(true);
    // }
  };
  //   =========================================

  const handleNavigation = () => {
    setAuth(false);
    setErrorField((prevState) => ({
      ...prevState,
      name: false,
      email: false,
      phoneNumber: false,
      password: false,
      rePassword: false,
    }));
    setNotifi(false);
    if (dotSelected === 2) {
      // router.push({
      //   pathname: "/sign-up",
      // });
    }
  };

  //============= Bước 3 toogle mật khẩu==========
  const [isModalVisible, setIsModalVisible] = useState(false);
  // Dot
  const handleClickConfirm = async () => {
    const fullCode = code.join("");
    console.log(fullCode);
    const check = 1;
    const id = "";
    // const results = await authAccount(fullCode, check, id);
    if (dotSelected === 2) {
      setIsModalVisible(true);
    } else {
      setCheckSignUp(false);
      setErrorMessage("Lỗi xác thực tài khoản. Mã OTP không chính xác !");
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  // =======================form data ====================
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    repass: "",
    name: "",
    phoneNumber: "",
    type: 1,
  });
  // Hàm xử lý khi người dùng nhập dữ liệu
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const [errorField, setErrorField] = useState({
    email: false,
    phoneNumber: false,
    name: false,
    password: false,
    rePassword: false,
  });

  const handleClickSignUp = async () => {
    // trả về 1 : lỗi email, 2 : lỗi số điện thoại, 3: mật khẩu, 4 : repass, 5: 1 trong các trường để rỗng(chỉ có thể là họ và tên)
    setIsLoading(true);
    // const results = await registerUser(formData);

    setIsLoading(false);
    setCheckSignUp(true);
    setErrorMessage("Đăng ký thành công. Tiếp tục xác thực OTP !");
    setAuth(true);

    // alert(results);
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
                passHref
              >
                <p className={style.font_medium_white}>Đăng nhập</p>
              </a>
            </div>
          </div>
          {auth ? (
            <>
              {/* Xác thực OTP */}{" "}
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

                {/* Mã xác thực bước 2 */}
                {dotSelected == 2 && (
                  <>
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
                        Mã OTP đã được gửi đến Email của bạn. <br /> Bạn vui
                        lòng kiểm tra Email hoặc số điện thoại đã đăng ký và
                        nhập mã OTP để xác nhận đăng ký tài khoản.{" "}
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
                  </>
                )}
                {/* btn xác nhận */}
                <div
                  className={`${styles.button_sign_in} ${style.item_text}`}
                  onClick={handleClickConfirm}
                >
                  <p className={style.font_medium_white}>Xác nhận</p>
                  <div>{isLoadingOTP ? <Loading /> : ""}</div>
                </div>
                {/* Gửi lại mã xác thực bước 2 */}
                {dotSelected == 2 && (
                  <div className={styles.resend_code}>
                    <p className={styles.textCodeConfirm}>
                      Gửi lại mã xác thực
                    </p>
                    <img
                      src="/images/update.svg"
                      alt="icon-resend-code"
                      onClick={resendCode}
                      className={`${style.icon_30} ${styles.reload} ${
                        isRotating ? styles.rotating : ""
                      }`}
                    />
                  </div>
                )}
                {/* Bước 3 thành công */}
                {isModalVisible && (
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
                          passHref
                        >
                          <p className={style.font_medium_16px_logo}>
                            Đăng nhập
                          </p>
                        </a>
                      </div>
                    </div>
                  </div>
                )}
                {/* thông báo mã xác thực đã được gửi lại */}
                {notifi && (
                  <p
                    className={style.font_medium_16px_logo}
                    style={{ textAlign: "center" }}
                  >
                    Mã xác thực đã được gửi lại
                  </p>
                )}
              </div>
            </>
          ) : (
            <>
              {" "}
              <div className={styles.container_fill_sign_up}>
                <p className={style.font_bold_40px_text}>Đăng ký</p>
                <input
                  type="text"
                  placeholder="Email, số điện thoại đăng ký *"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={styles.input}
                  style={{
                    borderColor: errorField.email ? "#DB242D" : "#1c1b1e",
                    color: errorField.email ? "#DB242D" : "#1c1b1e",
                  }}
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Số điện thoại liên hệ *"
                  className={styles.input}
                  style={{
                    borderColor: errorField.phoneNumber ? "#DB242D" : "#1c1b1e",
                    color: errorField.phoneNumber ? "#DB242D" : "#1c1b1e",
                  }}
                />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Họ và tên *"
                  className={styles.input}
                  style={{
                    borderColor: errorField.name ? "#DB242D" : "#1c1b1e",
                    color: errorField.name ? "#DB242D" : "#1c1b1e",
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
                      isEyeVisible1 ? "/images/eye.svg" : "/images/eye-off.svg"
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
                      isEyeVisible ? "/images/eye.svg" : "/images/eye-off.svg"
                    }
                    className={`${style.icon} ${style.item_bar}`}
                    onClick={toggleIcon}
                  />
                </div>
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
            </>
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
