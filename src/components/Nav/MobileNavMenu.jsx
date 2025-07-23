// components/DynamicNav/MobileNavMenu.jsx
import React, { useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./MobileMenuNav.module.scss";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { useTooltip } from "../../contexts/tooltip";
import getIcon from "../../utils/Iconifier";
import { DarkModeTile } from "../../components/darkmodeTile";
import WigglyLine from "../../components/Misc/WigglyLine";
import useScreenSize from "../../utils/screensize";
import routes from "../../routes/routes";

const MobileNavMenu = ({
  isCollapsed,
  isAnimatingIn,
  isAnimatingOut,
  isVisible,
  direction,
  triggerCollapseAnimation,
}) => {
  const screenSize = useScreenSize();
  const location = useLocation();
  const navigate = useNavigate();
  const navRef = useRef(null);
  const { showTooltip, hideTooltip } = useTooltip();
  const touchStartRef = useRef(null);

  const handleLinkClick = (path) => {
    triggerCollapseAnimation();
    navigate(path);
  };

  const miniNavItems = () => (
    <ul
      className={`${styles.navList} ${
        direction === "vertical" ? styles.vertical : ""
      }`}
    >
      {routes.map((route, i) => {
        if (route.hide) return null;

        return (
          <li key={i} className={`${styles.navItem} flatStyleShadow_NO_INTERACT`}>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(route.path);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                touchStartRef.current = e.timeStamp;
              }}
              onTouchEnd={(e) => {
                if (
                  touchStartRef.current &&
                  e.timeStamp - touchStartRef.current < 500
                ) {
                  e.preventDefault();
                  handleLinkClick(route.path);
                }
                touchStartRef.current = null;
              }}
              className={`${styles.link} ${
                location.pathname === route.path ? styles.activeLink : ""
              }`}
              onMouseMove={(e) => showTooltip(route.label, e)}
              onMouseLeave={hideTooltip}
            >
              <p>{getIcon(route.label)}</p>
              <p>&nbsp;</p>
              <p>{route.label}</p>
            </div>
          </li>
        );
      })}
      <li className={`${styles.navItem} flatStyleShadow_NO_INTERACT`}>
        <DarkModeTile />
      </li>
    </ul>
  );

  return (
    <>
      {(screenSize === "sm") && (
        <div
          className={`${styles.bgCover} ${
            !isVisible || isAnimatingOut ? styles.hide : styles.show
          }`}
          onClick={triggerCollapseAnimation}
          onTouchStart={triggerCollapseAnimation}
        />
      )}

      {isVisible && (
        <div
          ref={navRef}
          className={`${styles.miniNav} 
              ${isCollapsed ? styles.collapsed : styles.expanded} 
              ${direction === "vertical" ? styles.vertical : ""} 
              ${isAnimatingIn ? styles.animatingIn : ""}
              ${isAnimatingOut ? styles.animatingOut : ""}`}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {!isCollapsed && (
            <>
              <div
                className={`${styles.headerText} ${
                  isAnimatingIn ? styles.animatingIn : ""
                } ${isAnimatingOut ? styles.animatingOut : ""}`}
              >
                <h2>Thanks for checking out my things</h2>
                <p>
                  The junk page is really just a testing spot. Feel free to
                  flick me a pm
                </p>
                <div className={styles.dividerContainer}>
                  <WigglyLine />
                </div>
              </div>
              {miniNavItems()}
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MobileNavMenu;