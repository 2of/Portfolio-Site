import React from "react";
import styles from "./feedback.module.scss";

const Feedback = ({ message = "Something went wrong.", button = null }) => {
  return (
    <div className={styles.feedbackContainer}>
      <div className={styles.icon}>❌</div>
      <div className={styles.message}>{message}</div>
      {button && <div className={styles.buttonContainer}>{button}</div>}
    </div>
  );
};

export default Feedback;