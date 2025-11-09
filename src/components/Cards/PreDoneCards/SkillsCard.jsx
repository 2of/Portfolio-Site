import React from "react";
import styles from "./SkillsCard.module.scss";
import MultiTagsContainer from "../../Misc/MultiTagsContainer";
const SkillsCard = ({ title = "Skills", fullskills, constrain = true }) => {
  return (
    <div className={styles.multiTagsWrapper}>
      {/* Title */}
      <div className={styles.skillsTitle}>{title}</div>

      {/* Skills container */}
      <div
        className={`${styles.skillsContainer} ${
          !constrain ? styles.asFullScreen : ""
        }`}
      >
        <MultiTagsContainer fullskills={fullskills} />
      </div>
    </div>
  );
};

export default SkillsCard;
