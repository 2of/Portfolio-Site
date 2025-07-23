import React from "react";
import styles from "./Hero.module.scss"; // Ensure correct SCSS import
import dogsvg from "../../assets/svgs/DrawKit_Vector_Illustrations_Dog call.svg"; // Import the image properly
import { StandardButton } from "../../components/UI/StandardButton";
import getIcon from "../../utils/Iconifier";
import { BouncyArrows } from "../../components/UI/bouncyArrows";
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
                        This site is a little WIP, but have a poke around. Check out Projects below. The site is
                        written in React, and I've had some deployment issues, so if something is broken, that's it.
                        I know of a few bugs, and there's a lot of CSS issues around at the moment.
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
                <div className={styles.HeroP}>
                    <p>Feel free to reach out {getIcon("smile")}</p>
                    <BouncyArrows direction="down"/>
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
                                link={link.link}
                            />
                        </li>
                    ))}
                </ul>
   
            </div>
        </div>
    );
};