import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import routes from "../../routes/routes";
import styles from './floatingNav.module.scss';
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { DarkModeTile } from "../../components/darkmodeTile";

const FloatingNav = () => {
  const [hasSlidIn, setHasSlidIn] = useState(false);
  const screenSize = useScreenSize();
  const { navReplacementButtonFunc, hopNav, setHopNav, disableForPopup, setDisableForPopUp } = useGlobalContext();
  const [doJump, setDoJump] = useState(false);
  const [showExpand, setshowExpand] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Hook to get the current route's path

  useEffect(() => {
    const timer = setTimeout(() => {
      setHasSlidIn(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

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
    // Example: Close the expanded menu on small screens
    if (screenSize === "sm") {
      setshowExpand(false);
    }

    // Navigate to the new route
    navigate(path);
  };

  const handleMenuButtonClick = () => {
    setshowExpand((prev) => !prev);
    setDisableForPopUp(!showExpand);
  };

  const [miniButtonsPriority] = useState(['home', 'projects']);

  return (
    <>
      {screenSize === "md" || screenSize === "lg" ? (
        <nav
          className={`
            ${screenSize === "sm" ? styles.sm : styles.float}
            ${screenSize === "sm" ? "glass" : ""}  
            ${styles.navContainer} 
            ${navReplacementButtonFunc.label ? styles.onlyButton : ""} 
            ${doJump ? styles.jump : ""}`}
        >
          <ul className={styles.navList}>
            {routes.map((route, i) => (
              <li key={i} className={styles.navItem}>
                <div
                  onClick={() => handleLinkClick(route.path)} // Use custom handler
                  className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""}`} // Apply active class manually
                >
                  {getIcon(route.label)}
                  {screenSize === "sm" ? "" : route.label}
                </div>
              </li>
            ))}
            <li className={styles.navItem}>
              <DarkModeToggle />
            </li>

            {/* Jump Button */}
            <li>
              {navReplacementButtonFunc.label && (
                <button className={styles.visibleButton} onClick={navReplacementButtonFunc.callback}>
                  <h2> {navReplacementButtonFunc.label}</h2>
                </button>
              )}
            </li>
          </ul>
        </nav>
      ) : (
        <nav
          className={`${screenSize === "sm" ? styles.sm : styles.float} 
            ${screenSize === "sm" ? "glass" : ""} 
            ${styles.navContainer} 
            ${navReplacementButtonFunc.label ? styles.onlyButton : ""}
            ${showExpand ? styles.expandedMenu : ""}`}
        >
          <ul className={styles.navList}>
            {routes
              .filter((route) => miniButtonsPriority.includes(route.label))
              .map((route, i) => (
                <li key={i} className={styles.navItem}>
                  <div
                    onClick={() => handleLinkClick(route.path)} // Use custom handler
                    className={`${styles.minilink} ${location.pathname === route.path ? styles.miniactiveLink : ""}`} // Apply active class manually
                  >
                    <p className={styles.miniLinkIcon}> {getIcon(route.label)}</p>
                    <p className={styles.miniLinkText}> {route.label} </p>
                  </div>
                </li>
              ))}

            <li>
              <div className={`${styles.menuButton} ${styles.minilink}`} onClick={handleMenuButtonClick}>
                <p className={styles.miniLinkIcon}> {getIcon("up")}</p>
                <p className={styles.miniLinkText}> expand </p>
              </div>

              {navReplacementButtonFunc.label && (
                <div className={styles.visibleButton} onClick={navReplacementButtonFunc.callback}>
                  <h2> {navReplacementButtonFunc.label}</h2>
                </div>
              )}
            </li>
          </ul>

          <div className={`${styles.expandMenuPlatter} ${showExpand ? styles.visible : ""}`}>
            {routes.map((route, i) => (
              <li key={i} className={`${styles.expandednavitem} glassButton`}>
                <div
                  onClick={() => handleLinkClick(route.path)} // Use custom handler
                  className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""}`} // Apply active class manually
                >
                  <p>{getIcon(route.label)}</p>
                  <p> {route.label}</p>
                </div>
              </li>
            ))}

            <li className={`${styles.darkmodeExpandtile} glassButton`}>
              <DarkModeTile />
            </li>
          </div>
        </nav>
      )}
    </>
  );
};

export default FloatingNav;