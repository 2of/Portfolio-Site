import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./LandingPageScrollContainer.module.scss";
import PageDots from "../../UI/PageDots";

export const LandingPageScrollContainer = ({ children, sectionArt }) => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentPage, setCurrentPage] = useState(0);
  const childArray = React.Children.toArray(children);
  const childCount = childArray.length;

  // Scroll event handler
  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const containerTop = container.getBoundingClientRect().top;

      let closestIndex = 0;
      let smallestDistance = Infinity;

      sectionRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const distance = Math.abs(rect.top - containerTop);
        if (distance < smallestDistance) {
          smallestDistance = distance;
          closestIndex = i;
        }
      });

      setCurrentPage(closestIndex);
    };

    const el = containerRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Page dot click
  const handlePageDotClick = useCallback((index) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <div className={styles.containerWrapper}>
      {/* Left: section art */}
      <div className={styles.artWrapper}>
        {sectionArt?.[currentPage] ?? null}
      </div>

      {/* Right: scrollable content */}
      <div className={styles.contentWrapper}>
        <div className={styles.DotContainer}>
          <PageDots
            n_dots={childCount}
            currentPage={currentPage}
            callback={handlePageDotClick}
          />
        </div>

        <div className={styles.outerWrapper}>
          <div ref={containerRef} className={styles.scrollContainer}>
            {childArray.map((child, i) => (
              <div
                key={i}
                ref={(el) => (sectionRefs.current[i] = el)}
                className={styles.section}
              >
                {child}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};