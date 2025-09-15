import React, { useRef, useEffect, useState } from "react";
import { useLocation, Outlet } from "react-router-dom";
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
import { NavWrapper } from "../../components/Nav/NavWrapper";

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

  const blurStyle ={}
  const nodeRef = useRef(null);
  const [fadeIn, setFadeIn] = useState(false);

  // Trigger fade-in on route change
  useEffect(() => {
    setFadeIn(false);
    const timeout = setTimeout(() => setFadeIn(true), 10); // next tick
    return () => clearTimeout(timeout);
  }, [location.pathname]);

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
   <NavWrapper/>
      <main className={styles.mainContent} onClick={handleMainClick}>
        <Background />

        <div
          key={location.pathname}
          ref={nodeRef}
          className={`${disableForPopup ? styles.disable : styles.ContentContainer} ${
            fadeIn ? styles.fadeIn : ""
          }`}
          style={screenSize === "sm" ? blurStyle : undefined}
        >
          <Outlet context={{ openShareSheet }} />
        </div>
      </main>
       
      {/* {screenSize !== "sm" ? <FloatingNav /> : <DynamicNav />} */}
    </>
  );
};

export default MainLayout;