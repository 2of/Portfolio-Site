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
            // Check if the link is a URL (external)
            const isExternal = /^https?:\/\//.test(link);
            const isEmail = /^mailto:/.test(link); // Check if it's already a mailto link
            const isEmailAddress = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(link); // Check if it's a valid email address

            if (isExternal) {
                // Open in a new tab for external URL
                window.open(link, '_blank');
            } else if (isEmail || isEmailAddress) {
                // Handle email links
                const mailtoLink = isEmail ? link : `mailto:${link}`; // Add mailto: prefix if missing
                window.location.href = mailtoLink; // Use window.location.href to open the email client
            } else {
                // Navigate internally using React Router for internal routes
                navigate(link);
            }
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