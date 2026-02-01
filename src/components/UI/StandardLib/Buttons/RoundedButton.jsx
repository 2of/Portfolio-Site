import styles from "./styles/RoundedButton.module.scss"
import getIcon from "../../../../utils/Iconifier.jsx"

export const RoundedButton = ({
    label,
    icon,
    size,
    variant,
    disabled,
    tooltip,
    onClick,
    fixedwhitemode,
    fixeddarkmode,
    external
}) => {
    const externalIcon = external ? getIcon("external") : null;

    const roundedClasses = [
        styles.rounded,
        fixedwhitemode && styles.fixedWhiteMode,
        fixeddarkmode && styles.fixedDarkMode
    ].filter(Boolean).join(' ');

    return (
        <div
            type="button"
            className={roundedClasses}
            disabled={disabled}
            title={tooltip}
            onClick={onClick}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {label && <span className={styles.label}>{label}</span>}
            {externalIcon && (
                <span className={styles.externalCornerIcon}>{externalIcon}</span>
            )}
        </div>
    );
};
