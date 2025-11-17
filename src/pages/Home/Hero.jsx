import React from "react";
import styles from "./Hero.module.scss"; // Ensure correct SCSS import
import dogsvg from "../../assets/svgs/DrawKit_Vector_Illustrations_Dog call.svg"; // Import the image properly
import { StandardButton } from "../../components/UI/StandardLib/StandardButton.jsx";
import otherart from "../../assets/HomeParallaxResources/1.png"
import getIcon from "../../utils/Iconifier";
import { BouncyArrows } from "../../components/UI/DiscreteComponents/bouncyArrows.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext";
// import birdpng from "../../assets/sbg"
export const HeroCell = ({sz, featureButtonCallback}) => {
    const handleFeatClick = () => {
        featureButtonCallback()
    };
  const { getLink } = useGlobalContext();
    const socialLinks = [
        { icon: "github", link:getLink("github") },
        { icon: "linkedin", link: getLink("linkedin") },
    ]; // Add actual social links

    return (
        <div className={`${sz === "sm" ? styles.smContainer : styles.lgContainer}`}>
            {/* Hero Art */}
            {/* <div className={`${styles.HeroArt} ${styles.svgPositionCenter}`}>
                <img src={otherart} alt="Hero Art" />
            </div> */}

            {/* Hero Text Section */}
            <div className={styles.HeroTextSection}>
                <div className={styles.HeroTitle}>Howdy</div>
                <div className={styles.HeroSubtitle}>
                    <p>I'm Noah, and this is my little project catalogue</p>
                </div>
                <div className={styles.HeroP}>
                    <p>
            Okay so, I wrote this site from scratch so it's a bit hodge-podge, but essentially just use the nav to look at projects. There's fun things accessible from /settings.
            If I sent this link to you as a prospective employer, hello! Ignore the bugs! (Im slowly ironing them out and moving this site from to something a bit more structured)

            </p><p>See below for a featured project and my CV.


                            </p><p>Also thingies.dev is far cooler on mobile...


                    </p>
                </div>
                <div className={styles.buttonContainer}>
                    <StandardButton
                        label="Project Feature"
                        tooltip="Open popup"
                        type="basic_Expand"
                        icon={getIcon("projects")}
                        callback={handleFeatClick}
                    />
                    <StandardButton
                        label="Résumé"
                        tooltip="Navigate to resume"
                        type="basic_Expand"
                        icon={getIcon("resume")}
                        link={getLink("resume")}
                        external={true}
                    />
     </div>
                  
                                 <div className={styles.buttonContainer}>
                      <StandardButton
                        label="Github"
                        tooltip="Navigate to resume"
                        type="article"
                        icon={getIcon("github")}
                        link={getLink("github")}
                        external={true}
                    />
                      <StandardButton
                        label="LinkedIn"
                        tooltip="Navigate to LinkedIn"
                        type="article"
                        icon={getIcon("linkedin")}
                        link={getLink("linkedin")}
                        external={true}
                    />
                   </div>
           
                <div className={styles.HeroP}>
                    Scroll down
                    {/* <BouncyArrows direction="down"/> */}
                </div>

                {/* Social Links */}
                {/* <ul className={styles.socials}>
                    {socialLinks.map((link, index) => (
                        <li key={index}>
                            <StandardButton
                                label=""
                                tooltip={link.icon}
                                type="social"
                                icon={getIcon(link.icon)}
                                link={link.link}
                            />
                        </li>
                    ))}
                </ul> */}
   
            </div>
        </div>
    );
};