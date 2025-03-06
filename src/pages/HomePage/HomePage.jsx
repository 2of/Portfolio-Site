import React from "react";
import styles from "./HomePage.module.scss";
import content from "../../assets/HomePageContent.json";
import { FooterTile, HeroTile } from "./Components/Tiles";
import { DarkModeTile } from "../../components/darkmodeTile";
import Column from "../../components/Column";
import { useGlobalContext } from "../../contexts/GlobalContext";
import coldata from "../../assets/HomePageColumns.json";
import HomeData from "../../assets/HomeContent.json"
import useScreenSize from "../../utils/screensize";
import clsx from "clsx";
import ColumnComponentContainer from "../../components/ColumnComponentContainer";
import ProjectContent from "../../assets/ProjectContent.json"
import ColumnWithSections from "../../components/ColumnWithSections";
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

      <div className={styles.inset}>

        <div className={styles.glassOverlay}>


        </div>
        <div className={styles.gridArea}>
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
          <div
            className={clsx(
              styles.gridTile,
              screenSize === "sm"
                ? styles["half"]
                : screenSize === "md"
                  ? styles["tile-1x2"]
                  : styles["tile-1x1"]
            )}
          >
            <ColumnComponentContainer
              title={isDarkMode ? "Where is the Sun?!?!" : "Where is the Moon?!?"}
              // subtitle={"Toggle Darkmode"}
 
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
            {/* <Column data={coldata[0]} title="Featured Article" columns={1} fullLink={"/proj/id"} /> */}
         
            <ColumnWithSections data={HomeData[0]} topDivideDouble={true} twoColumns={true}/>
         
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
            <ColumnWithSections data={HomeData[2]} leftDivider={true}  topDivider={true} title={"Quick Links"} />
          </div>

          {/* Dark Mode Toggle */}
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
            <ColumnWithSections data={HomeData[1]}  topDivider={true}  leftDivider={true} title={"Classifieds"} />


          </div>
{/* 


          <div
            className={clsx(
              styles.gridTile,
              screenSize === "sm"
                ? styles["tile-1x1"]
                : screenSize === "md"
                  ? styles["tile-1x3"]
                  : styles["tile-2x1"]
            )}

          >
           <FooterTile/>


          </div> */}



        </div>
      </div>
    </div>
  );
};

export default HomePage;
