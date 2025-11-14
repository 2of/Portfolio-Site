// ResponsiveGradient.jsx
import React, { useEffect, useRef, useState } from 'react';
import styles from './ResponsiveGradient.module.scss';

// Utility functions
const getRandom = (min, max) => Math.random() * (max - min) + min;
const getRandomColor = () =>
  `hsl(${Math.floor(Math.random() * 360)}, 70%, 60%)`;

// 🎨 10 Color Profiles
const colorProfiles = [
  ['#ff6b6b', '#f06595', '#cc5de8', '#845ef7', '#5c7cfa'], // Warm
  ['#74c0fc', '#4dabf7', '#228be6', '#1c7ed6', '#1971c2'], // Blue
  ['#8ce99a', '#69db7c', '#38d9a9', '#20c997', '#12b886'], // Green
  ['#ffd43b', '#fcc419', '#fab005', '#f59f00', '#f08c00'], // Yellow/Orange
  ['#e599f7', '#da77f2', '#cc5de8', '#be4bdb', '#ae3ec9'], // Purple
  ['#a5d8ff', '#74c0fc', '#4dabf7', '#339af0', '#228be6'], // Sky
  ['#ff8787', '#ff6b6b', '#fa5252', '#f03e3e', '#e03131'], // Red
  ['#ffe066', '#ffd43b', '#fcc419', '#fab005', '#f59f00'], // Gold
  ['#dee2e6', '#ced4da', '#adb5bd', '#868e96', '#495057'], // Grayscale
  ['#63e6be', '#38d9a9', '#15aabf', '#1098ad', '#0c8599'], // Teal
];

const ResponsiveGradient = ({
  baseColor = '#ff00ff',
  initialRecolor = false,
  blobCount = 15,
  colorProfile =9,
}) => {
  const containerRef = useRef(null);
  const [recolor, setRecolor] = useState(initialRecolor);

  // Create blobs once
  useEffect(() => {
    const container = containerRef.current;

    const blobs = Array.from({ length: blobCount }).map(() => {
      const blob = document.createElement('div');
      blob.className = styles.blob;

      // Random initial size and position
      const size = getRandom(150, 300);
      blob.style.width = `${size}px`;
      blob.style.height = `${size}px`;
      blob.style.top = `${getRandom(0, 100)}%`;
      blob.style.left = `${getRandom(0, 100)}%`;
      blob.style.background = getRandomColor();
      blob.style.animationDuration = `${getRandom(20, 40)}s`;

      container.appendChild(blob);
      return blob;
    });

    return () => {
      blobs.forEach((b) => b.remove());
    };
  }, [blobCount]);

  // Update blob colors when recolor or profile changes
  useEffect(() => {
    const blobs = containerRef.current.querySelectorAll(`.${styles.blob}`);
    const palette = colorProfiles[colorProfile % colorProfiles.length];

    blobs.forEach((blob, index) => {
      const color = recolor ? baseColor : palette[index % palette.length];
      blob.style.background = color;
    });
  }, [recolor, baseColor, colorProfile]);

  return (
    <>
      {/*<button*/}
      {/*  className={styles.controlButton}*/}
      {/*  onClick={() => setRecolor(!recolor)}*/}
      {/*>*/}
      {/*  {recolor ? 'Random Colors' : 'Recolor to Base'}*/}
      {/*</button>*/}

      <div className={styles.animatedBackground} ref={containerRef}></div>
    </>
  );
};

export default ResponsiveGradient;
