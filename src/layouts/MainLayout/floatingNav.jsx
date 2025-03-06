import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes/routes";
import styles from './floatingNav.module.scss';
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import useScreenSize from "../../utils/screensize";
const FloatingNav = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMouseWiggling, setIsMouseWiggling] = useState(false);
  const [hasSlidIn, setHasSlidIn] = useState(false);  // Tracks when the slide-in animation is complete
  const screenSize = useScreenSize()
  useEffect(() => {
    // Trigger slide-in animation on mount, and enable mouse-following effect after animation is done
    const timer = setTimeout(() => {
      setHasSlidIn(true);  // After 1 second, animation is complete, so we allow mouse wiggling
    }, 1000);  // Adjust this for animation duration

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (hasSlidIn) {
      const handleMouseMove = (event) => {
        setMousePosition({ x: event.clientX, y: event.clientY });
      };

      // Add the event listener for mouse move
      window.addEventListener("mousemove", handleMouseMove);

      // Clean up the event listener when the component unmounts
      return () => {
        window.removeEventListener("mousemove", handleMouseMove);
      };
    }
  }, [hasSlidIn]);  // Only add mouse listener once the slide-in is complete

  // Calculate the translate offset based on mouse position
  const offsetX = (mousePosition.x - window.innerWidth / 2) / 90;
  const offsetY = (mousePosition.y - window.innerHeight / 2) / 90;

  return (
    <nav
      className={`${screenSize === "sm" ? styles.sm : styles.float} ${styles.navContainer} ${hasSlidIn ? styles.isWiggling : ""} `}
      style={{
        transform: `translate(-50%, -50%) translate(${offsetX}px, ${offsetY}px)`,
      }}
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
      </ul>
    </nav>
  );
};

export default FloatingNav;
