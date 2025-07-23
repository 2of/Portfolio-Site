import React, { useState, useEffect } from "react";
import { BouncyArrows } from "./bouncyArrows";
import styles from "./styles/ScrollIndicator.module.scss";
import { useGlobalContext } from "../../contexts/GlobalContext";

export const ScrollIndicator = ({ position = "bottom" }) => {
  const {
    showScrollIndicator,
    hideScrollIndicator,
    scrollIndicatorStatus,
    setShowScrollIndicator
  } = useGlobalContext();

  const [showText, setShowText] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowText((prev) => !prev);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Watch for exit animation trigger
  useEffect(() => {
    if (scrollIndicatorStatus.setIsExiting) {
      const timer = setTimeout(() => {
  setShowScrollIndicator({display : false, isExiting: false})
      }, 500); // Match this with CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [scrollIndicatorStatus.setIsExiting, hideScrollIndicator]);

  return (
    <div
      className={`${styles.ScrollIndicatorContainer} ${styles[position]} ${
        scrollIndicatorStatus.setIsExiting ? styles.exiting : ""
      }`}
    >
               
       <p
        className={`${styles.fadeItem} ${
          showText ? styles.visible : styles.hidden
        }`}
      >
        scroll for more
      </p>

      <div
        className={`${styles.fadeItem} ${
          showText ? styles.hidden : styles.visible
        }`}
      >
        Test

        <BouncyArrows direction="down" />
        
      </div> 
    </div>
  );
};