import React from "react";
import PropTypes from "prop-types";
import styles from "./Column.module.scss";
import clsx from "clsx";

const ColumnComponentContainer = ({
  title,
  subtitle,
  colTitle,
  component,
  overlayTitle = true,
  fullLink = false,
  topDivider = false,
  leftDivider = true,
  topDivideDouble = false,
}) => {
  return (
    <div
      className={clsx(
        styles.column,
        styles.containerColumn,
        {
          [styles.overlayTitle]: overlayTitle,
          [styles.fullLink]: fullLink,
          [styles.dividerTop]: topDivider,
          [styles.dividerLeft]: leftDivider,
          [styles.dividerTopDouble]: topDivideDouble,
        }
      )}
    >
      {/* Column Title */}
      {colTitle && <div className={styles.columnTitle}>{colTitle}</div>}

      {/* Title */}
      {title && <h2 className={styles.title}>{title}</h2>}

      {/* Subtitle */}
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

      {/* Content Area */}
      <div className={styles.content}>
        <div className={styles.componentBox}>{component}</div>
      </div>
    </div>
  );
};

ColumnComponentContainer.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  colTitle: PropTypes.string,
  component: PropTypes.node,
  overlayTitle: PropTypes.bool,
  fullLink: PropTypes.bool,
  topDivider: PropTypes.bool,
  leftDivider: PropTypes.bool,
  topDivideDouble: PropTypes.bool,
};

export default ColumnComponentContainer;
