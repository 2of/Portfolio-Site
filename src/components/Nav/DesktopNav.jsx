import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./DesktopNav.module.scss";
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeWrapper } from "../UI/DarkModeWrapper";

const DesktopNav = () => {
  const screenSize = useScreenSize();
  const {
    getCurrentNavReplacementButton,
    navReplacementButtonStack,
  } = useGlobalContext();
  const navigate = useNavigate();
  const location = useLocation();
  const { showTooltip, hideTooltip } = useTooltip();

  const [routeChangeAnimating, setRouteChangeAnimating] = useState(false);
  const [activePath, setActivePath] = useState(location.pathname);
  const [wiggleTarget, setWiggleTarget] = useState(null);
  const [doJump, setDoJump] = useState(false);

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

  const handleLinkClick = (path) => {
    navigate(path);
  };

  if (screenSize === "sm") return null; // Do not render on small screens

  return (
    <nav
      className={`
        ${styles.navContainer} 
        ${getCurrentNavReplacementButton().label ? styles.onlyButton : ""} 
        ${doJump ? styles.jump : ""}
      `}
    >
      <ul className={styles.navList}>
        {routes.map((route, i) => {
          if (route.hide) return null;

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
                    {getIcon(route.icon ?? "home")}
                  </span>
                </p>
              </div>
            </li>
          );
        })}

        <li className={styles.navItem}>
          <DarkModeWrapper type="pill" />
        </li>
      </ul>
    </nav>
  );
};

export default DesktopNav;