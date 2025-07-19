import React from "react";
import styles from './BouncyArrows.module.scss'
import getIcon from "../../utils/Iconifier";
export const BouncyArrows = ({
  numArrows = 5,
  direction = "up",
  fontWeight = 100,
  fontSize = "1rem",
  loopSpeed = 3
}) => {
  const iconName = {
    down: "downArrow",
    up: "upArrow",
    left: "leftArrow",
    right: "rightArrow",
  }[direction];

  return (
    <div
      className={styles.bouncyArrows}
      style={{ "--loop-speed": `${loopSpeed}s` }}
    >
      {Array.from({ length: numArrows }, (_, index) => (
        <span
          key={index}
          className={styles.arrow}
          style={{ fontWeight, fontSize }}
        >
          {getIcon(iconName)}
        </span>
      ))}
    </div>
  );
};