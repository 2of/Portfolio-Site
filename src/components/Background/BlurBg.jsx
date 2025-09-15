import React, { useEffect, useMemo, useState } from "react";
import clsx from "clsx";
import styles from "./BlurArtBackground.module.scss";

const roundedClass = {
  none: styles.roundedNone,
  sm: styles.roundedSm,
  md: styles.roundedMd,
  lg: styles.roundedLg,
  xl: styles.roundedXl,
  "2xl": styles.rounded2xl,
  "3xl": styles.rounded3xl,
};

const defaultColors = ["#ff6b6b", "#6bc1ff", "#9dff6b", "#ffcb6b", "#b36bff"];

export default function BlurArtBackground({
  intensity = "medium",
  animated = true,
  rounded = "2xl",
  border = true,
  className,
  maxBlobs = 4,
  speedFactor = 1,
  children,
}) {
  // Generate *all possible* blobs up to maxBlobs
const allBlobs = useMemo(() => {
  return Array.from({ length: maxBlobs }, (_, i) => {
    const size = 150 + Math.random() * 170; // 150px → 350px

    // Cluster around center
    const angle = Math.random() * 2 * Math.PI; // 0 → 360°
    const radius = Math.random() * 20; // distance from center (0 → 30%)
    const centerX = 50; // center of stage (percent)
    const centerY = 40;

    const left = centerX + radius * Math.cos(angle);
    const top = centerY + radius * Math.sin(angle);

    const color = defaultColors[i % defaultColors.length];
    const duration = 10 + Math.random() * 10; // seconds
    return { id: i, size, top, left, color, duration };
  });
}, [maxBlobs]);

  // State: which blobs are active right now
  const [activeBlobs, setActiveBlobs] = useState([]);
  const [showContent, setShowContent] = useState(true);

  // Periodically toggle blobs in/out
  useEffect(() => {
    const interval = setInterval(() => {
      const targetCount = Math.floor(Math.random() * maxBlobs) + 1; // 1..maxBlobs
      const shuffled = [...allBlobs].sort(() => Math.random() - 0.5);
      setActiveBlobs(shuffled.slice(0, targetCount));

      // Also toggle content
      setShowContent(Math.random() > 0.3); // ~70% of time visible
    }, 6000); // every 6s

    return () => clearInterval(interval);
  }, [allBlobs, maxBlobs]);

  return (
    <div
      className={clsx(
        styles.root,
        animated && styles.animated,
        border && styles.border,
        roundedClass[rounded] || roundedClass["2xl"],
        className
      )}
    >
      <div className={styles.stage} aria-hidden>
        {allBlobs.map((blob) => {
          const isActive = activeBlobs.includes(blob);
          return (
            <div
              key={blob.id}
              className={clsx(styles.lightBlob, isActive && styles.active)}
              style={{
                width: `${blob.size}px`,
                height: `${blob.size}px`,
                top: `${blob.top}%`,
                left: `${blob.left}%`,
                background: blob.color,
                animationDuration: `${blob.duration / speedFactor}s`,
              }}
            />
          );
        })}
      </div>

      <div
        className={clsx(
          styles.content,
          showContent ? styles.contentVisible : styles.contentHidden
        )}
      >
        {children}
      </div>
    </div>
  );
}