import React, { useEffect, useState, memo } from "react";
import clsx from "clsx";
import styles from "./styles/MobileIcon.module.scss";
import { StandardButton } from "../UI/StandardButton";
import getIcon from "../../utils/Iconifier";
export const NavMenuIconMobile = memo(({ label, icon, currentCallback, isFloating = false }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setAnimateIn(true));
  }, []);

  return (
    <div
      className={clsx(
        styles.mobileIconContainer,
        isFloating ? styles.floating : styles.fixed
      )}
    >
      <StandardButton
        icon={icon}
     type={isFloating ? "rounded" : "icon_only"}
        label="menu"
        callback={currentCallback}
      />
    </div>
  );
});

export const ExtraButtonNavMenuIconMobile = memo(({ label, icon, currentCallback, isFloating = false }) => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setAnimateIn(true));
  }, []);

  return (
    <div className={clsx(styles.ExtramobileIconContainer, isFloating && "")}>
      <StandardButton
        icon={icon}
        type="rounded"
        label="menu"
        callback={currentCallback}
      />
    </div>
  );
});