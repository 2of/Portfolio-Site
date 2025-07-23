import React, { useEffect, useRef, useState, memo } from "react";
import styles from "./MobileIcon.module.scss";
import clsx from "clsx";

const NavMenuIconMobile = ({ label, icon, bgColor, currentCallback, showbg=true }) => {
  const [cachedLabel, setCachedLabel] = useState(label);
  const [cachedIcon, setCachedIcon] = useState(icon);
  const [animate, setAnimate] = useState(false);
  const prevCallbackRef = useRef(currentCallback);

  useEffect(() => {
    if (prevCallbackRef.current !== currentCallback) {
      setAnimate(true);
      prevCallbackRef.current = currentCallback;

      const timeout = setTimeout(() => {
        setAnimate(false);
        setCachedLabel(label);
        setCachedIcon(icon);
      }, 300); // match CSS transition duration

      return () => clearTimeout(timeout);
    }
  }, [label, icon, currentCallback]);

  return (
    <div
      className={clsx(
        styles.navMenuIconMobile,
        {
          [styles.animateOut]: animate,
        },
        showbg && "flatStyleShadow_NO_INTERACT"
      )}

    >
      <div className={styles.iconWrapper}>{cachedIcon}</div>
      {cachedLabel && <div className={styles.label}>{cachedLabel}</div>}
    </div>
  );
};

export default memo(NavMenuIconMobile);