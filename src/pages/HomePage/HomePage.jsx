import React from "react";
import styles from "./HomePage.module.scss";
import content from "../../assets/HomePageContent.json";
import { HeroTile } from "./Components/Tiles";
import { DarkModeTile } from "../../components/darkmodeTile";
import Column from "./Components/Column";
import { useGlobalContext } from "../../contexts/GlobalContext";
import coldata from "../../assets/HomePageColumns.json";
import useScreenSize from "../../utils/screensize";
import clsx from "clsx";
import ColumnComponentContainer from "./Components/ColumnComponentContainer";

export const HomePage = () => {
  const { isDarkMode } = useGlobalContext();
  const screenSize = useScreenSize();

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
      {/* Grid Area */}
      <div className={styles.gridArea}>
        {/* Hero Section */}
        <div
          className={clsx(
            styles.gridTile,
            screenSize === "sm"
              ? styles["full"]
              : screenSize === "md"
              ? styles["tile-1x2"]
              : styles["tile-1x2"]
          )}
        >
          <HeroTile title={content.title} subtitle={content.subtitle} />
        </div>

        {/* Column Section */}
        <div
          className={clsx(
            styles.gridTile,
            screenSize === "sm"
              ? styles["full"]
              : screenSize === "md"
              ? styles["tile-1x2"]
              : styles["tile-1x4"]
          )}
        >
          <Column data={coldata[0]} title="Featured Article"  columns={1} />
        </div>

        <div
          className={clsx(
            styles.gridTile,
            screenSize === "sm"
              ? styles["tile-1x1"]
              : screenSize === "md"
              ? styles["tile-1x2"]
              : styles["tile-1x4"]
          )}
        >
          <Column data={coldata[1]} title={"Things to consider"} columns={1} />
        </div>

        <div
          className={clsx(
            styles.gridTile,
            screenSize === "sm"
              ? styles["half"]
              : screenSize === "md"
              ? styles["tile-1x2"]
              : styles["tile-1x2"]
          )}
        >
          <ColumnComponentContainer
            title={isDarkMode ? "Where is the Sun?!?!" : "Where is the Moon?!?"}
            subtitle={"Toggle Darkmode"}
            colTitle={"Weather Forecast"}
            component={<DarkModeTile />}
          />
        </div>

        {/* Tile 1 */}
        <div
          className={clsx(
            styles.gridTile,
            screenSize === "sm"
              ? styles["half"]
              : screenSize === "md"
              ? styles["tile-1x2"]
              : styles["tile-1x2"]
          )}
        >
          <Column data={coldata[1]} title={"Quick Links"} />
        </div>

        {/* Dark Mode Toggle */}
        <div
          className={clsx(
            styles.gridTile,
            screenSize === "sm"
              ? styles["tile-1x1"]
              : screenSize === "md"
              ? styles["tile-1x3"]
              : styles["tile-1x4"]
          )}
          
        >
          <Column data={coldata[2]} title={"Classifieds"} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
