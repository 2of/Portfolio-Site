import React from "react";
import styles from "./styles/MiscButtons.module.scss";

export const TextButton = ({ label, icon, onClick, className = "", tooltip, ...props }) => {
    return (
        <button
            className={`${styles.TextButton} ${className}`}
            onClick={onClick}
            title={tooltip}
            {...props}
        >
            {icon && <span className="icon">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
};

export const RichButton = ({ label, icon, onClick, className = "", tooltip, ...props }) => {
    return (
        <button
            className={`${styles.RichButton} ${className}`}
            onClick={onClick}
            title={tooltip}
            {...props}
        >
            {icon && <span className="icon">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
};

export const NavButton = ({ label, icon, onClick, className = "", tooltip, active, ...props }) => {
    return (
        <button
            className={`${styles.NavButton} ${active ? styles.active : ""} ${className}`}
            onClick={onClick}
            title={tooltip}
            {...props}
        >
            {icon && <span className="icon">{icon}</span>}
            {label && <span>{label}</span>}
        </button>
    );
};
