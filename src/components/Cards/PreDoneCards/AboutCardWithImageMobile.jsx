import React from "react";
import ProfileImage from "../../../assets/userimage.jpeg"
import styles from "./styles/AboutCardWithImageMobile.module.scss";
import { StandardButton } from "../../UI/StandardLib/StandardButton.jsx";
import getIcon from "../../../utils/Iconifier.jsx";

import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";

export const AboutCardWithImageMobile = ({
                                             title = "Noah King",
                                             subtitle = "Software Engineer",
                                             description = "Building cool things for the web.",
                                             areatitle = "About Me",
                                             image = ProfileImage,
                                             gap = -50,
                                         }) => {
    const { theme } = useGlobalContext();

    const {getLink} = useGlobalContext();
    const Buttons = () => (
        <span className={styles.buttonContainer}>
      <StandardButton
          label="Résumé"
          type="modern_unfilled"
          icon={getIcon("resume")}
          link={getLink("resume")}
          external
      />
      <StandardButton
          label="GitHub"
          type="modern_unfilled"
          icon={getIcon("github")}
          link={getLink("github")}
          external
      />
      <StandardButton
          label="LinkedIn"
          type="modern_unfilled"
          icon={getIcon("linkedin")}
          link={getLink("linkedin")}
          external
      />
    </span>
    );

    return (
        <div className={styles.CardContainer}>
            <div className={styles.imageContainer}>
                <img src={image} alt={title} />
            </div>

            <div className={styles.HerofirstSection}>

                {title && <h1 className={styles.title}>{title}</h1>}
                {subtitle && <h2 className={styles.subtitle}>{subtitle}</h2>}
                {/*{description && <p className={styles.description}>{description}</p>}*/}
                {areatitle && <h4 className={styles.areaTitle}>{areatitle}</h4>}
                <Buttons />
            </div>
        </div>
    );
};
