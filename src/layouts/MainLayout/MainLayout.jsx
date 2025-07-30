import React, { useRef, useEffect, useState } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingNav from "./floatingNav";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Disclaimer } from "../../components/disclaimer";
import { DynamicNav } from "./MobileNav";
import ShareDialog from "../../components/Misc/ShareSheet";
import { Background } from "../../components/Background/background";
import { useScreenSize } from "../../contexts/ScreenSizeProvider";
import { useAlertMenu } from "../../contexts/AlertMenuContext";
import Alert from "../../components/UI/Alert";
import { ScrollIndicator } from "../../components/UI/ScrollIndicator";

const MainLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const screenSize = useScreenSize();

  const { alertVisible } = useAlertMenu();
  const {
    disableForPopup,
    disablePopupClickOffCallback,
    openShareSheet,
    closeShareSheet,
    shareSheetVisible,
    shareURL,
    shareService,
    scrollIndicatorStatus,
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

  const blurStyle = {
    filter: shareSheetVisible || disableForPopup ? "brightness(0.2) blur(12px)" : "none",
    pointerEvents: disableForPopup ? "none" : "auto",
    overflow: "hidden",
    transition: "filter 0.2s ease-out, pointer-events 0s linear 0.3s",
  };

  return (
    <>
      <Disclaimer title={"🚧 🚧"} text={"Work in Progress"} />

      {alertVisible && <Alert />}
      {scrollIndicatorStatus.display && <ScrollIndicator />}

      {shareSheetVisible && (
        <ShareDialog
          url={shareURL}
          service={shareService}
          onClose={closeShareSheet}
        />
      )}

      <main className={styles.mainContent} onClick={handleMainClick}>
        <Background />

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
          >
            <div
              ref={nodeRef}
              className={disableForPopup ? styles.disable : ""}
              style={screenSize === "sm" ? blurStyle : undefined}
            >
              <Outlet context={{ openShareSheet }} />
            </div>
          </CSSTransition>
        </TransitionGroup>
      </main>

      {screenSize !== "sm" ? <FloatingNav /> : <DynamicNav />}
    </>
  );
};

export default MainLayout;