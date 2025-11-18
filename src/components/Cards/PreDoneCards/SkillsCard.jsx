import React from "react";
import styles from "./styles/SkillsCard.module.scss";
import { MultiTagsContainer, SkillSection } from "../../Misc/MultiTagsContainer";
import {BouncyArrows} from "../../UI/DiscreteComponents/bouncyArrows.jsx";

const SkillsCard = ({ title = "Skills", fullskills }) => {
    return (
        <div className={styles.cardContainer}>
            {/* Title */}
            {/*<h2 className={styles.skillsTitle}>{title}</h2>*/}

            {/* Skills container */}
            <div className={styles.skillsContainer}>
                <div className={`${styles.skillSectionContainer} ${styles.embedTitleSection}`}>
                <h2 className={styles.embedTitle}>Things I can do..</h2>

                    <h2 className={styles.scrolltext}>Scroll Horizontally</h2>

                </div>
                {fullskills.map((skill, index) => (
                    <div className={styles.skillSectionContainer}>


                        <SkillSection key={index} chunk={skill} />
                    </div>

                ))}
            </div>

        </div>
    );
};

export default SkillsCard;
