import React from "react";
import styles from "./styles/HeroCard.module.scss";
import { ImageGallery } from "../../Misc/ImageGallery";

export const HeroCard = ({
    title,
    subtitle,
    description,
    buttons = [],
    image,
    images = [],
    icon,
    icons = [],
    background,
    left,
}) => {

    // Normalize images: if single image provided, include it in array
    const imageList = images.length > 0 ? images : image ? [image] : [];

    // Normalize icons
    const iconList = icons.length > 0 ? icons : icon ? [icon] : [];

    return (
        <div className={`${styles.cardWrapper} ${left ? styles.left : styles.right}`}>

            {/* Background component if provided */}
            {background && (
                <div className={styles.background}>
                    {background}
                </div>
            )}

            {/* IMAGES */}

            <ImageGallery images={imageList} />


            {/* CONTENT */}
            <div className={styles.contentContainer}>

                {/* Icons */}
                {iconList.length > 0 && (
                    <div className={styles.iconRow}>
                        {iconList.map((icn, index) => (
                            <span key={index} className={styles.iconWrapper}>
                                {icn}
                            </span>
                        ))}
                    </div>
                )}

                {/* Subtitle */}
                {subtitle && (
                    <h4 className={styles.subtitle}>{subtitle}</h4>
                )}

                {/* Title */}
                <h2 className={styles.title}>{title}</h2>

                {/* Description */}
                {description && (
                    <p className={styles.description}>{description}</p>
                )}

                {/* Buttons */}
                {buttons.length > 0 && (
                    <div className={styles.buttonContainer}>
                        {buttons.map((button, index) => (
                            <div key={index}>{button}</div>
                        ))}
                    </div>
                )}

            </div>
        </div>
    );
};
