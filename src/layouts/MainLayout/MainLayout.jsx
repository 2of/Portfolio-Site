import React, { useRef, useEffect, useState } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingNav from "./floatingNav";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Disclaimer } from "../../components/disclaimer";
import { DynamicNav } from "./MobileNav";
import useScreenSize from "../../utils/screensize";
import ShareDialog from "../../components/Misc/ShareSheet";
// import BackgroundArt from "../../components/Background/PhysicsShapes";
import { Background } from "../../components/Background/background";

import { useAlertMenu } from "../../contexts/AlertMenuContext";
import Alert from "../../components/UI/Alert";
import { ScrollIndicator } from "../../components/UI/ScrollIndicator";
const MainLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const screenSize = useScreenSize();

  const {alertVisible} = useAlertMenu();
  const {
    disableForPopup,
    disablePopupClickOffCallback,
    openShareSheet,
    closeShareSheet,
    shareSheetVisible,
    shareURL,
    shareService,
    scrollIndicatorStatus
  } = useGlobalContext();

  const normalizedKey = location.pathname === "/" ? "root" : location.pathname;

  const handleMainClick = () => {
    if (disableForPopup && disablePopupClickOffCallback) {
      disablePopupClickOffCallback();
    }
    if (shareSheetVisible) {
      closeShareSheet();
    }
  };

  const [blurEffect, setBlurEffect] = useState(disableForPopup);
  useEffect(() => {
    // setBlurEffect(disableForPopup);
  }, [disableForPopup]);

  const blurStyle = {
    filter: blurEffect || shareSheetVisible ? "brightness(0.2) blur(12px)" : "none",
    pointerEvents: blurEffect ? "none" : "auto",
    overflow: "hidden",
    transition: "filter 0.2s ease-out, pointer-events 0s linear 0.3s",
  };

  return (
    <div className={styles.mainLayout}>
      <Disclaimer title={"🚧 🚧"} text={"Work in Progress"} />
    {alertVisible && (
      <Alert/>
    )}
    {scrollIndicatorStatus.display && (
       <ScrollIndicator/>
    )}


    {/* <Alert/> */}
      {shareSheetVisible && (
        <ShareDialog
          url={shareURL}
          service={shareService}
          onClose={closeShareSheet}
        />
      )}

      {}

      <main className={styles.mainContent}>

    <Background/>
        <TransitionGroup component={null}>
          <CSSTransition
            nodeRef={nodeRef}
            key={normalizedKey}
            timeout={320}
            classNames={{
              enter: styles.pageTransitionEnter,
              enterActive: styles.pageTransitionEnterActive,
              exit: styles.pageTransitionExit,
              exitActive: styles.pageTransitionExitActive,
            }}
            appear={true}
          >
            {screenSize !== "sm" ? (
              <div ref={nodeRef} className={disableForPopup ? styles.disable : ""}>
                <Outlet context={{ openShareSheet}} />
              </div>
            ) : (
              <div
                ref={nodeRef}
                className={disableForPopup ? styles.disable : ""}
                style={blurStyle}
              >
                <Outlet context={{ openShareSheet }} />
              </div>
            )}
          </CSSTransition>
        </TransitionGroup>
      </main>

      {screenSize !== "sm" ? <FloatingNav /> : <DynamicNav />}
    </div>
  );
};

export default MainLayout;