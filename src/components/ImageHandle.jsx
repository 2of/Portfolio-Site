import React, { useState, useEffect } from "react";
import styles from "./ImageHandle.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { TooltipProvider, useTooltip } from "../contexts/tooltip";
import { FaTimesCircle } from "react-icons/fa";
import Portal from "./Portal";
import getIcon from "../utils/Iconifier";

const ImageHandle = ({ src, alt, onError }) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const { pushNavReplacementButton, popNavReplacementButton, setHopNav } = useGlobalContext();
  const { showTooltip, hideTooltip } = useTooltip();

  const closeFullscreen = () => {
    setIsFullscreen(false);
    popNavReplacementButton();
  };

  const openFullscreen = () => {
    setHopNav(true);
    setIsFullscreen(true);
    pushNavReplacementButton({
      callback: closeFullscreen,
      label: getIcon("close"),
    });
  };

  return (
    <div>
      {/* Thumbnail image */}
      <img
        src={src}
        alt={alt}
        className={styles.thumbnail}
        onClick={openFullscreen}
        onMouseMove={(e) => showTooltip("Fullscreen", e)}
        onMouseLeave={hideTooltip}
        onError={onError}
      />

      {/* Fullscreen overlay (Always rendered via Portal) */}
      <Portal>
        <div
          className={`${styles.fullscreenOverlay} ${isFullscreen ? styles.active : ""}`}
          onClick={closeFullscreen}
        >
          <img
            src={src}
            alt={alt}
            className={styles.fullscreenImage}
            onError={onError}
          />
          <h2 className={styles.subtitle}>{alt}</h2>
          <button
            className={styles.closeButton}
            onClick={closeFullscreen}
            onMouseMove={(e) => showTooltip("Close", e)}
            onMouseLeave={hideTooltip}
            onClick={(e) => {
              e.stopPropagation(); // prevent click from bubbling and closing fullscreen
              closeFullscreen();
            }}
          >
            <FaTimesCircle />
          </button>
        </div>
      </Portal>
    </div>
  );
};

export default ImageHandle;