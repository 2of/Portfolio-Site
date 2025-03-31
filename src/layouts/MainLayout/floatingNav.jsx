import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom"; // Import useLocation
import routes from "../../routes/routes";
import styles from './floatingNav.module.scss';
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { DarkModeTile } from "../../components/darkmodeTile";
import { TooltipProvider, useTooltip } from "../../contexts/tooltip";
const FloatingNav = () => {
  const [hasSlidIn, setHasSlidIn] = useState(false);
  const screenSize = useScreenSize();
  const { pushNavReplacementButton,
    popNavReplacementButton,
    getCurrentNavReplacementButton,
    navReplacementButtonStack, 
    hopNav, setHopNav, 
    disableForPopup, setDisableForPopUp } = useGlobalContext();



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
            ${screenSize === "sm" ? "" : ""}  
            ${styles.navContainer} 
            ${getCurrentNavReplacementButton.label ? styles.onlyButton : ""} 
            ${doJump ? styles.jump : ""}
            ${false ? styles.rightAlignFloat : ""}`}
        >
          <ul className={styles.navList}>
            {routes.map((route, i) => (
              <li key={i} className={styles.navItem}>
                <div
                  onClick={() => handleLinkClick(route.path)} // Use custom handler
                  className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""}`} // Apply active class manually
                  onMouseMove={(e) => showTooltip(route.label, e)}
                  onMouseLeave={hideTooltip}


                >

                  <p>
                    {getIcon(route.label)}
                  </p>

                  {/* <p> {screenSize === "sm" ? "" : route.label}</p> */}
                </div>
              </li>
            ))}
            <li className={styles.navItem}>
              <DarkModeToggle />
            </li>

            {/* Jump Button */}
            <li>
              {getCurrentNavReplacementButton().label && (
                <button className={styles.visibleButton} onClick={getCurrentNavReplacementButton.callback}>
                  <p> {getCurrentNavReplacementButton().label}</p>
                </button>
              )}
            </li>
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
                    className={`${styles.minilink} ${location.pathname === route.path ? styles.miniactiveLink : ""}`} // Apply active class manually
                  >
                    <p className={styles.miniLinkIcon}> {getIcon(route.label)}</p>
                    <p className={styles.miniLinkText}> {route.label} </p>
                  </div>
                </li>
              ))}
        {/* <button
        
        onClick={() => { 
          console.log(getCurrentNavReplacementButton())
          console.log(getCurrentNavReplacementButton().label)
        }}>test</button> */}
            <li>
              <div className={`${styles.menuButton} ${styles.minilink} ${styles.noAfter}`} onClick={handleMenuButtonClick}>
                <p className={styles.miniLinkIcon}> {getIcon("up")}</p>
                <p className={styles.miniLinkText}> {showExpand ? "back" : "more"} </p>
              </div>

              {getCurrentNavReplacementButton().label && (
                <div className={styles.visibleButton} onClick={getCurrentNavReplacementButton().callback}>
                  <h2> {getCurrentNavReplacementButton().label}</h2>
                </div>
              )}
            </li>
          </ul>

  

          <div className={`${styles.expandMenuPlatter} ${showExpand ? styles.visible : ""}`}>
            {routes.map((route, i) => (
              <li key={i} className={`${styles.expandednavitem} `}>
                <div
                  onClick={() => handleLinkClick(route.path)} // Use custom handler
                  className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""}`} // Apply active class manually
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