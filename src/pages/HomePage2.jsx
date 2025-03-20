import React, { useRef, useState } from "react";
import useScreenSize from "../utils/screensize";
import { useGlobalContext } from "../contexts/GlobalContext";
import styles from './HomePage2.module.scss'; // Import SCSS module
import getIcon from "../utils/Iconifier";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import dogsvg from "../assets/svgs/DrawKit_Vector_Illustrations_Dog call.svg";
import { StandardButton } from "../components/UI/StandardButton";
import HomeData from "../assets/HomeContent.json";
import { Modal } from "../components/Modal";

// Hero Section Component
const HeroSection = ({ handleFeatClick, getLink }) => {
  const socialLinks = [
    { icon: "linkedin", color: "#0a66c2" },
    { icon: "github", color: "#6f42c1" },
    { icon: "mail", color: "#FF7F50" },
  ];

  return (
    <div className={`${styles.sm_fp} ${styles.ContentSection} ${styles.Hero}`}>
      {/* Hero Art (SVG or Image) */}
      <div className={`${styles.HeroArt} ${styles.svgPositionCenter}`}>
        <img src={dogsvg} alt="Hero Art" />
      </div>

      {/* Hero Text Section */}
      <div className={styles.HeroTextSection}>
        <div className={styles.HeroTitle}>Howdy</div>
        <div className={styles.HeroSubtitle}>
          <p>I'm Noah, and this is my little project catalogue</p>
        </div>
        <div className={styles.HeroP}>
          <p>
            This site is a little WIP, but have a poke around. Check out Projects below. The site is written in React, and I've had some deployment issues, so if something is broken, that's it. I know of a few bugs, and there's a lot of CSS issues around at the moment.
          </p>
        </div>
        <div className={styles.buttonContainer}>
          <StandardButton
            label="Project Feature"
            tooltip={"Open popup"}
            type="basic_Expand"
            icon={getIcon("projects")}
            callback={handleFeatClick}
          />
          <StandardButton
            label="Résumé"
            tooltip={"Navigate to resume"}
            type="basic_Expand"
            icon={getIcon("")}
            link={getLink("resume")}
          />
        </div>
        <div className={styles.HeroP}>
          <p>
            Feel free to reach out {getIcon("smile")}
          </p>
        </div>
        {/* Social Links */}
        <ul className={styles.socials}>
          {socialLinks.map((link, index) => (
            <li key={index}>
              <StandardButton
                label=""
                tooltip={link.icon}
                type="social"
                icon={getIcon(link.icon)}
                link={getLink(link.icon)}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

// About Me Section Component
const AboutSection = () => {
  return (
    <div className={`${styles.sm_fp} ${styles.ContentSection} ${styles.AboutPage}`}>
      {/* Qualifications Section */}
      <div className={`${styles.Quals} ${styles.svgPositionCenter}`}>
        <div className={styles.QualsList}>
          <div className={`${styles.QualItem} ${styles.flatStyleShadow_NO_INTERACT}`}>
            <strong>Bachelor's in Computer Science</strong> [2020] [University of Canterbury]
          </div>
          <div className={`${styles.QualItem} ${styles.flatStyleShadow_NO_INTERACT}`}>
            <strong>Master of Artificial Intelligence</strong> [2025] [University of Canterbury]
          </div>
        </div>
        <div className={styles.QualsList}>
          <div className={`${styles.QualItem} ${styles.flatStyleShadow_NO_INTERACT}`}>
            <strong>Bachelor's in T2 Science</strong> [2020] [University of Canterbury]
          </div>
          <div className={`${styles.QualItem} ${styles.flatStyleShadow_NO_INTERACT}`}>
            <strong>Master of T2 Intelligence</strong> [2025] [University of Canterbury]
          </div>
        </div>
      </div>

      {/* About Me Text Section */}
      <div className={styles.AboutTextSection}>
        <div className={styles.HeroTitle}>About Me</div>
        <div className={styles.HeroSubtitle}>
          <p>I've done a bunch of stuff</p>
        </div>
        <div className={styles.HeroP}>
          <p>
            I'm Noah—AI grad, IT admin, and full-stack developer. I love building things,
            solving problems, and exploring new tech. Oh, and coffee. Lots of coffee.
          </p>
        </div>
      </div>
    </div>
  );
};

// Main HomePage2 Component
export const HomePage2 = () => {
  const screenSize = useScreenSize();
  const [showModal, setShowModal] = useState(false);
  const { getLink } = useGlobalContext();

  const handleFeatClick = () => {
    setShowModal(true);
  };

  return (
    <div className={`${styles.HomePageContainer} ${screenSize === 'sm' ? styles.sm : styles.lg}`}>
      {/* Hero Section */}
      <div className={styles.contentContainer}>
        <HeroSection handleFeatClick={handleFeatClick} getLink={getLink} />
        {/* <AboutSection /> */}
      </div>

      {/* Modal */}
      {showModal && (
        <Modal
          component={<ColumnWithSections data={HomeData[0]} style="newspaper" topDivideDouble={true} twoColumns={true} />}
          onClose={() => setShowModal(false)}
          size="large"
          title={"Project Features"}
          isOpen={showModal}
        />
      )}
    </div>
  );
};