import React, { useState } from "react";
import styles from "./styles/Logo.module.scss";
// import art from "../../../assets/Images/HTC_Heritage Library_Flying HighElement 5.png";
export const Logo = ({ variant = "large" }) => {
  const isLarge = variant === "large";
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => setClicked(false), 800); // reset after animation
  };

  return (
    <div
      className={`${styles.logoContainer} ${clicked ? styles.clicked : ""}`}
      onClick={handleClick}
    >
      <span className={`${styles.main} ${!isLarge ? styles.small : ""}`}>
       lunchbreak
      </span>
      <span className={`${styles.sub} ${!isLarge ? styles.small : ""}`}>
        nking
      </span>
    </div>
  );
};