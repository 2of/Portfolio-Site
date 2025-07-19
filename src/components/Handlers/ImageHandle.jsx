  import React, { useRef, useState, useEffect } from "react";
  import { createPortal } from "react-dom";
  import styles from "./ImageHandle.module.scss";
import getIcon from "../../utils/Iconifier";

  const ImageHandle = ({ src, alt }) => {
    const thumbRef = useRef(null);
    const [isZoomed, setIsZoomed] = useState(false);
    const [cloneStyles, setCloneStyles] = useState(null);
    const [showOverlay, setShowOverlay] = useState(false);
const [hasError, setHasError] = useState(false);
    const duration = 300;
    const bezier = "cubic-bezier(0.4, 0, 0.2, 1)";



    const DefaultImage = () => { 

      
    }
    // Disable background scroll when overlay is visible
    useEffect(() => {
      document.body.style.overflow = showOverlay ? "hidden" : "";
      return () => (document.body.style.overflow = "");
    }, [showOverlay]);

    const handleZoom = () => {
      const thumb = thumbRef.current;
      if (!thumb) return;
      // breaks sometimes
      const rect = thumb.getBoundingClientRect();
      const scrollTop = 0;

      const scrollLeft = 0;

      // tHe above handles scrolling in body, it kinda breaks in a modal
      // so we get away with jsut doing it all relative

      const startTop = rect.top + scrollTop;
      const startLeft = rect.left + scrollLeft;
      const startWidth = rect.width;
      const startHeight = rect.height;

      setCloneStyles({
        position: "absolute",
        top: `${startTop}px`,
        left: `${startLeft}px`,
        width: `${startWidth}px`,
        height: `${startHeight}px`,
        transition: "none",
      });

      requestAnimationFrame(() => {
        setIsZoomed(true);

        requestAnimationFrame(() => {
          setShowOverlay(true);

          const padding = 40;
          setCloneStyles({
            top: `${padding + scrollTop}px`,
            left: `${padding + scrollLeft}px`,
            width: `${window.innerWidth - padding * 2}px`,
            height: `${window.innerHeight - padding * 2}px`,
            transition: `all ${duration}ms ${bezier}`,
          });
        });
      });
    };

    const handleUnzoom = () => {
      const thumb = thumbRef.current;
      if (!thumb) return;

      const rect = thumb.getBoundingClientRect();
      const scrollTop = 0;
      const scrollLeft = 0;

      const endTop = rect.top + scrollTop;
      const endLeft = rect.left + scrollLeft;
      const endWidth = rect.width;
      const endHeight = rect.height;

      setShowOverlay(false);

      setCloneStyles((prev) => ({
        ...prev,
        top: `${endTop}px`,
        left: `${endLeft}px`,
        width: `${endWidth}px`,
        height: `${endHeight}px`,
        transition: `all ${duration}ms ${bezier}`,
      }));

      setTimeout(() => {
        setIsZoomed(false);
        setCloneStyles(null);
      }, duration);
    };

    return (
      <>
      <div className={styles.thumbnailWrapper}>
  {!hasError ? (
    <img
      ref={thumbRef}
      src={src}
      alt={alt}
      className={styles.thumbnail}
      onClick={handleZoom}
      onError={() => setHasError(true)}
    />
  ) : (
    <div className={styles.fallbackImage}>
      <span>{getIcon("fail")} Cannot load {getIcon("fail")} </span>
      </div>
  )}
  {isZoomed && <div className={styles.thumbnailOverlay} />}
</div>

        {isZoomed &&
          createPortal(
            <div
              className={`${styles.overlay} ${
                showOverlay ? styles.overlayVisible : ""
              }`}
              onClick={handleUnzoom}
            >
              <button
                className={styles.closeButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnzoom();
                }}
                aria-label="Close fullscreen image"
              >
                
              </button>

              <div
                className={styles.cloneWrapper}
                style={cloneStyles}
                onClick={(e) => {
                  e.stopPropagation();
                  handleUnzoom();
                }}
              >
                <img src={src} alt={alt} className={styles.cloneImage} />
              </div>
              <div className={styles.label}>{alt}</div>
            </div>,
            document.body
          )}
      </>
    );
  };

  export default ImageHandle;
