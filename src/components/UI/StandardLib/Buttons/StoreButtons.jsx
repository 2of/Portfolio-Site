import React from "react";
import styles from "./styles/StoreButtons.module.scss";
import getIcon from "../../../../utils/Iconifier";

export const StoreButton = ({ variant, label, onClick, link, className = "", ...props }) => {
    let iconName = "apple";
    let subtitle = "Download on the";
    let title = "App Store";
    let variantClass = "";

    if (variant === "googleplay") {
        iconName = "googleplay";
        subtitle = "Get it on";
        title = "Google Play";
        variantClass = styles.googleplay;
    } else if (variant === "github") {
        iconName = "github";
        subtitle = "View Source on";
        title = "GitHub";
        variantClass = styles.github;
    } else {
        // Default to App Store
        iconName = "apple";
        subtitle = "Download on the";
        title = "App Store";
    }

    // Allow overriding label/title if needed, though usually fixed for store badges
    if (label) title = label;

    return (
        <button
            className={`${styles.StoreButton} ${variantClass} ${className}`}
            onClick={onClick}
            {...props}
        >
            <div className={styles.icon}>{getIcon(iconName)}</div>
            <div className={styles.content}>
                <span className={styles.subtitle}>{subtitle}</span>
                <span className={styles.title}>{title}</span>
            </div>
        </button>
    );
};
