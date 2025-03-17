import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { useTooltip } from "../../contexts/tooltip";
import styles from "./Button.module.scss";

const validTypes = ['drop', 'link', 'text-only', 'basic_Expand']; // Include 'basic_Expand'
export const StandardButton = ({
    label = "no label",
    callback,
    type = 'drop', // Default to 'drop' type
    tooltip,
    link,
    icon,
}) => {
    const { showTooltip, hideTooltip } = useTooltip();
    const navigate = useNavigate(); // Use the useNavigate hook

    // Validate 'type' prop to ensure it's one of the valid types
    const safeType = validTypes.includes(type) ? type : 'drop';

    // Set button class based on 'type' using switch statement
    const setButtonClass = () => {
        switch (safeType) {
            case 'link':
                return `${styles.button} ${styles.link}`;
            case 'text-only':
                return `${styles.button} ${styles.textOnly}`;
            case 'basic_Expand':
                return `${styles.button} ${styles.basic_Expand}`;
            case 'drop':
            default:
                return `${styles.button} ${styles.drop}`;
        }
    };

    const handleClick = () => {
        if (link) {
            navigate(link); // Use navigate for programmatic navigation
        }
        if (callback) {
            callback(); // Execute the callback
        }
    };

    // Conditionally show tooltip only if 'tooltip' prop is provided
    const handleMouseMove = (e) => {
        if (tooltip) {
            showTooltip(tooltip, e);
        }
    };

    return (
        <div
            onMouseMove={handleMouseMove}
            onMouseLeave={hideTooltip}
            onClick={handleClick} // Attach the handleClick function
            className={setButtonClass()} // Apply the dynamically set class
        >
            {label}
            {icon && <p className={styles.icon}>{icon}</p>} {/* Render icon conditionally */}
        </div>
    );
};