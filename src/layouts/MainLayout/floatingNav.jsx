import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import routes from "../../routes/routes";
import styles from "./floatingNav.module.scss";
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { DarkModeTile } from "../../components/darkmodeTile";
import { TooltipProvider, useTooltip } from "../../contexts/tooltip";

// THE FS NAV ONLY. Handles small but is not displayed on small screens

const FloatingNav = () => {
  const [hasSlidIn, setHasSlidIn] = useState(false);
  const screenSize = useScreenSize();
  const {
    pushNavReplacementButton,
    popNavReplacementButton,
    getCurrentNavReplacementButton,
    navReplacementButtonStack,
    hopNav,
    setHopNav,
    disableForPopup,
    setDisableForPopUp,
  } = useGlobalContext();

  const [routeChangeAnimating, setRouteChangeAnimating] = useState(false);

  const [doJump, setDoJump] = useState(false);
  const [showExpand, setshowExpand] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route's path
  const { showTooltip, hideTooltip } = useTooltip();
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSlidIn(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);
  const [activePath, setActivePath] = useState(location.pathname);
  const [wiggleTarget, setWiggleTarget] = useState(null);

  useEffect(() => {
    if (location.pathname !== activePath) {
      setWiggleTarget(location.pathname);
      setActivePath(location.pathname);
      setRouteChangeAnimating(true);

      const timer = setTimeout(() => {
        setWiggleTarget(null);
        setRouteChangeAnimating(false);
      }, 700); // Match longest animation duration

      return () => clearTimeout(timer);
    }
  }, [location.pathname, activePath]);
  useEffect(() => {
    if (hopNav) {
      setDoJump(true);
      setTimeout(() => {
        setDoJump(false);
        setHopNav(false);
      }, 1000); // Reset after animation duration
    }
  }, [hopNav, setHopNav]);

  const handleJump = () => {
    setDoJump(true);
    setTimeout(() => setDoJump(false), 1000); // Reset after animation duration
  };

  const handleLinkClick = (path) => {
    // Perform additional logic here
    console.log("Navigating to:", path);
    setDisableForPopUp(false);

    if (screenSize === "sm") {
      setshowExpand(false);
    }

    // Navigate to the new route ... ok
    navigate(path);
  };

  const handleMenuButtonClick = () => {
    setshowExpand((prev) => !prev);
    setDisableForPopUp(!showExpand);
  };

  const [miniButtonsPriority] = useState(["home", "projects"]);

  return (
    <>
      {screenSize === "md" || screenSize === "lg" ? (
        <nav
          className={`
            ${screenSize === "sm" ? styles.sm : styles.float}
            ${screenSize === "sm" ? "" : ""}  
            ${styles.navContainer} 
            ${getCurrentNavReplacementButton.label ? styles.onlyButton : ""} 
            ${doJump ? styles.jump : ""}
            ${false ? styles.rightAlignFloat : ""}`}
        >
          <ul className={styles.navList}>
            {routes.map((route, i) => {
              if (route.hide) return null; // ❗️ Skip hidden routes

              return (
                <li key={i} className={styles.navItem}>
                  <div
                    onClick={() => handleLinkClick(route.path)}
                    className={`${styles.link} ${
                      location.pathname === route.path ? styles.activeLink : ""
                    }`}
                    onMouseMove={(e) => showTooltip(route.label, e)}
                    onMouseLeave={hideTooltip}
                  >
                    <p className={styles.routeItem}>
                      <span
                        key={route.path + (routeChangeAnimating ? "-anim" : "")}
                        className={
                          routeChangeAnimating
                            ? location.pathname === route.path
                              ? styles.wiggleIcon
                              : styles.boopIcon
                            : ""
                        }
                      >
                        {getIcon(route?.icon ?? "home")}
                      </span>
                    </p>
                  </div>
                </li>
              );
            })}

            <li className={styles.navItem}>
              <DarkModeToggle />
            </li>

            <li>{/* Jump button or additional items */}</li>
          </ul>
        </nav>
      ) : (
        <nav
          className={`${screenSize === "sm" ? styles.sm : styles.float} 
            ${screenSize === "sm" ? "" : ""} 
            ${styles.navContainer} 
            ${getCurrentNavReplacementButton().label ? styles.onlyButton : ""}
            ${showExpand ? styles.expandedMenu : ""}`}
        >
          <ul className={styles.navList}>
            {routes
              .filter((route) => miniButtonsPriority.includes(route.label))
              .map((route, i) => (
                <li key={i} className={styles.navItem}>
                  <div
                    onClick={() => handleLinkClick(route.path)} // Use custom handler
                    className={`${styles.minilink} ${
                      location.pathname === route.path
                        ? styles.miniactiveLink
                        : ""
                    }`} // Apply active class manually
                  >
                    <p className={styles.miniLinkIcon}>
                      {" "}
                      {getIcon(route.label)}
                    </p>
                    <p className={styles.miniLinkText}> {route.label} </p> test
                  </div>
                </li>
              ))}

            <li>
              <div
                className={`${styles.menuButton} ${styles.minilink} ${styles.noAfter}`}
                onClick={handleMenuButtonClick}
              >
                <p className={styles.miniLinkIcon}> {getIcon("up")}</p>
                <p className={styles.miniLinkText}>
                  {" "}
                  {showExpand ? "back" : "more"}{" "}
                </p>
              </div>

              {getCurrentNavReplacementButton().label && (
                <div
                  className={styles.visibleButton}
                  onClick={getCurrentNavReplacementButton().callback}
                >
                  <h2> {getCurrentNavReplacementButton().label}</h2>
                  test test
                </div>
              )}
            </li>
          </ul>

          {/* The following is unreachable in current implementation... */}
          <div
            className={`${styles.expandMenuPlatter} ${
              showExpand ? styles.visible : ""
            }`}
          >
            {routes.map((route, i) => (
              <li key={i} className={`${styles.expandednavitem} `}>
                <div
                  onClick={() => handleLinkClick(route.path)} // Use custom handler
                  className={`${styles.link} ${
                    location.pathname === route.path ? styles.activeLink : ""
                  }`} // Apply active class manually
                >
                  <p>{getIcon(route.label)}</p>
                  <p> {route.label}</p>
                </div>
              </li>
            ))}

            <li className={`${styles.darkmodeExpandtile} `}>
              <DarkModeTile />
            </li>
          </div>
        </nav>
      )}
    </>
  );
};

export default FloatingNav;
