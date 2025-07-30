import React, { useRef } from "react";
import { useLocation, Outlet } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import styles from "./MainLayout.module.scss";
import { useGlobalContext } from "../../contexts/GlobalContext";
import FloatingNav from "./floatingNav";
import { DynamicNav } from "./MobileNav";
import ShareDialog from "../../components/Misc/ShareSheet";
import { Background } from "../../components/Background/background";
import { useScreenSize } from "../../contexts/ScreenSizeProvider";
import { useAlertMenu } from "../../contexts/AlertMenuContext";
import Alert from "../../components/UI/Alert";
import { ScrollIndicator } from "../../components/UI/ScrollIndicator";
import { Disclaimer } from "../../components/disclaimer";

const MainLayout = () => {
  const location = useLocation();
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

  const handleMainClick = () => {
    if (disableForPopup && disablePopupClickOffCallback) {
      disablePopupClickOffCallback();
    }
    if (shareSheetVisible) {
      closeShareSheet();
    }
  };

  const blurStyle = {
    filter:
      shareSheetVisible || disableForPopup
        ? "brightness(0.2) blur(12px)"
        : "none",
    pointerEvents: disableForPopup ? "none" : "auto",
    overflow: "hidden",
    transition: "filter 0.2s ease-out, pointer-events 0s linear 0.3s",
  };

  const nodeRef = useRef(null);

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
            key={location.pathname}
            classNames={{
              enter: styles.pageTransitionEnter,
              enterActive: styles.pageTransitionEnterActive,
              exit: styles.pageTransitionExit,
              exitActive: styles.pageTransitionExitActive,
            }}
            timeout={400}
            nodeRef={nodeRef}
          >
            <div
              ref={nodeRef}
              className={disableForPopup ? styles.disable : styles.ContentContainer}
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