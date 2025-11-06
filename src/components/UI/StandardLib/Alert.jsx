import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./Styles/Alert.module.scss";
import { StandardButton } from "./StandardButton.jsx";
import getIcon from "../../../utils/Iconifier.jsx";
import useScreenSize from "../../../utils/screensize.js";

import { useAlertMenu } from "../../../contexts/AlertMenuContext.jsx";

const Alert = () => {
  const { alertState, hideAlert } = useAlertMenu();
  const screenSize = useScreenSize();
  const [animatingOut, setAnimatingOut] = useState(false);

  useEffect(() => {
    let animationTimer;
    if (animatingOut) {
      animationTimer = setTimeout(() => {
        hideAlert(); // This will clean up the context state
      }, 300);
    }
    return () => clearTimeout(animationTimer);
  }, [animatingOut, hideAlert]);

  const handleCloseAnimation = () => {
    setAnimatingOut(true);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const getContent = () => {
    if (alertState.customContent) return alertState.customContent;
    if (alertState.type === "share") {
      return <ShareSheet onClose={handleCloseAnimation} shareData={alertState.shareData} />;
    }
    
    return (
      <>


        <h2>{alertState.title || "Attention!"} </h2>
  
        <div className={styles.message}>{alertState.message}</div>
        <div className={styles.actions}>
          {alertState.buttons.length > 0 &&  (
            alertState.buttons.map((button, index) => (
              <StandardButton
                key={index}
                label={button.label}
                callback={() => {
                  button.onClick?.();
                  handleCloseAnimation();
                }}
                type="article"
              />
            )))}
          
            <StandardButton
              label="Close"
              callback={handleCloseAnimation}
              type="article"
              className={styles.closeButton}
            />

        </div>
      </>
    );
  };

  if (!alertState.open && !animatingOut) return null;

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${
        animatingOut ? styles.overlayAnimatingOut : ""
      } ${ "" }`}
      onClick={handleCloseAnimation}
    >
      <div
        className={`${styles.dialog} ${
        styles.fulldialogue
        } ${animatingOut ? styles.dialogAnimatingOut : ""} ${styles[alertState.type]}`}
        onClick={handleClick}
      >
        {getContent()} 
        
        {/* // was kinda planning more here lol */}
      </div>
    </div>,
    document.body
  );
};

export default Alert;