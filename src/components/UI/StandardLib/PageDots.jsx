import React, { useEffect, useState } from "react";
import styles from "../styles/PageDot.module.scss";
import { useTooltip } from "../../../contexts/tooltip.jsx";

const PageDots = ({
  n_dots = 12,
  currentPage = 0,
  direction = "vertical", // "horizontal" | "vertical"
  callback,
  disable = false,
  variant = "block" // block
}) => {
  const [activeIndex, setActiveIndex] = useState(currentPage);
  const { showTooltip, hideTooltip } = useTooltip();

  useEffect(() => {
    setActiveIndex(currentPage);
  }, [currentPage]);

  const handleClick = (index) => {
    setActiveIndex(index);
    callback?.(index);
  };

  // Determine container direction class
  const dirClass =
    direction === "vertical" ? styles.vertical : styles.horizontal;

  return (
    <div className={`${styles.pageDotContainer} ${dirClass} doubleBorderRound`}>
      <div className={`${styles.dotContainer} ${dirClass}`}>
        {Array.from({ length: n_dots }).map((_, index) => {
          if (disable) {
            return (
              <div
                key={index}
                className={`${styles.dot} ${
                  index === activeIndex ? styles.active : ""
                }`}
              />
            );
          }

          return (
            <div
              key={index}
              className={`${styles.dot} ${
                index === activeIndex ? styles.active : ""
              }`}
              onClick={() => handleClick(index)}
              onMouseEnter={(e) =>
                showTooltip(`Snap to Page ${index + 1} of ${n_dots}`, e)
              }
              onMouseLeave={hideTooltip}
            />
          );
        })}
      </div>
    </div>
  );
};

export default PageDots;