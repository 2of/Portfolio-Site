import React from "react";
import styles from "./About.module.scss"; // Updated SCSS import
import mansvg from "../../assets/svgs/DrawKit_Vector_Illustrations_Podcast.svg"; // Keep or replace with a relevant image
import { StandardButton } from "../../components/UI/StandardButton";
import getIcon from "../../utils/Iconifier";
import { useGlobalContext } from "../../contexts/GlobalContext";

export const AboutCell = ({ sz,scrollPosition }) => {
    const { getLink } = useGlobalContext();

    return (
        <div className={sz === "sm" ? styles.sm : styles.lg}>
            {/* About Me Section */}
            <div className={styles.TextSection}>
                <svg className={styles.TitleSVG} viewBox="0 0 400 150">
                    <defs>
                        <path id="curve" d="M 50 120 Q 200 90 350 120" />
                    </defs>
                    <text className={styles.TitleText}>
                        <textPath href="#curve" startOffset="50%" textAnchor="middle">
                            Yeah, so About Me..
                        </textPath>
                    </text>
                </svg>
                <div className={styles.Subtitle}>
                    <p>Kinda a bunch of stuff...</p>
                </div> 
                <div className={styles.para}>
                    <p>
                        I’m an experienced IT Engineer, having worked across <span className={styles.highlight}>Education IT</span> and <span className={styles.highlight}>Healthcare IT</span>, as well as deploying and supporting IT solutions for small businesses.
                    </p>
                    <p>
                        I've sorta done a bit of everything from  <span className={styles.highlight}>Google Cloud Admin and Azure Appliances and Azure Admin</span> to setting up <span className={styles.highlight}>Point-to-Point Mikrotiks</span> on top of dairy sheds.
                    </p>
                </div>

            </div>

        {/* <h1>{scrollPosition}</h1> */}
             
            <div className={styles.QualsList}>
                        <div className={styles.QualTitle}>
                            <p>Quals</p>
                        </div>
                        <div className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}>
                            <p className={styles.QualificationLevel}>Bachelor of</p>
                            <p className={styles.QualificationField}>Computer Science</p>
                            <p className={styles.QualificationDetails}>[2020] [University of Canterbury]</p>
                        </div>
                        <div className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}>
                            <p className={styles.QualificationLevel}>Master of</p>
                            <p className={styles.QualificationField}>Artificial Intelligence</p>
                            <p className={styles.QualificationDetails}>[2025] [University of Canterbury]</p>
                        </div>
                        <div className={styles.QualTitle}>
                            <p>Experience</p>
                        </div>
                        <div className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}>
                            <p className={styles.QualificationLevel}>3+ years</p>
                            <p className={styles.QualificationField}>IT L1 & L2 Admin</p>
                            <p className={styles.QualificationDetails}>[M365, Azure, GoogleAdmin] [Education IT]</p>
                        </div>
                        <div className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}>
                            <p className={styles.QualificationLevel}>Currently</p>
                            <p className={styles.QualificationField}>Short Term Projectect</p>
                            <p className={styles.QualificationDetails}>[IT Integration at HNZ]</p>
                        </div>

                    </div>


            {/* Bottom Section with Divider */}
            <div className={styles.bottomSection}>



                <div className={styles.art}>
                    <img src={mansvg} alt={"lazybones"}></img>
                </div>
                {/* Custom Shape Divider */}
                {/* <div className={styles.customShapeDivider}>
                    <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
                        <path d="M1200 120L0 16.48 0 0 1200 0 1200 120z" className={styles.shapeFill}></path>
                    </svg>
                </div> */}

                {/* Qualifications */}


               

                <div className={styles.darkContainer}>

                    

                </div>
            </div>
        </div>
    );
};