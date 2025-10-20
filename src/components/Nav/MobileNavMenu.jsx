import React, { useRef, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./styles/MobileMenuNav.module.scss";
import { useTooltip } from "../../contexts/tooltip";
import getIcon from "../../utils/Iconifier";
import { DarkModeTile } from "../../components/darkmodeTile";
import WigglyLine from "../../components/Misc/WigglyLine";
import useScreenSize from "../../utils/screensize";
import routes from "../../routes/routes";
import TrackedGradientBG from "../Background/TrackedGradientBg";

const MobileNavMenu = ({
  isCollapsed,
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

  // Internal state to keep menu mounted while animating out
  const [rendered, setRendered] = useState(isVisible);

  useEffect(() => {
    if (isVisible) {
      setRendered(true); // mount menu for animation
    } else {
      const timer = setTimeout(() => setRendered(false), 500); // match CSS animation duration
      return () => clearTimeout(timer);
    }
  }, [isVisible]);

  const handleLinkClick = (path) => {
    triggerCollapseAnimation();
    navigate(path);
  };

  const miniNavItems = () => (
    <ul
      className={`${styles.navList} ${direction === "vertical" ? styles.vertical : ""}`}
    >
      {routes.map((route, i) => {
        if (route.hideMobile) return null;
        return (
          <li key={i} className={`${styles.navItem} `}>
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
              className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""}`}
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

  if (!rendered) return null;

  return (
    <>
      {screenSize === "sm" && (
        <div
          className={`${styles.bgCover} ${isVisible ? styles.show : styles.hide}`}
          onClick={triggerCollapseAnimation}
          onTouchStart={triggerCollapseAnimation}
        >
          {/* <TrackedGradientBG /> */}
        </div>
      )}

      <div
        ref={navRef}
        className={`${styles.miniNav}
          ${isCollapsed ? styles.collapsed : styles.expanded}
          ${direction === "vertical" ? styles.vertical : ""}
          ${isVisible ? styles.animatingIn : styles.animatingOut}`}
        onClick={(e) => e.stopPropagation()}
        onTouchStart={(e) => e.stopPropagation()}
      >
        {!isCollapsed && (
          <>
            <div
              className={`${styles.headerText} ${isVisible ? styles.animatingIn : styles.animatingOut}`}
            >
              <h2>Thanks for checking out my things</h2>
              {/* <p>
                The junk page is really just a testing spot. Feel free to flick
                me a pm
              </p> */}
              <div className={styles.dividerContainer}>
                <WigglyLine />
              </div>
            </div>
            {miniNavItems()}
          </>
        )}
      </div>
    </>
  );
};

export default MobileNavMenu;
