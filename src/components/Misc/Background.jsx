import React from "react";
import styles from "./Background.module.scss";

export const BackGround = ({ mode }) => {
  return (
    <div className={`${styles.background} ${styles[mode]}`}>
      <div className={styles.sky}>
            {/* 
            stars
            moon
            sun
            clouds
            
            */}



      </div>
      <div className={styles.solidContainer}>
 
        <div className={styles.waterFall}></div>
        <div className={styles.ground}>
          <div className={styles.water}></div>
        </div>
      </div>
    </div>
  );
};
