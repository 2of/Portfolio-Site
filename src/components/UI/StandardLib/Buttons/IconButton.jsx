import styles from "./styles/IconButton.module.scss"
import getIcon from "../../../../utils/Iconifier.jsx"

export const IconButton = ({
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

    const iconClasses = [
        styles.icon_only,
        fixedwhitemode && styles.fixedWhiteMode,
        fixeddarkmode && styles.fixedDarkMode
    ].filter(Boolean).join(' ');

    return (
        <div
            type="button"
            className={iconClasses}
            disabled={disabled}
            title={tooltip}
            onClick={onClick}
        >
            {icon && <span className={styles.icon}>{icon}</span>}
            {externalIcon && (
                <span className={styles.externalCornerIcon}>{externalIcon}</span>
            )}
        </div>
    );
};
