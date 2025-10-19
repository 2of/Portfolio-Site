import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./styles/ProperModal.module.scss";
import { StandardButton } from "../UI/StandardButton";
import useScreenSize from "../../utils/screensize";
import { useModal } from "../../contexts/ModalContext";
import getIcon from "../../utils/Iconifier";
import TrackedGradientBG from "../Background/TrackedGradientBg";

const ProperModal = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const { modalState, hideModal } = useModal();
  const screenSize = useScreenSize();
  const [animatingOut, setAnimatingOut] = useState(false);

  // Animate out then clean up
  useEffect(() => {
    let animationTimer;
    if (animatingOut) {
      animationTimer = setTimeout(() => {
        hideModal();
      }, 300);
    }
    return () => clearTimeout(animationTimer);
  }, [animatingOut, hideModal]);

  // Trigger close animation
  const handleCloseAnimation = () => setAnimatingOut(true);

  // Prevent overlay clicks from closing modal
  const handleClick = (e) => e.stopPropagation();

  if (!modalState.open && !animatingOut) return null;

  // Determine size class
  let sizeClass =
    modalState.size === "large"
      ? styles.large
      : modalState.size === "medium"
        ? styles.medium
        : styles.small;

  // Add fullscreen class if toggled
  if (isFullScreen || (screenSize === "sm" && modalState.size === "large"))
    sizeClass += ` ${styles.fullScreen}`;

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${
        animatingOut ? styles.overlayAnimatingOut : ""
      }`}
      onClick={handleCloseAnimation}
      
    >

      
      <div className={`${styles.modal} ${sizeClass}`} onClick={handleClick}>
        
        <div
          className={`${styles.topBar} ${
            modalState.floatnav ? styles.floatingnav : styles.fixednav
          }`}
        >
          {!modalState.floatingnav && <h2>{modalState.title || ""}</h2>}

          <div className={styles.spacer} />
          {/* <h1>test {modalState.floatnav ? "TEST" : "SFSDFS"}</h1> */}
          {/* Buttons from modalState */}
          {modalState.buttons?.length > 0 && (
            <div className={styles.buttons}>
              {modalState.buttons.map((btn, i) => (
                <StandardButton
                  key={i}
                  label={btn.label}
                  type={btn.type || "default"}
                  onClick={btn.onClick || handleCloseAnimation}
                />
              ))}
            </div>
          )}

          {/* Fullscreen toggle only for large modals */}
          {modalState.size === "large" && screenSize !== "sm" && (
            <StandardButton
              label={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              type="rounded"
              icon={getIcon(isFullScreen ? "reduce" : "expand")}
              callback={() => setIsFullScreen((prev) => !prev)}
            />
          )}

          {/* Close button */}
          <StandardButton
            label="Close"
            type="rounded"
            icon={getIcon("close")}
            callback={handleCloseAnimation}
          />
        </div>

        <div className={styles.content}>
          {modalState.content || <p>No content provided.</p>}
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default ProperModal;
