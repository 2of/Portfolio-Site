import React, { useState } from "react";
import styles from "./styles/NavBg.module.scss";
import { useRoute } from "../../contexts/RouteContext";
const NavLogo = () => {
  return (
    <div className={styles.logo}>
      <span>2of.io</span>
      <span>Noah's site</span>
    </div>
  );
};

export const NavBg = ({ menu, buttons }) => {
  const [fillActive, setFillActive] = useState(false);
  const { pathname, currentRoute } = useRoute();
  const handleToggleFill = () => {
    setFillActive((prev) => !prev);
  };

  return (
    <div className={styles.navBg}>
      <div className={`${styles.inner} ${!fillActive ? styles.fill : ""}`}>
        <div className={styles.menubutton}
        >
        {menu}

        </div>
        

        {buttons}

        {/* Example toggle button */}
        {/* <button onClick={handleToggleFill} className={styles.toggleBtn}>
          Toggle Fill
        </button> */}

       <span className={styles.title}>
  {currentRoute?.path ?? ""}
</span>
        <NavLogo />
      </div>
    </div>
  );
};
