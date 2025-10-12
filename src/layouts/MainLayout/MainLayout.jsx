import React, { useRef, useCallback } from "react";
import { useLocation } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { useGlobalContext } from "../../contexts/GlobalContext";
import Background from "../../components/Background/background";
import { useScreenSize } from "../../contexts/ScreenSizeProvider";
import { useAlertMenu } from "../../contexts/AlertMenuContext";
import Alert from "../../components/UI/Alert";
import { ScrollIndicator } from "../../components/UI/ScrollIndicator";
import { Disclaimer } from "../../components/disclaimer";
import NavWrapper from "../../components/Nav/NavWrapper";
import { Outlet } from "react-router-dom";
import ShareDialog from "../../components/Misc/ShareSheet";
import {
  useIsDesktopPaded,
  useIsMenuFloatingMobile,
} from "../../contexts/RouteContext";
import { useModal } from "../../contexts/ModalContext";
import ProperModal from "../../components/UI/ProperModal";












export const DesktopLayout = React.memo(
  ({ disableForPopup, isPaddedDesktop, nodeRef, location, openShareSheet }) => {
    const outletContext = React.useMemo(() => ({ openShareSheet }), [openShareSheet]);

    return (
      <div
        key={location.key}
        ref={nodeRef}
        className={`
          ${disableForPopup ? styles.disable : styles.ContentContainer} 
          ${isPaddedDesktop ? styles.DesktopStandard : styles.DesktopFull} 
          ${styles.fadeIn}
        `}
      >
        <Outlet context={outletContext} />
      </div>
    );
  }
);

export const MobileLayout = React.memo(
  ({ disableForPopup, isMenuFloatingMobile, nodeRef, location, openShareSheet }) => {
    const outletContext = React.useMemo(() => ({ openShareSheet }), [openShareSheet]);

    return (
      <div
        key={location.key}
        ref={nodeRef}
        className={`
          ${disableForPopup ? styles.disable : styles.ContentContainer} 
          ${isMenuFloatingMobile ? styles.MobileFullscreen : styles.MobileNavBar} 
          ${styles.fadeIn}
        `}
      >

        {/* blah blah {isMenuFloatingMobile && "TRue"} */}
        <Outlet context={outletContext} />
      </div>
    );
  }
);
const MainLayout = () => {
  const location = useLocation();
  const screenSize = useScreenSize();
  const { alertVisible } = useAlertMenu();
  const {modalVisible} = useModal();
  const isMenuFloatingMobile = useIsMenuFloatingMobile();
  const isPaddedDesktop = useIsDesktopPaded();

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

  const handleMainClick = useCallback(() => {
    if (disableForPopup && disablePopupClickOffCallback) {
      disablePopupClickOffCallback();
    }
    if (shareSheetVisible) closeShareSheet();
  }, [disableForPopup, disablePopupClickOffCallback, shareSheetVisible, closeShareSheet]);

  const nodeRef = useRef(null);

  return (
    <>
      {alertVisible && <Alert />}
      {modalVisible && <ProperModal/>}
      {/* {<ProperModal />} */}
      {scrollIndicatorStatus.display && <ScrollIndicator />}
      {shareSheetVisible && (
        <ShareDialog
          url={shareURL}
          service={shareService}
          onClose={closeShareSheet}
        />
      )}
 <Background />
      <NavWrapper />
    
      <main className={styles.mainContent} onClick={handleMainClick}>
   

        {screenSize === "sm" ? (
          <MobileLayout
            disableForPopup={disableForPopup}
            isMenuFloatingMobile={isMenuFloatingMobile}
            nodeRef={nodeRef}
            location={location}
            openShareSheet={openShareSheet}
          />
        ) : (
          <DesktopLayout
            disableForPopup={disableForPopup}
            isPaddedDesktop={isPaddedDesktop}
            nodeRef={nodeRef}
            location={location}
            openShareSheet={openShareSheet}
          />
        )}
      </main>
    </>
  );
};

export default MainLayout;