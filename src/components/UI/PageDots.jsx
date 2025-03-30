import React, { useEffect, useState } from "react";
import styles from "./PageDot.module.scss";
import { TooltipProvider, useTooltip } from "../../contexts/tooltip"
const PageDots = ({ n_dots = 12, currentPage = 0, callback }) => {
  const [activeIndex, setActiveIndex] = useState(currentPage);
    const { showTooltip, hideTooltip } = useTooltip();
  // Sync with external currentPage prop
  useEffect(() => {
    setActiveIndex(currentPage);
  }, [currentPage]);

  const handleClick = (index) => {
    setActiveIndex(index);
    callback?.(index); // Notify parent component to scroll
  };

  return (
    <div className={`${styles.pageDotContainer} doubleBorderRound`}>
      <div className={styles.dotContainer}>
        {Array.from({ length: n_dots }).map((_, index) => (
          <div
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.active : ""}`}
            onClick={() => handleClick(index)}
            onMouseEnter={(e) => showTooltip(`Snap to Page ${index + 1} of ${n_dots}`, e)}
            onMouseLeave={hideTooltip}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PageDots;