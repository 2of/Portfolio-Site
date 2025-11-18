import React from "react";
import style from "../styles/toggle.module.scss";

const legacyVariantMap = {
  box: style.box,
  pill: style.pill,
  largepill: style.largepill,
  legacy_box: style.box,
  legacy_pill: style.pill,
  legacy_largepill: style.largepill,
};

const modernVariantMap = {
  modern: style.variantModern,
  minimal: style.variantMinimal,
  outline: style.variantOutline,
  glass: style.variantGlass,
  neon: style.variantNeon,
  modern_unfilled: style.variantModernUnfilled,
  basic_small: style.variantBasicSmall,
  utility: style.variantUtility,
  soft: style.variantSoft,
};

const StandardToggle = ({
  type = "box",
  callback = () => {},
  firsticon: FirstIcon,
  secondicon: SecondIcon,
  checked = false,
  disabled = false,
  ariaLabel = "Standard toggle",
  className = "",
}) => {
  const isLegacyType = !!legacyVariantMap[type];
  const variantClass =
    legacyVariantMap[type] ||
    modernVariantMap[type] ||
    legacyVariantMap.box;

  const rootClasses = [
    isLegacyType ? style.toggleContainer : style.toggleBase,
    variantClass,
    disabled ? style.isDisabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const handleClick = () => {
    if (disabled) return;
    if (typeof callback === "function") {
      const result = callback(!checked);
      if (typeof result === "function") {
        result();
      }
    }
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={rootClasses}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="switch"
      aria-checked={checked}
      aria-label={ariaLabel}
      tabIndex={disabled ? -1 : 0}
      data-variant={type}
    >
      <input
        type="checkbox"
        className={style.toggleCheckbox}
        checked={checked}
        readOnly
        tabIndex={-1}
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