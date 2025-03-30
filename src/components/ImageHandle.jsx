import React, { useState, useEffect } from "react";
import styles from "./ImageHandle.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { TooltipProvider, useTooltip } from "../contexts/tooltip";
import { FaTimesCircle } from "react-icons/fa";
import Portal from "./Portal"; // Import the Portal component
import getIcon from "../utils/Iconifier";

const ImageHandle = ({ src, alt, onError }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const {  pushNavReplacementButton,
    popNavReplacementButton, setHopNav,
    
   } = useGlobalContext();
  const { showTooltip, hideTooltip } = useTooltip();

  const toggleFullscreen = () => {
    setIsFullscreen((prev) => !prev);
  };

  useEffect(() => {
    // Update the nav replacement button based on fullscreen state
    if (isFullscreen) {
      setHopNav(true);
      pushNavReplacementButton({
        callback: toggleFullscreen,
        label: getIcon("close"),
      });
    } else {
      popNavReplacementButton();
    }
  }, [isFullscreen]);

  return (
    <div>
      {/* Thumbnail image */}
      <img
        src={src}
        alt={alt}
        className={styles.thumbnail}
        onClick={toggleFullscreen}
        onMouseMove={(e) => showTooltip("Fullscreen", e)}
        onMouseLeave={hideTooltip}
        onError={onError} // Add the onError handler here
      />

      {/* Fullscreen overlay (Always rendered via Portal) */}
      <Portal>
        <div
          className={`${styles.fullscreenOverlay} ${
            isFullscreen ? styles.active : ""
          }`}
          onClick={toggleFullscreen}
        >
          <img
            src={src}
            alt={alt}
            className={styles.fullscreenImage}
            onError={onError} // Add the onError handler here as well
          />
          <h2 className={styles.subtitle}>{alt}</h2>
          <button
            className={styles.closeButton}
            onClick={() => toggleFullscreen} // Fixed: Removed the arrow function
            onMouseMove={(e) => showTooltip("Close", e)}
            onMouseLeave={hideTooltip}
          >
            <FaTimesCircle />
          </button>
        </div>
      </Portal>
    </div>
  );
};

export default ImageHandle;