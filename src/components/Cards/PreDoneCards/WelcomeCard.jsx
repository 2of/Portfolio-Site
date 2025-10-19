import React, { useEffect, useState } from "react";
import styles from "./WelcomeCard.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TrackedGradientBG from "../../Background/TrackedGradientBg";
import useScreenSize from "../../../utils/screensize";

const WelcomeCard = ({
  title = "Where Are you?",
  intro = "This is Noah King's   handbuilt little portfolio website. (yeah, I seriosuly built everything here... on REACT...)",
  text1 = "Swipe for Goodies or use the Navigation to see even more",
}) => {
  const [showHint, setShowHint] = useState(false);
  const screenSize = useScreenSize();
  useEffect(() => {
    const timeout = setTimeout(() => setShowHint(true), 1000);
    const hide = setTimeout(() => setShowHint(false), 3500);
    return () => {
      clearTimeout(timeout);
      clearTimeout(hide);
    };
  }, []);

  return (
    <div className={`${styles.card} ${showHint ? styles.hint : ""}`}>
      {/* <TrackedGradientBG /> */}
      {screenSize !== "sm" && <TrackedGradientBG />}
      <div className={styles.pattern}></div>

      <h1 className={styles.title}>{title}</h1>
      <div className={styles.content}>
        <p className={styles.intro}>{intro}</p>
        <p className={styles.text1}>{text1}</p>
      </div>

      <div className={styles.footer}>
        <FaArrowLeft className={styles.arrow} />
        <span>swipe</span>
        <FaArrowRight className={styles.arrow} />
      </div>
    </div>
  );
};

export default WelcomeCard;
