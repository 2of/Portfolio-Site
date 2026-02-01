import React from "react";
import styles from "./styles/DevStyleButton.module.scss";

export const DevStyleButton = ({
    label,
    icon,
    onClick,
    variant = "dev", // dev, dev_simple, dev_highlight
    className = "",
    tooltip,
    ...props
}) => {
    // Map variant prop to SCSS class
    let variantClass = "";
    if (variant === "dev_simple") variantClass = styles.simple;
    if (variant === "dev_highlight") variantClass = styles.highlight;
    if (variant === "dev_icon_only_end_card") variantClass = styles.endcard;
    return (
        <button
            className={`${styles.DevStyleButton} ${variantClass} ${className}`}
            onClick={onClick}
            title={tooltip}
            {...props}
        >
            {icon && <span className="icon">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
};
