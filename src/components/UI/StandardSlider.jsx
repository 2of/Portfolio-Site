import React, { useRef, useState } from "react";
import styles from "./styles/Slider.module.scss";

export const StandardSlider = ({
  min = 0,
  max = 100,
  variant = "dot",
  style = {},
  className = "",
  value,
  onChange,
  steps = null,
  ...props
}) => {
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  const handleChange = (e) => {
    let newValue = Number(e.target.value);

    if (steps && steps.length > 0) {
      let closest = steps.reduce((prev, curr) =>
        Math.abs(curr - newValue) < Math.abs(prev - newValue) ? curr : prev
      );
      newValue = closest;
    }

    if (onChange) onChange(newValue);
  };

  const getThumbPosition = () => {
    if (!sliderRef.current) return 0;
    const percent = ((value - min) / (max - min)) * 100;
    const sliderWidth = sliderRef.current.offsetWidth;
    const thumbWidth = 20;
    return (percent / 100) * (sliderWidth - thumbWidth);
  };

  const variantClass = styles[`variant_${variant}`] || "";

  return (
    <div
      className={`${styles.wrapper} ${className}`}
      style={style}
    >
      {/* Slider input */}
      <input
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onMouseDown={() => setDragging(true)}
        onMouseUp={() => setDragging(false)}
        onTouchStart={() => setDragging(true)}
        onTouchEnd={() => setDragging(false)}
        className={`${styles.slider} ${variantClass}`}
        {...props}
      />

      {/* Step notches */}
      {steps && steps.length > 0 && (
        <div className={styles.stepNotches}>
          {steps.slice(1,-1).map((step) => {
            const percent = ((step - min) / (max - min)) * 100;
            return (
              <div
                key={step}
                className={styles.notch}
                style={{ left: `${percent}%` }}
              />
            );
          })}
        </div>
      )}

      {/* Custom thumb */}
      <div
        className={`${styles.customThumb} standardMouseOverBounce`}
        style={{
          left: `${getThumbPosition()}px`,
        }}
      >
        {true && <span className={styles.knobText}>{value}</span>}
      </div>
    </div>
  );
};