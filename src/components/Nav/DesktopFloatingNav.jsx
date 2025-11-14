import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./styles/DesktopFloatingNav.module.scss";
import DarkModeToggle from "../UI/darkmodeToggleSmallInline.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeWrapper } from "../UI/DarkModeWrapper";
import { Logo } from "./Logo";
import GlassPushOverlay from "../UI/InteractionContainers/GlassContainer.jsx";
import { NudgeContainer } from "../UI/InteractionContainers/NudgeContainer.jsx";
import FeatherRevealImage from "../Misc/FeatherImageMouseTracked";
import FeatherTwoLayer from "../Misc/FeatherTwoLayer";
import { useIsMenuFloatingDesktop } from "../../contexts/RouteContext";
import { QuickLinksThing } from "../Misc/QuickLinksThing";

export const DesktopFloatingNav = () => {
  const screenSize = useScreenSize();
  const { getCurrentNavReplacementButton } = useGlobalContext();
  const ismenuFloating = useIsMenuFloatingDesktop();
  const location = useLocation();
  const { showTooltip, hideTooltip } = useTooltip();
  const [isSnapped, setIsSnapped] = useState(true);
  const [isFS, setisFS] = useState(false);
  const [routeChangeAnimating, setRouteChangeAnimating] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);
  const [wiggleTarget, setWiggleTarget] = useState(null);
  const visibleRoutes = routes.filter((route) => !route.hideDesktop);
  // Detect route change animation trigger
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

  if (screenSize === "sm") return null; // Do not render on small screens

  return (
    <nav
      className={`
        ${styles.navContainer}
        ${!ismenuFloating ? styles.fullwidth : styles.float}
        ${getCurrentNavReplacementButton().label ? styles.onlyButton : ""}
      `}
    >

      {/* <div className={styles.bgcontainer}>
  <FeatherTwoLayer alwaysListen/>


      </div> */}
    
      <ul className={styles.navList}>
        {/* <button onClick={() => setisFS(prev => !prev)}>test</button> */}

        <li className={styles.logoContainer}>
          <Link
            to={"/"}
            viewTransition
            className={`${styles.link}     }`}
            // onMouseMove={(e) => showTooltip(route.label, e)}
            // onMouseLeave={hideTooltip}
          >
            <Logo variant="small" />
            {/* </p> */}
          </Link>
        </li>
        {visibleRoutes.map((route, i) => {
          if (route.hide) return null;

          return (
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
                viewTransition
                className={`${styles.link} ${
                  location.pathname === route.path ? styles.activeLink : ""
                }                 }`}
                // onMouseMove={(e) => showTooltip(route.label, e)}
                // onMouseLeave={hideTooltip}
              >
                <p className={styles.routeItem}>
                  <span
                    key={route.path + (routeChangeAnimating ? "-anim" : "")}
                  >
                    {getIcon(route.icon ?? "home")}
                    {route.label}
                  </span>
                </p>
              </Link>
            </li>
          );
        })}

        <li>

        <QuickLinksThing/>
        </li>

        <li className={`${styles.navItem} ${styles.extrabuttonnav}`}>
          <DarkModeWrapper type="largepill" />
        </li>

        {/* <li>
               <DarkModeWrapper type="pill" />
        </li> */}
      </ul>

      {/* <DarkModeWrapper type="box" /> */}
    </nav>
  );
};
