import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import styles from './floatingNav.module.scss';
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";

const FloatingNav = () => {
  const [hasSlidIn, setHasSlidIn] = useState(false);
  const screenSize = useScreenSize();
  const { navReplacementButtonFunc, hopNav, setHopNav } = useGlobalContext();
  const [doJump, setDoJump] = useState(false);

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

  return (
    <>
      <nav
        className={`${screenSize === "sm" ? styles.sm : styles.float} ${styles.navContainer} ${navReplacementButtonFunc.label ? styles.onlyButton : ""} ${doJump ? styles.jump : ""}`}
      >
        <ul className={styles.navList}>
          {routes.map((route, i) => (
            <li key={i} className={styles.navItem}>
              <NavLink
                to={route.path}
                className={({ isActive }) =>
                  isActive ? styles.activeLink : styles.link
                }
              >
                {route.label}
              </NavLink>
            </li>
          ))}
          <li className={styles.navItem}>
            <DarkModeToggle />
          </li>

          {/* Jump Button */}
          <li>
            asdf
            {navReplacementButtonFunc.label && (
              <button className={styles.visibleButton} onClick={navReplacementButtonFunc.callback}>
                {navReplacementButtonFunc.label}
              </button>
            )}
          </li>
        </ul>

      </nav>



    </>
  );
};

export default FloatingNav;
