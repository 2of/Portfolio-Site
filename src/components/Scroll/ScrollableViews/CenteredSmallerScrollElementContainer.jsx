import React, { useRef, useState, useEffect, useCallback } from "react";
import styles from "./CenteredSmallerScrollElementContainer.module.scss";
import PageDots from "../../UI/PageDots";

export const CenteredSmallerScrollElementContainer = ({ children }) => {
  const containerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [currentPage, setCurrentPage] = useState(0);

  const childArray = React.Children.toArray(children);
  const childCount = childArray.length;

  // Scroll event handler to determine current page
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

    // Cleanup
    return () => {
      el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Callback for page dot click
  const handlePageDotClick = useCallback((index) => {
    const section = sectionRefs.current[index];
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, []);

  return (
    <>
      <div className={styles.DotContainer}>
        <PageDots
          n_dots={childCount}
          currentPage={currentPage}
          callback={handlePageDotClick}
        />
      </div>

      <div className={styles.outerWrapper}>
      {/* <div className={styles.topFade}/> */}
        <div ref={containerRef} className={styles.scrollContainer}>

       
          <div>
            {" "}
            {/* This is the new wrapper div */}
            {/* Fades inside scroll container */}
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
      {/* <div className={styles.bottomFade}/> */}
             
      </div>
    </>
  );
};
