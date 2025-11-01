import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/ImageSplit.module.scss";

const ImageSplit = ({ image1, image2 }) => {
  const containerRef = useRef(null);
  const lastXRef = useRef(null); // Store last cursor position
  const [cursorX, setCursorX] = useState(null);
  const [containerWidth, setContainerWidth] = useState(0);

  // Set initial width and update on resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    setCursorX(x);
    lastXRef.current = x; // Remember last position
  };

  const handleMouseLeave = () => {
    // Keep last position instead of resetting
    setCursorX(lastXRef.current);
  };

  // Default to 50% split if no movement or width hasn't loaded
  const splitX = cursorX !== null ? cursorX : containerWidth / 2;
  const clipRightPercentage =
    containerWidth > 0 ? 100 - (splitX / containerWidth) * 100 : 50;

  // Clip-path inset
  const clipPathStyle = `inset(0% ${clipRightPercentage}% 0% 0%)`;

  return (
    <div
      ref={containerRef}
      className={styles.container}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Base Image */}
      <img src={image1} alt="Base" className={styles.baseImage} />

      {/* Overlay Image */}
      <img
        src={image2}
        alt="Overlay"
        className={styles.overlayImageClip}
        style={{ clipPath: clipPathStyle }}
      />

      {/* Slider */}
      <div className={styles.slider} style={{ left: `${splitX}px` }} />
    </div>
  );
};

export default ImageSplit;
