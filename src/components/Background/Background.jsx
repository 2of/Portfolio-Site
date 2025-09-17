import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./Background.module.scss";
import PhysicsShapes from "./PhysicsShapes";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { ZuneTextBG } from "./ZuneText";
import BlurArtBackground from "./BlurBg";
import FeatherRevealPattern from "./TrackedReveal";
export const Background = () => {
  const location = useLocation();
  const [bgType, setBgType] = useState(() => getBgFromPath(location.pathname));
  const {animatebg} = useGlobalContext();
  function getBgFromPath(path) {
    const sortedRoutes = [...routes].sort((a, b) => b.path.length - a.path.length);
    const matchedRoute = sortedRoutes.find((r) => path.startsWith(r.path));
    return matchedRoute?.bg || "default";
  }

  useEffect(() => {
    const newBg = getBgFromPath(location.pathname);
    if (newBg !== bgType) {
      setBgType(newBg);
    }
  }, [location.pathname]);

  return (
    <div className={styles.backgroundWrapper}>
      <div
        className={styles.regularbg}
        style={{ opacity: bgType === "default" || bgType === "bg" ? 1 : 0 }}
      />
      <div
        className={styles.herobg}
        style={{ opacity: bgType === "herobg" ? 1 : 0 }}
      />
      <div
        className={styles.particles}
        style={{ opacity: bgType === "particles" ? 1 : 0 }}
      >
        Particles!
      </div>
     <div
        className={styles.textBgAanimated}
        style={{ opacity: bgType === "particles" ? 1 : 0 }}
      >

      </div>
      <div
        className={styles.physicsShapes}
        style={{ opacity: bgType === "shapes" ? 1 : 0 }}
      >
        {animatebg ? 
      <FeatherRevealPattern/>:   <div
        className={styles.regularbg}
        style={{ opacity: bgType === "default" || bgType === "bg" ? 1 : 0 }}
      />}
      </div>
    </div>
  );
};