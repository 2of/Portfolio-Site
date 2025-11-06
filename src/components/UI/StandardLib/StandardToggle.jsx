import React from "react";
import style from "../styles/toggle.module.scss";

const StandardToggle = ({
  type = "box", // can now be 'box', 'pill', or 'largepill'
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

  // Determine class based on type
  let typeClass = style.box;
  if (type === "pill") typeClass = style.pill;
  else if (type === "largepill") typeClass = style.largepill;

  return (
    <div
      className={`${typeClass} ${style.toggleContainer}`}
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