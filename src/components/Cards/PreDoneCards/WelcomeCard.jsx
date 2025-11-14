import React, { useEffect, useState } from "react";
import styles from "./styles/WelcomeCard.module.scss";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import TrackedGradientBG from "../../Background/TrackedGradientBg";
import useScreenSize from "../../../utils/screensize";

const WelcomeCard = ({
                         title = (
                             <>
                                 <p className={styles.titleText}>howdy..!</p>

                                 <span className={styles.subtitle}>



                                     <p> welcome to</p> <p className={styles.highlight}>thingies.dev</p>


                                 </span>

                             </>
                         ),
                         intro = "You've found my little portfolio site.... I'm Noah, I'm a grad looking for Data Science, Machine Learning, Development or Software Engineering roles....",
                         text1 = "Swipe for goodies or use the navigation to see even more.",
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
        <div className={`${styles.card} ${showHint ? styles.hintVisible : ""} ${styles.fadeIn}`}>
            {screenSize !== "sm" && <TrackedGradientBG />}

            <div className={styles.pattern} />

            <div className={styles.titleContainer}>
                <span className={styles.titleText}>{title}</span>
            </div>

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
