import React, { useEffect, useRef } from "react";
import styles from "./TrackedGradientBG.module.scss";
import { useDarkMode } from "../../contexts/DarkModeContext";

const TrackedGradientBG = ({ interactive = false }) => {
  const gradientRef = useRef(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0);
  const { darkMode } = useDarkMode();

  useEffect(() => {
    // Update theme attribute on body
    document.documentElement.setAttribute(
      "data-theme",
      darkMode ? "dark" : "light",
    );
  }, [darkMode]);

  useEffect(() => {
    if (!gradientRef.current) return;

    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      angleRef.current += delta * 0.0003;
      const xPercent = 50 + Math.sin(angleRef.current) * 20;
      const yPercent = 50 + Math.cos(angleRef.current * 0.8) * 15;

      gradientRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className={styles.bgDecor}>
      <div
        ref={gradientRef}
        className={` ${darkMode ? styles.gradientLayerDark : styles.gradientLayer}`}
      />

      {darkMode ? (
        <>
          {" "}
          <div className={`${styles.shape} ${styles.shape1D}`} />
          <div className={`${styles.shape} ${styles.shape2D}`} />
          <div className={`${styles.shape} ${styles.shape3D}`} />
          <div className={`${styles.shape} ${styles.shape4D}`} />
        </>
      ) : (
        <>
          {" "}
          <div className={`${styles.shape} ${styles.shape1}`} />
          <div className={`${styles.shape} ${styles.shape2}`} />
          <div className={`${styles.shape} ${styles.shape3}`} />
          <div className={`${styles.shape} ${styles.shape4}`} />
        </>
      )}
    </div>
  );
};

export default TrackedGradientBG;
