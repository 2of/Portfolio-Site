import React, { useRef, useState, useEffect } from "react";
import useScreenSize from "../../utils/screensize";
import { useGlobalContext } from "../../contexts/GlobalContext";
import styles from "./HomePage2.module.scss"; // Import SCSS module
import ColumnWithSections from "../../components/Column/ColumnWithSections";
import { Modal } from "../../components/Modal";
import { HeroCell } from "./Hero";
import { AboutCell } from "./About";
import { FooterCell } from "./Footer";
import PageDots from "../../components/UI/PageDots";
import { useProjects } from "../../contexts/ContentContext";

export const HomePage2 = () => {
  const screenSize = useScreenSize();
  const [showModal, setShowModal] = useState(false);
  const { getLink } = useGlobalContext();
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [scrollPositions, setScrollPositions] = useState({});
  const { getArticle } = useProjects();
  const sections = [HeroCell, AboutCell, FooterCell];

  const calculateScrollPositions = () => {
    if (!scrollContainerRef.current) return;
    const { clientHeight } = scrollContainerRef.current;
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

  useEffect(() => {
    const handleScroll = () => calculateScrollPositions();

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);
      calculateScrollPositions(); // Ensure correct initial state
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  const handlePageDotClick = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeatClick = () => {
    setShowModal(true);
  };

  // ✅ Safe calculation for currentPage index
  const currentPageIndex =
    Object.keys(scrollPositions).length > 0
      ? Object.keys(scrollPositions)
          .map(Number)
          .reduce((a, b) =>
            Math.abs(scrollPositions[a]) < Math.abs(scrollPositions[b]) ? a : b
          )
      : 0;

  return (
    <div className={`${styles.HomePageContainer} ${screenSize === "sm" ? styles.sm : styles.lg}`}>
      <div className={styles.ScrollContainer} ref={scrollContainerRef}>
        {sections.map((Component, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`${styles.sm_fp} ${styles.container}`}
          >
            {Component === HeroCell ? (
              <HeroCell
                sz={screenSize}
                scrollPosition={scrollPositions[index] ?? 0}
                featureButtonCallback={handleFeatClick}
              />
            ) : (
              <Component sz={screenSize} scrollPosition={scrollPositions[index] ?? 0} />
            )}
          </div>
        ))}
      </div>

      {screenSize !== "sm" && (
        <PageDots
          n_dots={sections.length}
          currentPage={currentPageIndex}
          callback={handlePageDotClick}
        />
      )}

      {showModal && (
        <Modal
          component={
            <ColumnWithSections
              data={getArticle("geolocate1", "large")}
              style="modern"
              topDivideDouble={true}
              twoColumns={true}
              AsArticle={true}
            />
          }
          onClose={() => setShowModal(false)}
          size="large"
          title={"Project Features"}
          isOpen={showModal}
        />
      )}
    </div>
  );
};