import React from "react";
import styles from "./styles/RowView.module.scss";
import clsx from "clsx";

/**
 * rows: Array of objects:
 *  {
 *    label: string,
 *    component?: JSX.Element,
 *    paragraph?: string,
 *    disable?: boolean
 *  }
 */
const RowView = ({ rows = [], mobile }) => {
  return (
    <div className={`${styles.rowViewPlatter} ${mobile && styles.mobile }`}>
      {rows.map((item, index) => {
        const hasComponent = !!item.component;
        const hasParagraph = !!item.paragraph;

        const rowClass = clsx(styles.row, {
          [styles.justLabel]: !hasComponent && !hasParagraph,
          [styles.labelAndParagraph]: !hasComponent && hasParagraph,
          [styles.labelAndComponent]: hasComponent && !hasParagraph,
          [styles.fullRow]: hasComponent && hasParagraph,
          [styles.disabled]: item.disable,
        });

        return (
          <div key={index} className={rowClass}>
            <span className={styles.label}>{item.label}</span>
            {hasComponent && (
              <div className={styles.component}>{item.component}</div>
            )}
            {hasParagraph && (
              <p className={styles.paragraph}>{item.paragraph}</p>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RowView;