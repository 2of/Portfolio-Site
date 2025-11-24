import React from "react";
import styles from "./styles/PortfolioSiteCard.module.scss";
import { StandardButton } from "../../UI/StandardLib/StandardButton.jsx";
import TrackedGradientBG from "../../Background/TrackedGradientBg";
import getIcon from "../../../utils/Iconifier";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";

export const PortfolioSiteCard = () => {
    const navigate = useNavigate();
    const { getLink } = useGlobalContext();

    const tags = [
        "React",
        "SCSS",
        "Custom Markup Language",
        "Custom Hooks and so on",
        "Wrappers for Chess, Tensorflow",
    ];

    return (
        <div className={styles.card}>
            {/* Background */}
            <div className={styles.bgContainer}>
                <TrackedGradientBG />
            </div>

            {/* Header */}
            <div className={styles.cardHeader}>
                <h2 className={styles.title}>Portfolio Site</h2>
                <p className={styles.subtitle}>
                    There's actually heaps here, Hosting is free afterall...
                </p>
            </div>

            {/* Body */}
            <div className={styles.cardBody}>
                <div className={styles.ButtonContainer}>
                    <StandardButton
                        label="thingies.dev"
                        type="rounded_catalogue_card_end_with_label"
                        icon={getIcon("right")}
                        link="https://thingies.dev"
                    />
                    <StandardButton
                        label="Open Writeup"
                        type="rounded_catalogue_card_end_with_label"
                        icon={getIcon("article")}
                        callback={() => navigate("/proj/portfoliosite")}
                    />
                    <StandardButton
                        label="UI Library"
                        type="rounded_catalogue_card_end_with_label"
                        icon={getIcon("github")}
                        link={getLink("uilibrepo")}
                    />
                    <StandardButton
                        label="All Components"
                        type="rounded_catalogue_card_end_with_label"
                        icon={getIcon("misc")}
                        callback={() => navigate("/allcomponents")}
                    />
                    <StandardButton
                        label="Code"
                        type="rounded_catalogue_card_end_with_label"
                        icon={getIcon("github")}
                        link={getLink("portfoliorepo")}
                    />
                </div>

                <h4 className={styles.tagsTitle}>Under The hood:</h4>
                <div className={styles.tagsContainer}>
                    {tags.map((tag, idx) => (
                        <span key={idx} className={styles.tag}>
              {tag}
            </span>
                    ))}
                </div>
            </div>
        </div>
    );
};
