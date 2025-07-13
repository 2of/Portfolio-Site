import React from "react";
import style from "./toggle.module.scss";

const StandardToggle = ({
  type = "box",
  callback = () => {},
  firsticon: FirstIcon,
  secondicon: SecondIcon,
  checked = false,
}) => {
  return (
    <div
      className={` ${type === "box" ? style.box : style.pill} ${
        style.toggleContainer
      }`}
      onClick={callback()}
    >
      <input
        type="checkbox"
        className={style.toggleCheckbox}
        checked={checked}
        readOnly
      />
      <div className={style.toggleSlider}>
        <span className={style.toggleIcon + " " + style.moonIcon}>
          {/* <FaMoon /> */}
          {FirstIcon}
        </span>
        <span className={style.toggleIcon + " " + style.sunIcon}>
          {/* <FaSun /> */}
          {SecondIcon}
        </span>
      </div>
    </div>
  );
};

export default StandardToggle;
