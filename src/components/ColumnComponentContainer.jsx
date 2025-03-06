import React from "react";
import styles from "./Column.module.scss";

const ColumnComponentContainer = ({ title, subtitle, colTitle, component, leftDivider}) => {
  return (
    <div className={`${styles.column}, `}>
{/* ${leftDivider ? styles.dividerLeft : "" }` */}
        { colTitle && <div className={styles.columnTitle}>{colTitle}</div>}
      {/* Title */}
      {title && <h2 className={styles.title}>{title}</h2>}

      {/* Subtitle */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {/* Component Box */}
      <div className={styles.content}> 

        
      </div>
      <div className={styles.componentBox}>
        {component}
      </div>
    </div>
  );
};

export default ColumnComponentContainer;