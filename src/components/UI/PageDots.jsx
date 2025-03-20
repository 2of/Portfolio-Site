import React, { useState } from "react";
import styles from "./PageDot.module.scss";

export const PageDots = ({ n_dots = 3, callback }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleClick = (index) => {
    setActiveIndex(index);
    callback?.(index);
  };

  return (
    <div className={`${styles.pageDotContainer} doubleBorderRound`}>
      <div className={styles.dotContainer}>
        {Array.from({ length: n_dots }).map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => handleClick(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};