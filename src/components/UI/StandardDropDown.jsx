import React, { useState, useEffect } from "react";
import styles from "./Dropdown.module.scss";
import { useTooltip } from "../../contexts/tooltip";

export const StandardDropdown = ({
  options = [],
  selectedValue,
  onChange,

  name = "dropdown",
  tooltip,
  variant = "default", // 'default' or 'icon' (for future use)
}) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const [wiggling, setWiggling] = useState(false);

  const handleMouseMove = (e) => {
    if (tooltip) {
      showTooltip(tooltip, e);
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    onChange(value);

    const selectedOption = options.find((opt) => opt.value === value);
    if (variant === "icon" && !selectedOption?.icon) {
      setWiggling(true);
    } else {
      setWiggling(false);
    }
  };

  useEffect(() => {
    if (wiggling) {
      const timeout = setTimeout(() => {
        setWiggling(false);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [wiggling]);

  return (
    <div
      className={`${styles.dropdownContainer} ${styles[variant]} flatStyleShadow_NO_INTERACT standardMouseOverBounce`}
      onMouseMove={handleMouseMove}
      onMouseLeave={hideTooltip}
    >
    

      <select
        name={name}
        value={selectedValue}
        onChange={handleChange}
        className={`${styles.dropdownSelect} ${wiggling ? "" : ""}`}
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};