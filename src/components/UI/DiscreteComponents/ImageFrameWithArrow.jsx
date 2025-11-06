import React from "react";
import styles from "./styles/ImageFrameWithArrow.module.scss";
import {useAppTheme} from "../../../contexts/ThemeContext.jsx";

export const ImageFrameWithArrow = ({ label, img }) => {

    const { getColor } = useAppTheme();


    return (
        <div className={styles.ImageFrameWithArrowContainer}>
            <div className={styles.label}>{label}</div>

            <svg
                className={`${styles.arrow} ${styles.flipped}`}
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M74,43 Q44,59 14,25"
                    stroke="black"
                    strokeWidth="4"
                    fill="none"
                    strokeLinecap="round"
                />

                <polygon
                    points="70,38 80,43 74,50"
                    fill="black"
                />
            </svg>

            <div className={styles.imageWrapper}>
                <img src={img} alt={label} className={styles.image} />
            </div>
        </div>
    );
};