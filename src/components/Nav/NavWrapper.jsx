import React, { useState } from "react";
import { useScreenSize } from "../../contexts/ScreenSizeProvider";
import { useIsMenuFloating, useRoute } from "../../contexts/RouteContext";
import DesktopNav from "./DesktopNav";
import MobileNavMenu from "./MobileNavMenu";
import MobileIcon from "./MobileIcon";
import { NavBg } from "./NavBg";
import getIcon from "../../utils/Iconifier";
import { useGlobalContext } from "../../contexts/GlobalContext";
const DesktopWrapper = () => {
  return <DesktopNav />;
};

const MobileWrapper = ({
  floating,
  showMobileMenu,
  buttonCallback,
  navigateAwayCallback,
}) => {
  return (
    <>
      {!floating && (
        <NavBg
          menu={<MobileIconWrapper menuCallback={buttonCallback} />}
          buttons
        />
      )}

      {floating && <MobileIconWrapper menuCallback={buttonCallback}   isFloating  />}
      <MobileNavMenu
        isVisible={showMobileMenu}
        triggerCollapseAnimation={navigateAwayCallback}
      />
    </>
  );
};

const MobileIconWrapper = ({ menuOpenLabel = "Menu", menuCallback, isFloating }) => {
  const { navReplacementButtonStack } = useGlobalContext();
  const StackEmpty =
    !navReplacementButtonStack || navReplacementButtonStack.length === 0;

  if (StackEmpty) {
    return (
      <MobileIcon
        label={menuOpenLabel}
        icon={getIcon("menu")}
        currentCallback={menuCallback}
        isFloating={isFloating}
      />
    );
  }

  let current = navReplacementButtonStack[navReplacementButtonStack.length - 1];

  return (

    <>
    
    
        <MobileIcon
      icon={getIcon(current.label) || getIcon("close")}
      label={current.label}
      currentCallback={current.callback}
        isFloating={isFloating}
    />


    </>

  );
};

export const NavWrapper = () => {
  const { pushNavReplacementButton, popNavReplacementButton } =
    useGlobalContext();
  const screenSize = useScreenSize();
  const { navReplacementButtonStack } = useGlobalContext();
  const { currentRoute } = useRoute();
  // If the route explicitly disables nav
  const isFloating = useIsMenuFloating();
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const handleClickBaseCallback = () => {
    setShowMobileMenu((prev) => !prev);
    popNavReplacementButton();
  };

  const handleNavigateAway = () => {
    if (showMobileMenu) {
      setShowMobileMenu(false);
      popNavReplacementButton();
    }
  };

  const menuOpenHandle = (e) => {
    if (e) e.preventDefault();
    setShowMobileMenu((prev) => !prev);

    pushNavReplacementButton({
      callback: handleClickBaseCallback,

      label: "Close",
    });
  };

  return (
    <>
      {screenSize === "sm" ? (
        <MobileWrapper
          floating={isFloating}
          showMobileMenu={showMobileMenu}
          buttonCallback={menuOpenHandle}
          navigateAwayCallback={handleNavigateAway}
        />
      ) : (
        <DesktopWrapper />
      )}
    </>
  );
};
