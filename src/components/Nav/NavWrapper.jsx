import React, { useState, useCallback, useMemo } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeProvider";
import {
  useIsMenuFloatingDesktop,
  useIsMenuFloatingMobile,
  useRoute,
} from "../../contexts/RouteContext";
import DesktopNav from "./DesktopNav";
import MobileNavMenu from "./MobileNavMenu";
import { NavMenuIconMobile } from "./MobileIcon";
import { NavBg } from "./NavBg";
import getIcon from "../../utils/Iconifier";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { DesktopFloatingNav } from "./DesktopFloatingNav";
import { DesktopNavFullWidth } from "./DesktopNavFullWidth";
import { useNavStack } from "../../contexts/NavStackContext";
import { MobileExtraButtonsContainer } from "./MobileExtraIcons";

// -------------------- DESKTOP WRAPPER --------------------
const DesktopWrapper = React.memo(() => {
  return <DesktopNav />;
});

// -------------------- MOBILE ICON WRAPPER --------------------
const MobileIconWrapper = React.memo(
  ({ menuOpenLabel = "Menu", menuCallback, isFloating }) => {
    const { navReplacementButtonStack } = useGlobalContext();

    const { navstack } = useNavStack();

    const current = useMemo(() => {
      if (!navstack || navstack.length === 0) {
        return null;
      }
      return navstack[navstack.length - 1];
    }, [navstack]);

    if (!current) {
      return (
        <NavMenuIconMobile
          label={menuOpenLabel}
          icon={getIcon("menu")}
          currentCallback={menuCallback}
          isFloating={isFloating}
        />
      );
    }

    return (
      <NavMenuIconMobile
        icon={getIcon(current.label) || getIcon("close")}
        label={current.label}
        currentCallback={current.callback}
        isFloating={isFloating}
      />
    );
  }
);

// -------------------- MOBILE WRAPPER --------------------
const MobileWrapper = React.memo(
  ({ floating, showMobileMenu, buttonCallback, navigateAwayCallback }) => {
    return (
      <>
        {!floating && (
          <NavBg
            menu={<MobileIconWrapper menuCallback={buttonCallback} />}
            buttons
          />
        )}

        {floating && (
          <MobileIconWrapper menuCallback={buttonCallback} isFloating />
        )}
        <MobileNavMenu
          isVisible={showMobileMenu}
          triggerCollapseAnimation={navigateAwayCallback}
        />
      </>
    );
  }
);

// -------------------- MAIN NAV WRAPPER --------------------
const NavWrapper = () => {
  const { pushNavReplacementButton, popNavReplacementButton } =
    useGlobalContext();
  const { navstack, pushNav, popNav, clearStack, extraButtons } = useNavStack();
  const screenSize = useScreenSize();
  const { currentRoute } = useRoute();
  const isMenuFloatingDesktop = useIsMenuFloatingDesktop();
  const isMenuFloatingMobile = useIsMenuFloatingMobile();

  const [showMobileMenu, setShowMobileMenu] = useState(false);

  // Callbacks stable across renders
  const handleClickBaseCallback = useCallback(() => {
    setShowMobileMenu((prev) => !prev);
    // popNavReplacementButton();
    popNav();
  }, [popNav]);

  const handleNavigateAway = useCallback(() => {
    if (showMobileMenu) {
      clearStack();
      setShowMobileMenu(false);
      popNavReplacementButton();
    }
  }, [showMobileMenu, popNavReplacementButton]);

  const menuOpenHandle2 = useCallback(
    (e) => {
      if (e) e.preventDefault();
      setShowMobileMenu((prev) => !prev);

      pushNavReplacementButton({
        callback: handleClickBaseCallback,
        label: "Close",
      });
    },
    [pushNavReplacementButton, handleClickBaseCallback]
  );

  const menuOpenHandle = useCallback(
    (e) => {
      if (e) e.preventDefault();
      setShowMobileMenu((prev) => !prev);

      pushNav({
        callback: handleClickBaseCallback,
        label: "Close",
      });
    },
    [pushNav, handleClickBaseCallback]
  );

  return (
    <>
      {screenSize === "sm" ? (
        <>
          <MobileWrapper
            floating={isMenuFloatingMobile}
            showMobileMenu={showMobileMenu}
            buttonCallback={menuOpenHandle}
            navigateAwayCallback={handleNavigateAway}
          />

          {extraButtons.length > 0 && isMenuFloatingDesktop && ( 

<MobileExtraButtonsContainer items={extraButtons}/>

          )}
        </>
      ) : (
        <>
        
          {isMenuFloatingDesktop ? (
            <DesktopFloatingNav />
          ) : (
            <DesktopNavFullWidth />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(NavWrapper);
