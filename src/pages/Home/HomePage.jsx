import React, { useRef, useState, useEffect } from "react";
import useScreenSize from "../../utils/screensize";
import { useGlobalContext } from "../../contexts/GlobalContext";
import styles from "./HomePage.module.scss"; // Import SCSS module
// import ColumnWithSections from "../../components/Column/ColumnWithSections";
import { Modal } from "../../components/Modal";
import { HeroCell } from "./Hero";
import { AboutCell } from "./About";
import { FooterCell } from "./Footer";
import PageDots from "../../components/UI/PageDots";
import { useProjects } from "../../contexts/ContentContext";
import { Article } from "../../components/Article/Article";

export const HomePage = () => {
  const screenSize = useScreenSize();
  const [showModal, setShowModal] = useState(false);
  const { getLink } = useGlobalContext();
  const scrollContainerRef = useRef(null);
  const sectionRefs = useRef([]);
  const [scrollPositions, setScrollPositions] = useState({});
  const { getArticle,getArticleMetaData } = useProjects();
  const sections = [HeroCell, AboutCell, FooterCell];

  const calculateScrollPositions = () => {
    if (!scrollContainerRef.current) return;
    const newScrollPositions = {};
  
    const viewportTop = scrollContainerRef.current.getBoundingClientRect().top;
    const viewportMid = scrollContainerRef.current.clientHeight / 2;
  
    sectionRefs.current.forEach((section, index) => {
      if (section) {
        const rect = section.getBoundingClientRect();
        const sectionMid = rect.top - viewportTop + rect.height / 2;
        const distanceFromCenter = Math.abs(sectionMid - viewportMid);
        newScrollPositions[index] = distanceFromCenter;
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
            <Article
              metadata={getArticleMetaData("geo")}
              // style="modern"
              // topDivideDouble={true}
              // twoColumns={true}
              // AsArticle={true}
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