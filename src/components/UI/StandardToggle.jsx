import React from "react";
import style from "./toggle.module.scss";

const StandardToggle = ({
  type = "box",
  callback = () => {},
  firsticon: FirstIcon,
  secondicon: SecondIcon,
  checked = false,
}) => {
  const handleClick = () => {
    if (typeof callback === "function") {
      const result = callback();
      if (typeof result === "function") {
        result();
      }
    }
  };

  return (
    <div
      className={`${type === "box" ? style.box : style.pill} ${style.toggleContainer}`}
      onClick={handleClick}
    >
      <input
        type="checkbox"
        className={style.toggleCheckbox}
        checked={checked}
        readOnly
      />
      <div className={style.toggleSlider}>
        <span className={`${style.toggleIcon} ${style.moonIcon}`}>
          {FirstIcon}
        </span>
        <span className={`${style.toggleIcon} ${style.sunIcon}`}>
          {SecondIcon}
        </span>
      </div>
    </div>
  );
};

export default StandardToggle;