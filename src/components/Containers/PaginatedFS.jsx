import React, { useState, useEffect, useRef } from "react";
import styles from "./PaginatedTemplate.module.scss";
import { PageDots } from "../UI/StandardLib/PageDots.jsx";

export const PaginatedTemplate = ({ pageArray }) => {
  const [scrollPositions, setScrollPositions] = useState({});
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const sectionRefs = useRef([]);

  // Scroll calculation
  const calculateScrollPositions = () => {
    const { clientHeight } = document.documentElement;
    const newScrollPositions = {};

    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionMid = rect.top + rect.height / 2;
        const viewportMid = clientHeight / 2;

        // Normalize to range -100 (above), 0 (centered), 100 (below)
        const visibilityPercentage = ((sectionMid - viewportMid) / clientHeight) * 200;
        newScrollPositions[index] = Math.max(-100, Math.min(visibilityPercentage, 100));
      }
    });

    setScrollPositions(newScrollPositions);
  };

  // Scroll event listener
  useEffect(() => {
    const handleScroll = () => calculateScrollPositions();

    window.addEventListener("scroll", handleScroll);
    calculateScrollPositions(); // Initial calculation

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Handle page dot click to scroll to the respective section
  const handlePageDotClick = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
      setCurrentPageIndex(index); // Set current page index when navigating via dots
    }
  };

  return (
    <div className={styles.PaginatedTemplateContainer}>
      <div className={styles.ScrollContainer}>
        {pageArray.map((Component, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={styles.page}
          >
            <Component scrollPosition={scrollPositions[index] ?? 0} />
          </div>
        ))}
      </div>

      {/* Page dots for navigation */}
      <PageDots
        n_dots={pageArray.length}
        currentPage={currentPageIndex}
        callback={handlePageDotClick}
      />
    </div>
  );
};