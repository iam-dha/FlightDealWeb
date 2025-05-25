import React, { useState, useEffect } from "react";
import styles from "../styles/alert.module.css";

const Alert = ({ message, duration = 3000, check = 1, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Kích hoạt thông báo khi component render
    setVisible(true);

    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [message, duration, onClose]);
  const formattedMessage = message
    ? message.replace(/\.(?=\s|$)/g, ".<br />")
    : "Thông báo!";
  return (
    <div
      className={`${styles.alertContainer} ${
        visible ? styles.show : styles.hide
      }`}
    >
      <div
        className={`${styles.notification} ${
          visible ? styles.show : styles.hide
        }`}
        style={{
          backgroundColor: check == 1 ? "#D4EDDA" : "#F8D7DA",
          borderColor: check == 1 ? "#155724" : "#F28F1E",
          backdropFilter: "blur(5px)",
        }}
      >
        <div className={styles.container_icon_title}>
          <div
            className={styles.container_icon}
            style={{
              backgroundColor:
                check == 1 ? "rgba(117,255,117,0.25)" : "rgba(255,248,246,0.5)",
            }}
          >
            <img
              src={
                check == 1
                  ? "/images/alert_success.svg"
                  : "/images/alert_error1.svg"
              }
            />
          </div>
          <div className={styles.container_title}>
            <p
              className={styles.title}
              style={{ color: check == 1 ? "#155724" : "#A4000F" }}
            >
              {check == 1 ? "Thành công" : "Lỗi"}
            </p>
            <p
              className={styles.text}
              style={{ color: check == 1 ? "#155724" : "#A4000F" }}
              dangerouslySetInnerHTML={{ __html: formattedMessage }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Alert;
