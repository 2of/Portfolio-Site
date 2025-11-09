import React from "react";
import { ImageWithStaggeredComponents } from "../../UI/DiscreteComponents/PictureWIthComponentsStaggeredAroundCircle.jsx";
import ProfileImage from "../../../../public/assets/images/default.png";
import styles from "../../../pages/styles/ModernAbout.module.scss";
import ProgressBar from "../../UI/StandardLib/ProgressBar.jsx";
import { StandardButton } from "../../UI/StandardLib/StandardButton.jsx";
import getIcon from "../../../utils/Iconifier.jsx";
import {useGlobalContext} from "../../../contexts/GlobalContext.jsx";

export const AboutCardWithImage = ({
                                       ProfileImage: profileImage = ProfileImage,
                                       title,
                                       subtitle,
                                       description,
                                       areatitle,
                                   }) => {

    const { getLink } = useGlobalContext();


    return (
        <ImageWithStaggeredComponents image={profileImage} radius={40} gap={-10}>
            <h1 className={styles.title}>{title}</h1>
            <h2>{subtitle}</h2>
            <p>{description}</p>

            <ProgressBar style="linear" animated beginAnimate val={10} />

            <p>{areatitle}..</p>

            <span className={styles.buttonContainer}>
        <StandardButton
            label="Résumé"
            type="modern_unfilled"
            icon={getIcon("resume")}
            link={getLink("resume")}
            external
        />
        <StandardButton
            label="Github"
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
        </ImageWithStaggeredComponents>
    );
};
