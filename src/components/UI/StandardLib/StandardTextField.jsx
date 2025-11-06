import React from "react";
import styles from "./Styles/StandardTextField.module.scss";
import { useTooltip } from "../../../contexts/tooltip.jsx";

export const StandardTextField = ({
  label = "",
  name = "textfield",
  type = "default", // ✨ 'default' | 'flat' | 'header'
  inputType = "text", // actual HTML input type
  value,
  onChange,
  placeholder = "",
  required = false,
  min,
  max,
  step,
  pattern,
  tooltip,
  disabled = false,
  readOnly = false,
  multiline = false,
  rows = 4,
}) => {
  const { showTooltip, hideTooltip } = useTooltip();

  const handleMouseMove = (e) => {
    if (tooltip) showTooltip(tooltip, e);
  };

  const fieldClass =
    type === "flat"
      ? styles.flat
      : type === "header"
      ? styles.header
      : styles.default;

  return (
    <div
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={hideTooltip}
    >
      {label && <label className={styles.label} htmlFor={name}>{label}</label>}

      {multiline ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          rows={rows}
          className={`${styles.baseField} ${fieldClass}`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={inputType}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          min={min}
          max={max}
          step={step}
          pattern={pattern}
          disabled={disabled}
          readOnly={readOnly}
          className={`${styles.baseField} ${fieldClass}`}
          autoComplete="off"
        />
      )}
    </div>
  );
};