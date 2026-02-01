import React, { useState, useEffect } from "react";
import styles from "./styles/ImageGallery.module.scss";
import getIcon from "../../utils/Iconifier";

export const ImageGallery = ({
    images = [],
    animationType = "slide", // "slide", "fade", "zoom", "flip"
    autoplay = false,
    autoplayInterval = 3000
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [prevIndex, setPrevIndex] = useState(null);
    const [direction, setDirection] = useState("next");
    const [isAnimating, setIsAnimating] = useState(false);

    // Reset animation state after animation completes
    useEffect(() => {
        if (isAnimating) {
            const timeout = setTimeout(() => {
                setPrevIndex(null);
                setIsAnimating(false);
            }, 500); // Match animation duration
            return () => clearTimeout(timeout);
        }
    }, [isAnimating]);

    // Autoplay functionality
    useEffect(() => {
        if (!autoplay || images.length <= 1) return;

        const interval = setInterval(() => {
            goToNext();
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplay, autoplayInterval, currentIndex, images.length]);

    if (!images || images.length === 0) {
        return (
            <div className={styles.emptyGallery}>
                <p>No images to display</p>
            </div>
        );
    }

    const goToNext = () => {
        if (isAnimating) return;
        setDirection("next");
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) => (prev + 1) % images.length);
        setIsAnimating(true);
    };

    const goToPrev = () => {
        if (isAnimating) return;
        setDirection("prev");
        setPrevIndex(currentIndex);
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
        setIsAnimating(true);
    };

    const goToIndex = (index) => {
        if (isAnimating || index === currentIndex) return;
        setDirection(index > currentIndex ? "next" : "prev");
        setPrevIndex(currentIndex);
        setCurrentIndex(index);
        setIsAnimating(true);
    };

    // Get animation class based on type
    const getAnimationClass = (isEntering, direction) => {
        const prefix = isEntering ? "In" : "Out";
        const suffix = direction === "next"
            ? (isEntering ? "FromRight" : "ToLeft")
            : (isEntering ? "FromLeft" : "ToRight");

        switch (animationType) {
            case "fade":
                return styles[`fade${prefix}`];
            case "zoom":
                return styles[`zoom${prefix}${suffix}`];
            case "flip":
                return styles[`flip${prefix}${suffix}`];
            case "slide":
            default:
                return styles[`slide${prefix}${suffix}`];
        }
    };

    return (
        <div className={styles.galleryWrapper}>
            {/* Image Container */}
            <div className={styles.imageContainer}>
                {/* Previous image - animating out */}
                {prevIndex !== null && (
                    <div
                        className={`${styles.imageSlide} ${styles.slideOut} ${getAnimationClass(false, direction)
                            }`}
                    >
                        <img
                            src={images[prevIndex]}
                            alt={`Gallery image ${prevIndex + 1}`}
                            className={styles.image}
                        />
                    </div>
                )}

                {/* Current image - animating in */}
                <div
                    className={`${styles.imageSlide} ${styles.active} ${isAnimating ? getAnimationClass(true, direction) : ""
                        }`}
                >
                    <img
                        src={images[currentIndex]}
                        alt={`Gallery image ${currentIndex + 1}`}
                        className={styles.image}
                    />
                </div>
            </div>

            {images.length > 1 && (
                <>
                    <button
                        onClick={goToPrev}
                        className={`${styles.navButton} ${styles.prevButton}`}
                        aria-label="Previous image"
                    >
                        {getIcon("left")}
                    </button>


                    <button
                        onClick={goToNext}
                        className={`${styles.navButton} ${styles.nextButton}`}
                        aria-label="Next image"
                    >
                        {getIcon("right")}
                    </button>
                </>
            )}

            {/* Page Dots */}
            {images.length > 1 && (
                <div className={styles.dotsContainer}>
                    {images.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => goToIndex(index)}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ""
                                }`}
                            aria-label={`Go to image ${index + 1}`}
                        />
                    ))}
                </div>
            )}

            {/* Image Counter */}
           
        </div>
    );
};
