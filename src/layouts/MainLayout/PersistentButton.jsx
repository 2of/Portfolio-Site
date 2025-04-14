import React from "react";


export const CollapsedButton = ({ isCollapsed, onClick, showTooltip, hideTooltip }) => (
      <div
        className={`${styles.collapsedTrigger} ${isCollapsed ? styles.visible : styles.hidden}`}
        onClick={onClick}
        onMouseMove={(e) => showTooltip("Menu", e)}
        onMouseLeave={hideTooltip}
      >
        <span className={styles.menuIcon}>Menu ☰</span>
      </div>
    );