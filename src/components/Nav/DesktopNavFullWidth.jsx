import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./styles/DesktopNavFullWidth.module.scss";
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeWrapper } from "../UI/DarkModeWrapper";
import { Logo } from "./Logo";
import { useIsMenuFloatingDesktop } from "../../contexts/RouteContext";
import { StandardButton } from "../UI/StandardButton";
import { LinearGradient } from "@react-pdf/renderer";
import FeatherRevealImage from "../Misc/FeatherImageMouseTracked";
import FeatherTwoLayer from "../Misc/FeatherTwoLayer";

export const DesktopNavFullWidth = () => {
  const screenSize = useScreenSize();
  const { getCurrentNavReplacementButton } = useGlobalContext();
  const isMenuFloating = useIsMenuFloatingDesktop();
  const location = useLocation();
  const { showTooltip, hideTooltip } = useTooltip();
  const [isSnapped, setIsSnapped] = useState(true);
  const [routeChangeAnimating, setRouteChangeAnimating] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);
  const [wiggleTarget, setWiggleTarget] = useState(null);
  const { openShareSheet } = useGlobalContext();

  const handleShare = useCallback(() => {
    openShareSheet(
      window.location.href,
      "twitter",
      "Noah's Portfolio @ 2of.io",
      "hello"
    );
  }, [openShareSheet]); // Dependencies for useCallback
  // Detect route change for animation triggers
  useEffect(() => {
    if (location.pathname !== activePath) {
      setWiggleTarget(location.pathname);
      setActivePath(location.pathname);
      setRouteChangeAnimating(true);

      const timer = setTimeout(() => {
        setWiggleTarget(null);
        setRouteChangeAnimating(false);
      }, 700);

      return () => clearTimeout(timer);
    }
  }, [location.pathname, activePath]);

  if (screenSize === "sm") return null; // Hide on small screens

  // Only visible routes in nav
  const visibleRoutes = routes.filter((route) => !route.hideDesktop);
  const { getLink } = useGlobalContext();
  const pathVisibleInNav = visibleRoutes.some(
    (route) => route.path === location.pathname
  );

  return (
    <nav
      className={`
        ${styles.navContainer}
        ${!isMenuFloating ? styles.fullwidth : styles.float}
        ${getCurrentNavReplacementButton().label ? styles.onlyButton : ""}
      `}
    >
      {/* <div className={styles.bgcontainer}>
  <FeatherTwoLayer alwaysListen/>


      </div> */}
    
      <ul className={styles.navList}>
     <li className={`${styles.logoContainer} ${styles.link}`}>
             <Link
               to={"/"}
               viewTransition
               className={`${styles.link} }`}
               // onMouseMove={(e) => showTooltip(route.label, e)}
               // onMouseLeave={hideTooltip}
             >
               <Logo variant="small" />
               {/* </p> */}
             </Link>
           </li>

        {visibleRoutes.map((route, i) => (
          <li
            key={i}
            className={`${styles.navItem} ${
              routeChangeAnimating
                ? location.pathname === route.path
                  ? styles.wiggleIcon
                  : styles.boopIcon
                : ""
            }`}
          >
            <Link
              to={route.path}
              className={`${styles.link} ${
                location.pathname === route.path ? styles.activeLink : ""
              }`}
              // onMouseMove={(e) => showTooltip(route.label, e)}
              // onMouseLeave={hideTooltip}
            >
              <p className={styles.routeItem}>
                <span key={route.path + (routeChangeAnimating ? "-anim" : "")}>
                  {getIcon(route.icon ?? "home")}
                  {route.label}
                </span>
              </p>
            </Link>
          </li>
        ))}

        {/* Fallback for hidden or unknown routes */}
        {!pathVisibleInNav && (
          <li className={`${styles.customFallback}`}>
            <Link>
              <p className={styles.routeItem}>
                --
                {/* {getIcon("portfolio")} */}
                {location.pathname}
              </p>
            </Link>
          </li>
        )}
        

        <li className={styles.spacer}></li>

       

        <ul className={styles.SocialButtons}>
          



          <li className={` ${styles.rightnav}`}>
            <StandardButton
              label="Github"
              tooltip="Navigate to resume"
              type="rounded_label"
              icon={getIcon("github")}
              link={getLink("github")}
              // external={true}
              nointeractEffects={true}
            />
          </li>
          <li className={` ${styles.rightnav}`}>
            <StandardButton
              label="LinkedIn"
              tooltip="Navigate to LinkedIn"
              type="rounded_label"
              highlight={false}
              icon={getIcon("linkedin")}
              link={getLink("linkedin")}
              // external={true}
              nointeractEffects={true}
            />
          </li>
        
          
                    {/* <li>•</li> */}
                    
                    
                    <li className={` ${styles.rightnav}`}>
            <StandardButton
              label="share"
              icon={getIcon("share")}
              callback={handleShare} // Use the memoized callback
              type="rounded_label"
              fillContainer={false}
              nointeractEffects={true}
            />
          </li>
          
        </ul>
         <li className={`${styles.navItem} ${styles.rightnav}`}>
          <DarkModeWrapper type="largepill" />
        </li>
      </ul>
    </nav>
  );
};
