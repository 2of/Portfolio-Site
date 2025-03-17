import React, { use, useRef, useState } from "react";
import useScreenSize from "../utils/screensize";
import { GlobalProvider, useGlobalContext } from "../contexts/GlobalContext";
import styles from './HomePage2.module.scss'; // Import SCSS module
import getIcon from "../utils/Iconifier";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import { useProjects } from "../contexts/ContentContext";
import ProgrammerSVG from '../assets/svgs/undraw_programmer_raqr.svg';
import dogsvg from "../assets/svgs/DrawKit_Vector_Illustrations_Dog call.svg"
import { StandardButton } from "../components/UI/StandardButton";
import HomeData from "../assets/HomeContent.json";
import { Modal } from "../components/Modal";
import { useNavigate } from "react-router-dom";

export const HomePage2 = () => {
  const screenSize = useScreenSize();
  const socialLinks = [
    { icon: "linkedin", color: "#0a66c2" },
    { icon: "github", color: "#6f42c1" },
    { icon: "mail", color: "#FF7F50" },
  ];

  // Create a reference for the section you want to scroll to
  const featuresSectionRef = useRef(null);
  const [showModal, setShowModal] = useState(false)
  const handleFeatClick = () => {
    // alert("TST")
    // Scroll to the target section
    setShowModal(true)
    if (featuresSectionRef.current) {
      // featuresSectionRef.current.scrollIntoView({
      //   behavior: "smooth",
      //   block: "start",
      // });
    }
  };
  const {getLink} = useGlobalContext()
  console.log(getLink("linkedin"))
  const navigate = useNavigate;
//   const handleResumeClick = () => { 
//     alert("TEST");
//     window.open('https://github.com/2of/2of/blob/main/docs/CV_all.pdf', '_blank');  // Open link in new tab
// };
  return (
    <div className={`${styles.HomePageContainer} ${screenSize === 'sm' ? styles.sm : styles.lg}`}>
      {/* Hero Section */}
      <div className={`${styles.sm_fp} ${styles.HeroSection} `}>
        {/* Hero Art (SVG or Image) */}
        <div className={`${styles.HeroArt} ${styles.svgPositionCenter}`}>
          <img src={dogsvg} alt="Hero Art" />
        </div>

        {/* Hero Text Section */}
        <div className={styles.HeroTextSection}>
          <div className={styles.HeroTitle}>Howdy</div>
          <div className={styles.HeroSubtitle}>
            <p>I'm Noah and is my little project catalogue</p>
          </div>
          <div className={styles.HeroP}>
            <p>
              This site is a little WIP, but have a poke around. Check out Projects below. The site is written in React, and I've had some deployment issues, so if something is broken, that's it. I know of a few bugs, and there's a lot of CSS issues around at the moment.
            </p>
          </div>
          <div className={styles.buttonContainer}>
          <StandardButton
  label="project feature"
  tooltip={"open popup"}
  type="basic_Expand"
  icon={getIcon("projects")}
  callback={handleFeatClick} // This will now work
/>
<StandardButton 
  label="résumé"
  tooltip={"navigate to resume"}
  type="basic_Expand"
  icon={getIcon("")}
  // callback={handleResumeClick} // This will now work
  link = {getLink("resume")}
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
                  link = {getLink(link.icon)}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>

   
          
      {/* Target Section */}

      
        {showModal && (
    <>
        {/* <h1>fuck</h1> */}
        <Modal
            component={ <ColumnWithSections data={HomeData[0]} style="newspaper" topDivideDouble={true} twoColumns={true}/>}
            onClose={() => setShowModal(false)} // Move onClose inside the Modal component
            size="large"
            title={"meh"}
            // buttons={getModalButtons(selectedProject)}
            isOpen={showModal}
        />
    </>
)}
    </div>
  );
};