import styles from "./styles/FeaturedButton.module.scss"
import getIcon from "../../../../utils/Iconifier.jsx"

export const FeaturedButton = ({
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

    const featuredClasses = [
        styles.featured,
        fixedwhitemode && styles.fixedWhiteMode,
        fixeddarkmode && styles.fixedDarkMode
    ].filter(Boolean).join(' ');

    return (
        <div
            type="button"
            className={featuredClasses}
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
