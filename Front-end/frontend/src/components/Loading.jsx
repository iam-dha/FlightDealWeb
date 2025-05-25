import styles from "../styles/Loading.module.css"; // Import CSS module

const Loading = () => {
  return (
    <div className={styles.smallLoadingContainer}>
      <div className={styles.spinner}></div>
    </div>
  );
};

export default Loading;
