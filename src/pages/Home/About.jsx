import React from "react";
import styles from "./About.module.scss";
import mansvg from "../../assets/svgs/DrawKit_Vector_Illustrations_Podcast.svg";
import { StandardButton } from "../../components/UI/StandardButton";
import getIcon from "../../utils/Iconifier";
import { useGlobalContext } from "../../contexts/GlobalContext";

export const AboutCell = ({ sz, percentVisible }) => {
  const { getLink } = useGlobalContext();

  // Parallax amounts
  const titleY = (1 - percentVisible) * 30;
  const subtitleY = (1 - percentVisible) * 30;
  const paraY = ( percentVisible) * 10;
  const qualsY = (1 - percentVisible) * 30 ;
  const svgY = 1;

  return (
    <div className={sz === "sm" ? styles.sm : styles.lg}>
      <div className={styles.TextSection}>
        {/* Title */}
<svg
  className={styles.TitleSVG}
  viewBox="0 0 400 150"
  preserveAspectRatio="xMidYMid meet"
>
  <defs>
    <path
      id="curve"
 d={`
  M 50 120 
  Q 200 ${90 - (1 - percentVisible) * 40} 
  350 120
`}
    />
  </defs>
  <text
    className={styles.TitleText}
    style={{
      transform: `scale(${0.98 + percentVisible * 0.04})`, // gentle scale in
      transformOrigin: "center center",
    }}
  >
    <textPath href="#curve" startOffset="50%" textAnchor="middle">
      Yeah, so About Me..
    </textPath>
  </text>
</svg>

        {/* Subtitle */}
        <div
          className={styles.Subtitle}
          style={{
            transform: `translateY(${subtitleY}px)`,
          }}
        >
          <p>Kinda a bunch of stuff...</p>
        </div>

        {/* Paragraphs */}
        <div
          className={styles.para}
          style={{
            transform: `translateY(${paraY}px)`,
          }}
        >
          <p>
            I’m an experienced IT Engineer, having worked across{" "}
            <span className={styles.highlight}>Education IT</span> and{" "}
            <span className={styles.highlight}>Healthcare IT</span>, as well as
            deploying and supporting IT solutions for small businesses.
          </p>

          <p>
            I've sorta done a bit of everything from{" "}
            <span className={styles.highlight}>
              Google Cloud Admin and Azure Appliances and Azure Admin
            </span>{" "}
            to setting up{" "}
            <span className={styles.highlight}>Point-to-Point Mikrotiks</span>{" "}
            on top of dairy sheds.
          </p>

          <br />

          <p>
            But I'm looking to make that career switcheroo, IT to development. I
            know my way around{" "}
            <span className={styles.highlight}>
              Python, JS, C, C++, Java, A lil Swift,
            </span>{" "}
            and tools such as{" "}
            <span className={styles.highlight}>
              Tensorflow, Spark, R, Keras, PyTorch
            </span>{" "}
            and also libraries and frameworks like{" "}
            <span className={styles.highlight}>
              React, Vue, Android Studio
            </span>{" "}
            ... not to mention all the things I'm forgetting!
          </p>
        </div>

        {/* Qualifications */}
        <div
          className={styles.QualTitle}
          style={{
            transform: `translateY(${qualsY}px)`,
          }}
        >
          <p>Quals</p>
        </div>

        <div
          className={styles.QualsList}
          style={{
            transform: `translateY(${qualsY}px)`,
          }}
        >
          <div className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}>
            <p className={styles.QualificationLevel}>{getIcon("school")} Bachelor of</p>
            <p className={styles.QualificationField}>Computer Science</p>
            <p className={styles.QualificationDetails}>
              [2020] [University of Canterbury]
            </p>
          </div>

          <div className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}>
            <p className={styles.QualificationLevel}>
              {getIcon("school")} Master of
            </p>
            <p className={styles.QualificationField}>
              Artificial Intelligence - Merit
            </p>
            <p className={styles.QualificationDetails}>
              [2025] [University of Canterbury]
            </p>
          </div>
        </div>
      </div>

      {/* SVG Art */}
      <div className={styles.bottomSection}>
        <div className={styles.art}>
          <img
            src={mansvg}
            alt="lazybones"
            style={{
              transform: `translateY(${svgY}px)`,
            }}
          />
        </div>
        <div className={styles.darkContainer}></div>
      </div>
    </div>
  );
};