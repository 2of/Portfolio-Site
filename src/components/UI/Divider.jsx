// Divider.jsx
import styles from "./styles/Divider.module.scss";

export const Divider = ({
  variant = "double",
  icon = "◆",
  animated = false,
  spacing = "medium",
}) => {
  return (
    <div
      className={`${styles.divider} ${styles[variant]} ${styles[spacing]} ${animated ? styles.animated : ""}`}
      role="separator"
      aria-hidden="true"
    >
      <span className={styles.line} />
      {icon && <span className={styles.icon}>{icon}</span>}
      <span className={styles.line} />
    </div>
  );
};

// -
