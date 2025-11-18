import React, { useMemo, useRef, useState } from "react";
import styles from "./Styles/Slider.module.scss";

export const StandardSlider = ({
  min = 0,
  max = 100,
  variant = "dot",
  style = {},
  className = "",
  value = 0,
  onChange,
  autoCalcStepsevery = null,
  steps = null,
  interactive = true,
  showValueBubble = true,
  ...props
}) => {
  const sliderRef = useRef(null);
  const [dragging, setDragging] = useState(false);

  const computedSteps = useMemo(() => {
    if (steps && steps.length > 0) return steps;
    if (autoCalcStepsevery) {
      const generated = [];
      for (let i = min; i <= max; i += autoCalcStepsevery) {
        generated.push(i);
      }
      if (generated[generated.length - 1] !== max) {
        generated.push(max);
      }
      return generated;
    }
    return null;
  }, [steps, autoCalcStepsevery, min, max]);

  const clampValue = (val) => {
    if (typeof val !== "number" || Number.isNaN(val)) return min;
    return Math.min(Math.max(val, min), max);
  };

  const handleChange = (e) => {
    if (!interactive) return;
    const rawValue = Number(e.target.value);
    let nextValue = clampValue(rawValue);

    if (computedSteps && computedSteps.length > 1) {
      nextValue = computedSteps.reduce((prev, curr) =>
        Math.abs(curr - nextValue) < Math.abs(prev - nextValue) ? curr : prev,
      );
    }

    if (typeof onChange === "function") {
      onChange(nextValue);
    }
  };

  const percent =
    max === min ? 0 : ((clampValue(value) - min) / (max - min)) * 100;
  const clampedPercent = Math.min(Math.max(percent, 0), 100);

  const getThumbOffset = () => {
    if (!sliderRef.current) return clampedPercent;
    const thumbWidth = Number(
      getComputedStyle(sliderRef.current).getPropertyValue("--thumb-size") ||
        32,
    );
    const correction =
      (thumbWidth / sliderRef.current.offsetWidth) * (clampedPercent - 50);
    return clampedPercent - correction;
  };

  const variantClass = styles[`variant_${variant}`] || "";
  const wrapperClasses = [
    styles.wrapper,
    dragging ? styles.isDragging : "",
    !interactive ? styles.isDisabled : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const sliderClasses = [
    styles.slider,
    variantClass,
    !interactive ? styles.sliderDisabled : "",
  ]
    .filter(Boolean)
    .join(" ");

  const sliderInlineStyle = {
    "--slider-progress": `${clampedPercent}%`,
  };

  const thumbInlineStyle = {
    left: `calc(${getThumbOffset()}% - var(--thumb-offset, 18px))`,
  };

  return (
    <div className={wrapperClasses} style={style} data-variant={variant}>
      <input
        ref={sliderRef}
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={handleChange}
        onInput={handleChange}
        onMouseDown={() => interactive && setDragging(true)}
        onMouseUp={() => interactive && setDragging(false)}
        onMouseLeave={() => interactive && setDragging(false)}
        onTouchStart={() => interactive && setDragging(true)}
        onTouchEnd={() => interactive && setDragging(false)}
        className={sliderClasses}
        style={sliderInlineStyle}
        disabled={!interactive}
        {...props}
      />

      {computedSteps && computedSteps.length > 2 && (
        <div className={styles.stepNotches} aria-hidden="true">
          {computedSteps.slice(1, -1).map((step) => {
            const stepPercent = ((step - min) / (max - min)) * 100;
            return (
              <div
                key={step}
                className={styles.notch}
                style={{ left: `${stepPercent}%` }}
              />
            );
          })}
        </div>
      )}

      {showValueBubble && (
        <div
          className={`${styles.customThumb} ${
            dragging ? styles.thumbActive : ""
          }`}
          style={thumbInlineStyle}
        >
          <span className={styles.knobText}>{clampValue(value)}</span>
        </div>
      )}
    </div>
  );
};