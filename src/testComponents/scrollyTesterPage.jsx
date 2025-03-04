import React, { useState, useEffect } from "react";
import styles from "./ScrollyTesterPage.module.scss";

const ScrollyTesterPage = () => {
  const [opacity, setOpacity] = useState(1);
  const [gridPadding, setGridPadding] = useState(36);

  useEffect(() => {
    const handleScroll = () => {
      console.log("Scroll event fired!");
      const scrollY = window.scrollY;
      const totalScrollHeight = document.documentElement.scrollHeight - window.innerHeight;

      const fadeOutStart = 50;
      const fadeOutEnd = 400;
      let newOpacity = 1 - (scrollY - fadeOutStart) / (fadeOutEnd - fadeOutStart);
      newOpacity = Math.max(newOpacity, 0);
      setOpacity(newOpacity);

      const initialPadding = 36;
      const minPadding = 0;
      let newPadding = initialPadding - (scrollY / totalScrollHeight) * initialPadding;
      newPadding = Math.max(newPadding, minPadding);
      console.log("New Padding:", newPadding);
      setGridPadding(newPadding);
    };

    window.addEventListener("scroll", handleScroll);
    console.log("Scroll event listener added");

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={styles.scrollyTesterPage}>
      <div className={styles.largeInteractiveArea} style={{ opacity }}>
        <div className={styles.textContainer}>
          <h1>Interactive Area</h1>
          <p>Scroll down to see the effect</p>
        </div>
      </div>

      <div
        className={styles.gridArea}
        style={{
          paddingLeft: `${gridPadding}px`,
          paddingRight: `${gridPadding}px`,
        }}
      >
        <div className={styles.content}>
          <h2>Scrollable Content</h2>
          <p>Keep scrolling to see the changes in opacity and padding.</p>
          {/* Add more content to ensure scrolling */}
          {[...Array(50)].map((_, index) => (
            <p key={index}>This is some scrollable content. Line {index + 1}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ScrollyTesterPage;