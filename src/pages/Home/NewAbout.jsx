import React from "react";
import img1 from "../../assets/HomeParallaxResources/7.png";
import img2 from "../../assets/HomeParallaxResources/9.png";
import img3 from "../../assets/HomeParallaxResources/6.png";
import bg from "../../assets/HomeParallaxResources/bg.png";
import styles from "./styles/newAbout.module.scss";
import { BouncyArrows } from "../../components/UI/bouncyArrows";

export const aboutText = {
  title: "Yeah, so About Me",
  subtitle: "Kinda a bunch of stuff...",
  paragraphs: [
    [
      "I’m an experienced IT Engineer, having worked across ",
      { highlight: "Education IT" },
      " and ",
      { highlight: "Healthcare IT" },
      ", as well as deploying and supporting IT solutions for small businesses.",
    ],
    [
      "I've sorta done a bit of everything from ",
      { highlight: "Google Cloud Admin and Azure Appliances and Azure Admin" },
      " to setting up ",
      { highlight: "Point-to-Point Mikrotiks" },
      " on top of dairy sheds.",
    ],
    [
      "But I'm looking to make that career switcheroo, IT to development. I know my way around ",
      { highlight: "Python, JS, C, C++, Java, A lil Swift," },
      " and tools such as ",
      { highlight: "Tensorflow, Spark, R, Keras, PyTorch" },
      " and also libraries and frameworks like ",
      { highlight: "React, Vue, Android Studio" },
      " ... not to mention all the things I'm forgetting!",
    ],
  ],
  qualsTitle: "Quals",
  qualifications: [
    {
      level: "Bachelor of",
      field: "Computer Science",
      details: "[2020] [University of Canterbury]",
    },
    {
      level: "Master of",
      field: "Artificial Intelligence - Merit",
      details: "[2025] [University of Canterbury]",
    },
  ],
};
export const NewAboutCell = ({ sz, percentVisible }) => {
  const clamped = Math.min(1, Math.max(0, percentVisible));

  const renderParagraphs = () => (
    aboutText.paragraphs.map((para, i) => (
      <p key={i}>
        {para.map((part, idx) =>
          typeof part === "string" ? (
            part
          ) : (
            <span key={idx} className={styles.highlight}>
              {part.highlight}
            </span>
          )
        )}
      </p>
    ))
  );

  const renderQuals = () => (
    <>
      <div
        className={styles.QualTitle}
        style={{ transform: `translateY(${(1 - clamped) * 30}px)` }}
      >
        <p>{aboutText.qualsTitle}</p>
      </div>

      <div
        className={styles.QualsList}
        style={{ transform: `translateY(${(1 - clamped) * 30}px)` }}
      >
        {aboutText.qualifications.map(({ level, field, details }, i) => (
          <div
            key={i}
            className={`${styles.QualItem} flatStyleShadow_NO_INTERACT`}
          >
            <p className={styles.QualificationLevel}>{level}</p>
            <p className={styles.QualificationField}>{field}</p>
            <p className={styles.QualificationDetails}>{details}</p>
          </div>
        ))}
      </div>
    </>
  );

const renderTitleSVG_Mobile = () => (
  <svg
    className={styles.TitleSVG}
    viewBox="0 0 400 150"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <path
        id="curve"
        d={`M 50 120 Q 200 ${120 - (clamped * 40)} 350 120`}
        fill="transparent"
      />
    </defs>
    <text
      className={styles.TitleText}
      style={{
        transform: `scale(${0.98 + clamped * 0.04})`,
        transformOrigin: "center center",
      }}
    >
      <textPath href="#curve" startOffset="50%" textAnchor="middle">
        {aboutText.title || "hello"}
      </textPath>
    </text>
  </svg>
);

const renderTitleSVG_Desktop = () => (
  <svg
    className={styles.TitleSVG}
    viewBox="0 0 400 75"
    preserveAspectRatio="xMidYMid meet"
  >
    <defs>
      <path
        id="curve"
        d="M 50 120 Q 200 40 350 120"
        fill="transparent"
      />
    </defs>
    <text className={styles.TitleText}>
      <textPath href="#curve" startOffset="50%" textAnchor="middle">
        {aboutText.title || "Hello Curved Text!"}
      </textPath>
    </text>
  </svg>
);
  const renderMobile = () => (
    <div className={styles.sm}>
      <div className={styles.ContentContainer}>
        <div className={styles.titleContainer}>
        {renderTitleSVG_Mobile()}
        </div>
        <div
          className={styles.Subtitle}
          style={{ transform: `translateY(${(1 - clamped) * 30}px)` }}
        >
          <p>{aboutText.subtitle}</p>
        </div>
        <div
          className={styles.paraContainer}
          style={{ transform: `translateY(${clamped * 10}px)` }}
        >
          {renderParagraphs()}
        </div>
        {renderQuals()}
        <BouncyArrows direction="down" />
      </div>

      <div
        className={styles.art2}
        style={{
          transform: `translateY(${50 - clamped * 200}px) `,
        }}
      >
        <img src={img2} alt="Art Two" />
      </div>
    </div>
  );

  const renderDesktop = () => (
    <div className={styles.lg}>
      <div className={styles.ContentContainerL}>

          <div className={styles.titleContainer}>
        {renderTitleSVG_Desktop()}
        </div>
        <div
          className={styles.Subtitle}
          style={{ transform: `translateY(${(1 - clamped) * 30}px)` }}
        >
          <p>{aboutText.subtitle}</p>
        </div>
        
        <div
          className={styles.para}
          style={{ transform: `translateY(${clamped * 10}px)` }}
        >
          {renderParagraphs()}
        </div>
        </div>

        <div className={styles.VerticalDivider}/>
        <div className={styles.ContentContainerR}>
        {renderQuals()}
        <BouncyArrows direction="down" />
   
</div>
      <div
        className={styles.art2}
        style={{
          transform: `translateY(${50 - clamped * 200}px) `,
        }}
      >
        <img src={img2} alt="Art Two" />
      </div>
    </div>
  );

  return sz === "sm" ? renderMobile() : renderDesktop();
};