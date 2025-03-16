import React, { useState, useEffect } from "react";
import styles from "./HomePage.module.scss";
import content from "../../assets/HomePageContent.json";
import { FooterTile, HeroTile } from "./Components/Tiles";
import { DarkModeTile } from "../../components/darkmodeTile";
import Column from "../../components/Column/Column";
import { useGlobalContext } from "../../contexts/GlobalContext";
import coldata from "../../assets/HomePageColumns.json";
import HomeData from "../../assets/HomeContent.json"
import useScreenSize from "../../utils/screensize";
import clsx from "clsx";
import ColumnComponentContainer from "../../components/Column/ColumnComponentContainer";
import ProjectContent from "../../assets/ProjectContent.json"
import ColumnWithSections from "../../components/Column/ColumnWithSections";

import { TooltipProvider,useTooltip } from "../../contexts/tooltip";
// Mouse position tracking for distortion
export const HomePage = () => {
  const { isDarkMode } = useGlobalContext();
  const screenSize = useScreenSize();
    const { showTooltip, hideTooltip } = useTooltip();

  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [rotation, setRotation] = useState({ x: 0, y: 0 });

  // Effect for tracking mouse movement
  useEffect(() => {
    const handleMouseMove = (e) => {
      const newMousePos = { x: e.clientX, y: e.clientY };
      setMousePos(newMousePos);
      setRotation(calculateDistortion(newMousePos));  // Update distortion calculation
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Calculation function for mouse distortion
  const calculateDistortion = ({ x, y }) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const rotateX = -(y - centerY) * 0.0012;  // Sensitivity for X-axis rotation
    const rotateY = (x - centerX) * 0.001;   // Sensitivity for Y-axis rotation

    return { x: rotateX, y: rotateY };
  };

  return (
    <div
      className={clsx(
        styles.homePage,
        {
          [styles.sm]: screenSize === "sm",
          [styles.md]: screenSize === "md",
          [styles.lg]: screenSize === "lg",
        }
      )}
    >
      {/* Grid Area with Mouse Distortion */}
      <div className={`${styles.inset} `} style={{
        transform: `perspective(500px) rotateY(${rotation.y}deg) rotateX(${rotation.x}deg)`,
      }}>
        {/* <div className={styles.glassOverlay}></div> */}
        <div className={`${styles.gridArea}`}>
          {/* Hero Section */}
          <div
            className={clsx(
              
              styles.gridTile,
              screenSize === "sm"
                ? styles["full"]
                : screenSize === "md"
                  ? styles["tile-1x2"]
                  : styles["tile-3x1"]
            )}
          >
            <HeroTile title={content.title} subtitle={content.subtitle} />
          </div>
          
          {/* Dark Mode Tile */}
          <div
            className={clsx(
              styles.gridTile,
              screenSize === "sm"
                ? styles["half"]
                : screenSize === "md"
                  ? styles["tile-1x2"]
                  : styles["tile-1x1"]
            )}
            onMouseMove={(e) => showTooltip("Toggle Dark Mode", e)}
            onMouseLeave={hideTooltip}
        

          >
            <ColumnComponentContainer
              title={isDarkMode ? "Where is the Sun?!?!" : "Where is the Moon?!?"}
              component={<DarkModeTile />}
            />
          </div>

          {/* Column Section */}
          <div
            className={clsx(
              styles.gridTile,
              screenSize === "sm"
                ? styles["full"]
                : screenSize === "md"
                  ? styles["tile-1x2"]
                  : styles["tile-2x3"]
            )}
          >
            <ColumnWithSections data={HomeData[0]} style="newspaper"  topDivideDouble={true} twoColumns={true}/>
          </div>

          {/* Tile 1 */}
          <div
            className={clsx(
              styles.gridTile,
              screenSize === "sm"
                ? styles["half"]
                : screenSize === "md"
                  ? styles["tile-1x2"]
                  : styles["tile-1x3"]
            )}
          >
            <ColumnWithSections data={HomeData[2]} style="newspaper"  leftDivider={true} topDivider={true} title={"Quick Links"} />
          </div>

          {/* Classifieds Section */}
          <div
            className={clsx(
              styles.gridTile,
              screenSize === "sm"
                ? styles["tile-1x1"]
                : screenSize === "md"
                  ? styles["tile-1x3"]
                  : styles["tile-1x3"]
            )}
          >
            <ColumnWithSections data={HomeData[1]} style="newspaper" topDivider={true} leftDivider={true} title={"Classifieds"} />
          </div>
        </div>
      </div>
    </div>
  );
};
