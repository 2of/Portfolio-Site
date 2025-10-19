import React from "react";
import styles from './styles/TitleCard.module.scss'; // Assuming this file exists
import FeatherTwoLayer from "../Misc/FeatherTwoLayer";

export const TitleCard = ({ title, subtitle, variant = 'regular' }) => {

  const baseClassName = styles.titleCard;
  
 
  const variantClassNameKey = `titleCard--${variant}`;

  const cardClassName = `${baseClassName} ${styles[variantClassNameKey]}`;

  return (
    <div className={cardClassName}>
        <div className={styles.bgContainer}>
        <FeatherTwoLayer/>

        </div>

      
    
      <h1 className={styles.titleCard__title}>{title}</h1>
      <p className={styles.titleCard__subtitle}>{subtitle}</p>
      
    </div>
  );
};