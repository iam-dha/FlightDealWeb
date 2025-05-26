import styles from "../styles/auth_user.module.css";
import style from "../styles/style_global.module.css";
import { useState, useRef, useEffect } from "react";
import Loading from "../components/Loading";
import Alert from "../components/Alert";
import { forgotPass, resetPassToken } from "../services/api";
import { useNavigate, useParams, useLocation } from "react-router-dom";
export default function ForgotPassword() {
  const location = useLocation(); // lấy toàn bộ URL, bao gồm query
  const path = location.pathname;
  const tokenRequest = path.split("/").pop();
  const query = location.search;
  const navigate = useNavigate();
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const { selected } = 1;
  let backgroundImage;
  if (selected === "1") {
    backgroundImage = "url('/images/backgroundnoblur.png')";
  } else if (selected === "2") {
    backgroundImage = "url('/images/background-car.png')";
  } else if (selected === "3") {
    backgroundImage = "url('/images/background-restaurant.png')";
  }
  // lưu email
  const [email, setEmail] = useState("");
  // loading
  const [isLoading, setIsLoading] = useState(false);
  // thông báo
  const [errorMessage, setErrorMessage] = useState("");
  const [alertKey, setAlertKey] = useState(0);
  const [checkSendOTP, setCheckSendOTP] = useState(false);
  // Biến lưu trạng thái
  const [dotSelected, setDotSelected] = useState(1);
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

  // Hàm gửi lại mã xác thực
  const resendCode = async () => {
    setIsLoading(true);
    setIsRotating(true);
    setTimeout(() => {
      setIsRotating(false);
    }, 3000);
    const check = 0;
    // const results_otp = await sendOTP(check, email);
    // if (results_otp.data?.result == true) {
    setErrorMessage("Mã xác thực đã được gửi lại !");
    setIsLoading(false);
    setCheckSendOTP(true);
    // } else {
    //   setIsLoading(false);
    //   setCheckSendOTP(false);
    //   setErrorMessage("Lỗi gửi mã xác thực!");
    // }
  };

  const [isRotating, setIsRotating] = useState(false);
  //   =========================================

  const handleNavigation = () => {
    if (dotSelected === 1) {
      navigate("/sign-in");
    } else {
      // Nếu dotSelected khác 1, giảm giá trị dotSelected
      setDotSelected((prev) => prev - 1);
    }
  };

  //============= Bước 3 toogle mật khẩu==========
  const [isEyeVisible1, setIsEyeVisible1] = useState(false);

  const toggleIcon1 = () => {
    setIsEyeVisible1((prevState) => !prevState);
  };
  const [isEyeVisible2, setIsEyeVisible2] = useState(false);
  const toggleIcon2 = () => {
    setIsEyeVisible2((prevState) => !prevState);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isModalVisible, setIsModalVisible] = useState(false);
  // Dot
  const [id, setId] = useState();
  const formData = {
    email: email,
  };
  const handleClickConfirm = async () => {
    setIsLoading(true);
    if (dotSelected == 1) {
      setIsLoading(true);
      const results = await forgotPass(formData);
      setIsLoading(false);

      if (results) {
        // ✅ Gửi email thành công
        setShowSuccessPopup(true); // <-- bạn tạo state này để điều khiển popup
      } else {
        // ❌ Có thể hiện thông báo lỗi nếu cần
        setErrorMessage("Không thể gửi email, vui lòng thử lại.");
      }
    }

    if (dotSelected == 2) {
      const data_form = {
        newPassword: password,
        reNewPassword: confirmPassword,
      };
      const result = await resetPassToken(data_form, tokenRequest);

      //   if (result.data?.result == true) {
      setIsLoading(false);
      setErrorMessage("Đổi mật khẩu thành công!");
      setCheckSendOTP(true);
      setIsModalVisible(true);
      //   } else {
      //     setIsLoading(false);
      //     console.log("result", result);
      //     setErrorMessage(
      //       "Mật khẩu phải có ít nhất 6 ký tự, 1 chữ cái và 1 chữ số"
      //     );
      //     setCheckSendOTP(false);
      //   }
    }
  };
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  useEffect(() => {
    // Nếu có thêm path sau /reset-password/, thì dotSelected = 2
    const hasPathParam = location.pathname.split("/").length > 2;

    if (hasPathParam) {
      setDotSelected(2);
    }
  }, [location.pathname]);
  return (
    <>
      <div className={styles.container}>
        <div className={styles.container_sign_in}>
          <div className={styles.container_forgot}>
            <div className={styles.container_back}>
              <div
                onClick={handleNavigation}
                className={`${style.icon} ${style.item_text}`}
              >
                <img
                  src="/images/cooperate/arrow-narrow-left.svg"
                  className={style.icon}
                />
              </div>
              <p className={style.font_regular}>Quay lại</p>
            </div>
            {/* title và dot */}
            <div className={styles.container_dot_title}>
              <p
                className={style.font_bold_30px}
                style={{ textAlign: "center", marginTop: "64px" }}
              >
                {dotSelected == 1
                  ? "Nhập Email đăng ký "
                  : dotSelected == 2
                  ? "Nhập lại mật khẩu"
                  : ""}
              </p>
              <div className={styles.container_dot}>
                <div
                  className={
                    dotSelected == 1 ? styles.dot_selected : styles.dot
                  }
                ></div>
                <div
                  className={
                    dotSelected == 2 ? styles.dot_selected : styles.dot
                  }
                ></div>
              </div>
            </div>
            {/* Nhập email bước 1 */}
            {dotSelected == 1 && (
              <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Nhập Email *"
                className={styles.input}
                style={{
                  marginBottom: "32px",
                  color: errorMessage ? "#DB242D" : "#1C1B1E",
                  borderColor: errorMessage ? "#DB242D" : "#1C1B1E",
                }}
              />
            )}
            {showSuccessPopup && (
              <div className={styles.overlay}>
                <div className={styles.modal}>
                  <div className={styles.confirm}>
                    <img src="/images/confirm.svg" className={style.icon} />
                    <p className={style.font_semibold_14px_gray9}>
                      Đặt lại mật khẩu thành công
                    </p>
                    <p className={style.font_regular}>
                      Vui lòng kiểm tra email để lấy liên kết đặt lại mật khẩu.
                    </p>
                  </div>
                  <div className={styles.container_cancel_confirm}>
                    <button
                      className={`${style.item_text} ${styles.btn_sign_in_b3}`}
                      onClick={() => setShowSuccessPopup(false)}
                    >
                      Đóng
                    </button>
                  </div>
                </div>
              </div>
            )}
            {/* Nhập lại mật khẩu bước 3 */}
            {dotSelected == 2 && (
              <>
                <div className={styles.container_input_pass}>
                  <input
                    type={isEyeVisible1 ? "text" : "password"}
                    placeholder="Mật khẩu mới *"
                    className={styles.input_pass}
                    value={password}
                    onChange={handlePasswordChange}
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
                <div className={styles.container_input_pass}>
                  <input
                    type={isEyeVisible2 ? "text" : "password"}
                    placeholder="Nhập lại mật khẩu *"
                    className={styles.input_pass}
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                  <img
                    src={
                      isEyeVisible2
                        ? "/images/cooperate/eye.svg"
                        : "/images/cooperate/eye-off.svg"
                    }
                    className={`${style.icon} ${style.item_bar}`}
                    onClick={toggleIcon2}
                  />
                </div>
              </>
            )}
            {/* btn xác nhận */}
            <div
              className={`${styles.button_sign_in} ${style.item_text}`}
              onClick={handleClickConfirm}
            >
              <p className={style.font_medium_white}>Xác nhận</p>
              <div>{isLoading ? <Loading /> : ""}</div>
            </div>
            {/* Bước 3 thành công */}
            {isModalVisible && (
              <>
                <div className={styles.overlay}>
                  <div className={styles.modal}>
                    <div className={styles.confirm}>
                      <img
                        src="/images/cooperate/confirm.svg"
                        className={style.icon}
                      />
                      <p className={style.font_semibold_14px_gray9}>
                        Cập nhật mật khẩu thành công
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
                        href="/sign-in"
                        className={`${styles.btn_sign_in_b3} ${style.item_text}`}
                      >
                        <p className={style.font_medium_16px_logo}>Đăng nhập</p>
                      </a>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
          <div
            className={styles.container_img_sign}
            style={{
              backgroundImage: backgroundImage,
            }}
          >
            <img
              src="/images/cooperate/logo.png"
              alt="logo"
              className={styles.logo}
            />
            <div className={styles.container_btn_sign_in}>
              <p className={style.font_medium_18px_white}>
                Bạn chưa có tài khoản?
              </p>
              <a
                href="/sign-up"
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
            duration={3000}
            check={!checkSendOTP ? 0 : 1}
            onClose={() => setErrorMessage("")}
          />
        )}
      </div>
    </>
  );
}
