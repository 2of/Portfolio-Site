import React from "react";
import styles from "./styles/MultiTagsContainer.module.scss";
import getIcon from "../../utils/Iconifier";

const MultiTagsContainer = ({ constrain = false, fullskills }) => {
  return (
    <div className={styles.skillsContainer}>
      {fullskills.map((chunk, i) => (


        <SkillSection key={i} chunk={chunk} />
        // <div key={i} className={styles.skillSection}>
        //   <span className={styles.header}>{chunk.icon && getIcon(chunk.icon)}{"  "} {chunk.header}</span>
        //   <div className={styles.skillsRow}>
        //     {chunk.skills.map((skill, j) => (
        //       <div key={j} className={styles.skillItem}>
        //         {skill}
        //       </div>
        //     ))}
        //   </div>
        // </div>
      ))}
    </div>
  );
};


const SkillSection = ({ chunk }) => {
  return (
    <div className={styles.skillSection}>
      <div className={styles.windowHeader}>
        {/* <div className={styles.trafficLights}>
          <span className={styles.red}></span>
          <span className={styles.yellow}></span>
          <span className={styles.green}></span>
        </div> */}
        <span className={styles.headerTitle}>
          {chunk.icon && getIcon(chunk.icon)} {chunk.header}
        </span>
      </div>
      <div className={styles.windowContent}>
        <div className={styles.skillsRow}>
          {chunk.skills.map((skill, j) => (
            <div key={j} className={styles.skillItem}>
              {skill}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export { MultiTagsContainer, SkillSection };
