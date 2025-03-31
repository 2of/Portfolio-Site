import React, { useRef, useState, useEffect } from "react";
import useScreenSize from "../../utils/screensize";
import { useGlobalContext } from "../../contexts/GlobalContext";
import styles from './HomePage2.module.scss'; // Import SCSS module
import ColumnWithSections from "../../components/Column/ColumnWithSections";
import HomeData from "../../assets/HomeContent.json";
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
  const sectionRefs = useRef([]); // Stores references to each section
  const [currentPage, setCurrentPage] = useState(0);
  const { getArticle, getListOfArticles } = useProjects();
  const sections = [HeroCell, AboutCell, FooterCell]; // Ensure order matches PageDots count

  useEffect(() => {
    const handleScroll = () => {
      if (scrollContainerRef.current) {
        const { scrollTop, clientHeight } = scrollContainerRef.current;
        const newPage = Math.round(scrollTop / clientHeight);
        setCurrentPage(newPage);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (scrollContainer) {
        scrollContainer.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Handle clicking on a dot to scroll to the corresponding section
  const handlePageDotClick = (index) => {
    if (sectionRefs.current[index]) {
      sectionRefs.current[index].scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleFeatClick = () => {

    setShowModal(true);
  };

  return (
    <div className={`${styles.HomePageContainer} ${screenSize === 'sm' ? styles.sm : styles.lg}`}>

      <div className={styles.ScrollContainer} ref={scrollContainerRef}>
        {sections.map((Component, index) => (
          <div
            key={index}
            ref={(el) => (sectionRefs.current[index] = el)}
            className={`${styles.sm_fp} ${styles.container}`}
          >
            {Component === HeroCell ? (
              <HeroCell sz={screenSize} scrollPosition={currentPage} featureButtonCallback={handleFeatClick} />
            ) : (
              <Component sz={screenSize} scrollPosition={currentPage} />
            )}
          </div>
        ))}
      </div>
        {screenSize !== 'sm' && 
        
        <PageDots n_dots={sections.length} currentPage={currentPage} callback={handlePageDotClick} />

        }

      {showModal && (
        <Modal
          component={<ColumnWithSections data={getArticle("geolocate1", "large")}
           style="modern" topDivideDouble={true} twoColumns={true} AsArticle={true} />}
          onClose={() => setShowModal(false)}
          size="large"
          title={"Project Features"}
          isOpen={showModal}
        />
      )}
    </div>
  );
};