import React, { useState, useEffect } from "react";
import styles from "./RadioButtons.module.scss";
import { useTooltip } from "../../contexts/tooltip";

export const StandardRadioButtons = ({
  options = [],
  selectedValue,
  onChange,
  label = "",
  name = "radio-group",
  layout = "horizontal", // 'horizontal' or 'vertical'
  tooltip,
  variant = "default",   // 'default' or 'icon'
}) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const [wigglingValue, setWigglingValue] = useState(null);

  const handleMouseMove = (e) => {
    if (tooltip) {
      showTooltip(tooltip, e);
    }
  };

  const handleChange = (value) => {
    onChange(value);

    const selectedOption = options.find((opt) => opt.value === value);
    if (variant === "icon" && !selectedOption?.icon) {
      setWigglingValue(value);
    } else {
      setWigglingValue(null);
    }
  };

  useEffect(() => {
    if (wigglingValue !== null) {
      const timeout = setTimeout(() => {
        setWigglingValue(null);
      }, 800);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [wigglingValue]);

  return (
    <div className={`${styles.radioGroup} ${styles[layout]} ${styles[variant]}`}>
      {label && <div className={styles.groupLabel}>{label}</div>}

      {options.map((opt) => {
        const isSelected = selectedValue === opt.value;
        const isWiggling = wigglingValue === opt.value;

        return (
          <label
            key={opt.value}
            className={`${styles.radioOption} ${isSelected ? styles.selected : ""}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={hideTooltip}
          >
            <input
              type="radio"
              name={name}
              value={opt.value}
              checked={isSelected}
              onChange={() => handleChange(opt.value)}
              className={variant === "icon" ? styles.invisibleRadio : ""}
            />

            {variant === "icon" ? (
              <span
                key={isWiggling ? "wiggle" : "still"}
                className={`${styles.iconWrapper} ${isWiggling ? styles.wiggleIcon : ""}`}
              >
                {opt.icon || "?"}
              </span>
            ) : (
              <>
                <span className={styles.fakeRadio}></span>
                <span className={styles.optionLabel}>{opt.label}</span>
              </>
            )}
          </label>
        );
      })}
    </div>
  );
};