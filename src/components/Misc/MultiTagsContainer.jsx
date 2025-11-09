import React from "react";
import styles from "./styles/MultiTagsContainer.module.scss";
import getIcon from "../../utils/Iconifier";

const MultiTagsContainer = ({constrain = false, fullskills }) => {
  return (
    <div className={styles.skillsContainer}>
      {fullskills.map((chunk, i) => (


<SkillSection key={i} chunk={chunk}/>
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


const SkillSection = ({key,chunk}) => { 

return ( 
     <div key={key} className={styles.skillSection}>
          <span className={styles.header}>{chunk.icon && getIcon(chunk.icon)}{"  "} {chunk.header}</span>
          <div className={styles.skillsRow}>
            {chunk.skills.map((skill, j) => (
              <div key={j} className={styles.skillItem}>
                {skill}
              </div>
            ))}
          </div>
        </div>
)

}
export default MultiTagsContainer;
