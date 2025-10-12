import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./styles/DesktopNav.module.scss";
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeWrapper } from "../UI/DarkModeWrapper";

const DesktopNav = () => {
  const screenSize = useScreenSize();
  const { getCurrentNavReplacementButton } = useGlobalContext();
  const location = useLocation();
  const { showTooltip, hideTooltip } = useTooltip();

  const [routeChangeAnimating, setRouteChangeAnimating] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);
  const [wiggleTarget, setWiggleTarget] = useState(null);

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
        ${getCurrentNavReplacementButton().label ? styles.onlyButton : ""}
      `}
    >
      <ul className={styles.navList}>
        {routes.map((route, i) => {
          if (route.hide) return null;

          return (
            <li key={i} className={styles.navItem}>
              <Link
                to={route.path}
                viewTransition
                className={`${styles.link} ${
                  location.pathname === route.path ? styles.activeLink : ""


                } ${routeChangeAnimating
                        ? location.pathname === route.path
                          ? styles.wiggleIcon
                          : styles.boopIcon
                        : ""

                }
                }`}
                onMouseMove={(e) => showTooltip(route.label, e)}
                onMouseLeave={hideTooltip}
              >
                <p className={styles.routeItem}>
                  <span
                    key={route.path + (routeChangeAnimating ? "-anim" : "")}
                 
                  >
                    {getIcon(route.icon ?? "home")} {route.label}
                  </span>
                </p>
              </Link>
            </li>
          );
        })}
        <li className={styles.navItem}>
          <DarkModeWrapper type="largepill" />
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;
