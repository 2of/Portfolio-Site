import React from "react";
import useScreenSize from "../utils/screensize";
import { GlobalProvider } from "../contexts/GlobalContext";
import styles from './HomePage2.module.scss'; // Import SCSS module
// import { HeroSection } from "./HeroSection"; // Import the reusable HeroSection
import getIcon from "../utils/Iconifier";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import { useProjects } from "../contexts/ContentContext";
import ProgrammerSVG from '../assets/svgs/undraw_programmer_raqr.svg';
import dogsvg from "../assets/svgs/DrawKit_Vector_Illustrations_Dog call.svg"




export const HomePage2 = () => {
  const screenSize = useScreenSize()
  const socialLinks = [
    { icon: "linkedin", color: "#0a66c2" },
    { icon: "github", color: "#6f42c1" },
    { icon: "mail", color: "#FF7F50" },
  ];

  return (
    <div className={`${styles.HomePageContainer } ${screenSize==='sm' ? styles.sm : styles.lg}`}>
      {/* Hero Section */}
      <div className={styles.HeroSection}>
        {/* Hero Art (SVG or Image) */}
        <div className={`${styles.HeroArt} ${styles.svgPositionCenter}`}>
          <img src={dogsvg} alt="Hero Art" />
        </div>

        {/* Hero Text Section */}
        <div className={styles.HeroTextSection}>
          <div className={styles.HeroTitle}>Howdy</div>
          <div className={styles.HeroSubtitle}>
            <p>This is my little project catalogue</p>
          </div>
          <div className={styles.HeroP}>
            <p>
              This site is a little WIP, but have a poke around. Check out Projects below. The site is written in React, and I've had some deployment issues, so if something is broken, that's it. I know of a few bugs, and there's a lot of CSS issues around at the moment.
            </p>
          </div>

          {/* Social Links */}
          <ul className={styles.socials}>
            {socialLinks.map((link, index) => (
              <li
                key={index}
                // style={{ background: link.color }}
              >
                {getIcon(link.icon)}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};