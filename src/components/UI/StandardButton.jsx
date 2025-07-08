import React from "react";
import { useNavigate } from "react-router-dom";
import { useTooltip } from "../../contexts/tooltip";
import getIcon from "../../utils/Iconifier";
import styles from "./Button.module.scss";

const validTypes = [
  "drop",
  "link",
  "text-only",
  "basic_Expand",
  "withlabel",
  "basic_small",
  "article",
];

export const StandardButton = ({
  label = "no label",
  callback,
  type = "drop",
  tooltip,
  link,
  icon,
  disable = false,
  headertitle = "",
  external = false,
  fillContainer = false, // < lets go
}) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const navigate = useNavigate();
  const safeType = validTypes.includes(type) ? type : "drop";
  const externalIcon = external ? getIcon("external") : null;

  const setButtonClass = () => {
    const baseClass = styles.button;
    const typeClass = styles[safeType] || styles.drop;
    const disabledClass = disable ? styles.disabled : "";
    const fillClass = fillContainer ? styles.fillContainer : ""; // <-- apply class
    return `${baseClass} ${typeClass} ${disabledClass} ${fillClass}`.trim();
  };

  const handleClick = () => {
    if (disable) return;

    if (link) {
      const isExternal = /^https?:\/\//.test(link);
      const isEmail = /^mailto:/.test(link);
      const isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(link);

      if (isExternal) {
        window.open(link, "_blank");
      } else if (isEmail || isEmailAddress) {
        const mailtoLink = isEmail ? link : `mailto:${link}`;
        window.location.href = mailtoLink;
      } else {
        navigate(link);
      }
    }

    if (callback) callback();
  };

  const handleMouseMove = (e) => {
    if (!disable && tooltip) {
      showTooltip(tooltip, e);
    }
  };

  const renderContent = () => {
    const Label = label && <span className={styles.label}>{label}</span>;
    const Icon = icon && <span className={styles.icon}>{icon}</span>;

    switch (safeType) {
      case "text-only":
        return <>{Label}</>;

      case "link":
        return (
          <>
            {Icon}
            {Label}
          </>
        );

      case "basic_Expand":
        return (
          <div className={`${styles.expandWrapper}`}>
            {Label}
            {Icon}
          </div>
        );

      case "article":
        return (
          <div className={styles.expandWrapper}>
            {headertitle && <span>{headertitle}</span>}
            {Icon}
            {Label}
          </div>
        );

      case "withlabel":
        return (
          <div className={styles.expandWrapper}>
            {headertitle && <span>{headertitle}</span>}
            {Label}
            {Icon}
          </div>
        );

      case "drop":
      default:
        return (
          <>
            {Label}
            {Icon}
          </>
        );
    }
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      onMouseLeave={hideTooltip}
      onClick={handleClick}
      className={`${setButtonClass()} standardMouseOverBounce`}
      role="button"
      aria-disabled={disable}
      tabIndex={disable ? -1 : 0}
      style={{ position: "relative" }}
    >
      {renderContent()}
      {externalIcon && (
        <span className={styles.externalCornerIcon}>{externalIcon}</span>
      )}
    </div>
  );
};