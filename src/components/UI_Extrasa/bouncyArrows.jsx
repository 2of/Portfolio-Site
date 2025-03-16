import React from "react";
import styles from './BouncyArrows.module.scss'

export const BouncyArrows = ({numArrows = 3}) => { 

  return ( 
    <div className={styles.bouncyArrows}>


 {Array.from({ length: numArrows }, (_, index) => (
        <span key={index} className={styles.arrow}>
          ↓
        </span>
      ))}
  </div>
  )
}