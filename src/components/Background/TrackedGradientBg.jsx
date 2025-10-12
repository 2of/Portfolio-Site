import React, { useEffect, useRef } from "react";
import styles from "./TrackedGradientBG.module.scss";

const TrackedGradientBG = ({ interactive = false }) => {
  const gradientRef = useRef(null);
  const animationRef = useRef(null);
  const angleRef = useRef(0);

  useEffect(() => {
    if (!gradientRef.current) return;

    let lastTime = 0;

    const animate = (time) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;
      lastTime = time;

      // Subtle looping motion (sinusoidal)
      angleRef.current += delta * 0.0003; // speed factor
      const xPercent = 50 + Math.sin(angleRef.current) * 20; // horizontal sway
      const yPercent = 50 + Math.cos(angleRef.current * 0.8) * 15; // vertical drift

      gradientRef.current.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div className={styles.bgDecor}>
      <div ref={gradientRef} className={styles.gradientLayer} />
      <div className={`${styles.shape} ${styles.shape1}`} />
      <div className={`${styles.shape} ${styles.shape2}`} />
      <div className={`${styles.shape} ${styles.shape3}`} />
      <div className={`${styles.shape} ${styles.shape4}`} />
    </div>
  );
};

export default TrackedGradientBG;