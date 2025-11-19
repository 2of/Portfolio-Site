import React from "react";
import styles from "./styles/PortfolioSiteCard.module.scss";
import image1 from "../../../assets/Images/PortfolioShowCaseImages/DarkProjSS.png";
import image2 from "../../../assets/Images/PortfolioShowCaseImages/LightArticleSS.png";
import image3 from "../../../assets/Images/PortfolioShowCaseImages/LightHomess.png";
import image4 from "../../../assets/Images/PortfolioShowCaseImages/DarkPh1.png";
import image5 from "../../../assets/Images/PortfolioShowCaseImages/LightPh1.png";
import {StandardButton} from "../../UI/StandardLib/StandardButton.jsx"
import ImageSplit from "../../Misc/ImageSplit";
import imageDarkFeat from "../../../assets/Images/PortfolioShowCaseImages/feat_dark.png";
import imageLightFeat from "../../../assets/Images/PortfolioShowCaseImages/feat_light.png";

import phimageDarkFeat from "../../../assets/Images/PortfolioShowCaseImages/DarkPhMenu.png";
import phimageLightFeat from "../../../assets/Images/PortfolioShowCaseImages/LightPhMenu.png";
import TrackedGradientBG from "../../Background/TrackedGradientBg";
import getIcon from "../../../utils/Iconifier";
export const PortfolioSiteCard = () => {
  const tags = [
    "React",
    "SCSS",
    "Custom Markup Language",
    "Custom Hooks and so on",
    "Wrappers for Chess, Tensorflow",
  ];

  return (
    <div className={styles.card}>
      <div className={styles.cardHeader}>
        <h2 className={styles.title}>Portfolio Site</h2>
        <p className={styles.subtitle}>
          There's actually heaps here, Hosting is free afterall...
        </p>
      </div>

      {/*<div className={styles.bgcontainer}>*/}
      {/*  <TrackedGradientBG />*/}
      {/*</div>*/}

      <div className={styles.cardBody}>

          <div className={styles.ButtonContainer}>
              <StandardButton label="thingies.dev" type="rounded_catalogue_card_end_with_label"        icon={getIcon("right")}link="https://thingies.dev" />
              <StandardButton
                  label="Open Writeup"
                  type="rounded_catalogue_card_end_with_label"
                  icon={getIcon("article")}
              />  <StandardButton
              label="UI Library"
              type="rounded_catalogue_card_end_with_label"
              icon={getIcon("github")}
          />
              <StandardButton
                  label="All Components"
                  type="rounded_catalogue_card_end_with_label"
                  icon={getIcon("github")}
                  link={"/allcomponents"}
              />

              <StandardButton
                  label="Code"
                  type="rounded_catalogue_card_end_with_label"
                  icon={getIcon("github")}
              />

          </div>





        <h4 className={styles.tagsTitle}>Under The hood:</h4>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
        {/*<h4 className={styles.tagsTitle}>Links</h4>*/}

      </div>

      {/*<div className={styles.ImagesContainer}>*/}
      {/*  <div className={`${styles.FloatingImage} ${styles.sub1}`}>*/}
      {/*    <ImageSplit image1={imageDarkFeat} image2={imageLightFeat} />*/}
      {/*  </div>*/}

      {/*  <div className={`${styles.FloatingImage} ${styles.sub2}`}>*/}
      {/*    <ImageSplit image1={phimageDarkFeat} image2={phimageLightFeat} />*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  );
};
