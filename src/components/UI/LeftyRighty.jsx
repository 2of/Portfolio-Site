import React, { useRef, useState, useEffect } from 'react';
import styles from './styles/LeftyRighty.module.scss';
import useScreenSize from '../../utils/screensize.js';

const LeftyRighty = ({ leftComponent, rightComponent }) => {
  const containerRef = useRef(null);
  const [currentPosition, setCurrentPosition] = useState(1); // Track the current position (1 or 2)
  const [ignoreScrollPos, setIgnoreScrollPos] = useState(false); // Flag to ignore scroll position
  const scrollTimer = useRef(null); // Timer ref to clear when necessary
  const screenSize = useScreenSize()
  const handleButtonClick = () => {
    if (ignoreScrollPos) return; // If we're ignoring scroll, do nothing on button click

    const container = containerRef.current;

    if (currentPosition === 1) {
      // Scroll to the second component
      container.scrollBy({ left: container.clientWidth, behavior: 'smooth' });
      setCurrentPosition(2);
    } else {
      // Scroll back to the first component
      container.scrollBy({ left: -container.clientWidth, behavior: 'smooth' });
      setCurrentPosition(1);
    }

    // Set the ignoreScrollPos flag to true and start a 1-second timer
    setIgnoreScrollPos(true);
    clearTimeout(scrollTimer.current);
    scrollTimer.current = setTimeout(() => setIgnoreScrollPos(false), 1000);
  };

  const handleScroll = () => {
    if (ignoreScrollPos) return; // If ignoreScrollPos is true, do nothing

    const container = containerRef.current;
    const scrollLeft = container.scrollLeft;
    const containerWidth = container.clientWidth;

    // Check if the scroll position indicates the second component is visible
    if (scrollLeft >= containerWidth / 2) {
      setCurrentPosition(2);
    } else {
      setCurrentPosition(1);
    }
  };

  useEffect(() => {
    const container = containerRef.current;

    // Attach the scroll listener
    container.addEventListener('scroll', handleScroll);

    // Clean up the event listener on unmount
    return () => container.removeEventListener('scroll', handleScroll);
  }, [ignoreScrollPos]); // Re-run useEffect if ignoreScrollPos changes

  return (
    <div className={styles.scrollerContainer}>
      <div
        className={`${styles.scrollButton} ${
          currentPosition === 1 ? styles.to : styles.from
        }
        
        
            ${
            screenSize === 'sm' ? styles.bottomRight : styles.topRight 
          }`}



        onClick={handleButtonClick}
      >

        
        <span
          className={`${styles.arrow} ${
            currentPosition === 1 ? styles.arrowLeft : styles.arrowRight
          }
      
          
          `}
        >
          <i className="fa-solid fa-arrow-left"></i>
        </span>

        <span className={`${styles.text}`}>
          {currentPosition === 1 ? "1/2" : "2/2"}
          {/* {currentPosition}!!-!! */}
        </span>
      </div>

      <div className={styles.scrollWrapper} ref={containerRef}>
        <div className={styles.scrollContent}>
          <div className={styles.component}>{leftComponent}</div>
          <div className={styles.component}>{rightComponent}</div>
        </div>
      </div>
    </div>
  );
};

export default LeftyRighty;
