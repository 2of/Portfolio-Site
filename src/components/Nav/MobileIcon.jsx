import React, { useEffect, useState, memo } from "react";
import clsx from "clsx";
import styles from "./styles/MobileIcon.module.scss";

const NavMenuIconMobile = ({ label, icon, currentCallback, isFloating = false }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setAnimateIn(true));
  }, []);

  return (
    <div
      className={clsx(
        styles.mobileIconContainer,
        isFloating ? styles.floating : styles.fixed,
        isFloating && "flatStyleShadow_NO_INTERACT"
      )}
      onClick={currentCallback}
    >
      <div className={clsx(styles.iconWrapper, animateIn && styles.popIn)}>
        {icon}
      </div>
      {label && isFloating &&  (
        <div className={clsx(styles.label, animateIn && styles.popIn)}>
          {label}
        </div>
      )}
    </div>
  );
};

export default memo(NavMenuIconMobile);