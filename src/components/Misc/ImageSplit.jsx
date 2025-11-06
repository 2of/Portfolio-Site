import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/ImageSplit.module.scss";

const ImageSplit = ({ image1, image2, showDivider = false }) => {
    const containerRef = useRef(null);
    const lastXRef = useRef(null);
    const [cursorX, setCursorX] = useState(null);
    const [containerWidth, setContainerWidth] = useState(0);
    const [actualSplitX, setActualSplitX] = useState(null);
    const smoothAnimRef = useRef(null);

    useEffect(() => {
        const updateWidth = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                setContainerWidth(width);
                if (actualSplitX === null) {
                    setActualSplitX(width / 2);
                }
            }
        };
        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, [actualSplitX]);

    useEffect(() => {
        const targetX = cursorX !== null ? cursorX : containerWidth / 2;

        const smoothMove = () => {
            setActualSplitX((current) => {
                if (current === null) return targetX;
                const diff = targetX - current;
                const speed = 0.2;
                if (Math.abs(diff) < 0.5) return targetX;
                return current + diff * speed;
            });
            smoothAnimRef.current = requestAnimationFrame(smoothMove);
        };

        smoothMove();

        return () => {
            if (smoothAnimRef.current) cancelAnimationFrame(smoothAnimRef.current);
        };
    }, [cursorX, containerWidth]);

    const handleMouseMove = (e) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        setCursorX(x);
        lastXRef.current = x;
    };

    const handleMouseLeave = () => {
        setCursorX(lastXRef.current);
    };

    const splitX = actualSplitX !== null ? actualSplitX : containerWidth / 2;
    const clipRightPercentage =
        containerWidth > 0 ? 100 - (splitX / containerWidth) * 100 : 50;
    const clipPathStyle = { clipPath: `inset(0% ${clipRightPercentage}% 0% 0%)` };

    return (
        <div
            ref={containerRef}
            className={styles.container}
            style={{ cursor: "ew-resize" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <img src={image1} alt="Base" className={styles.image} />
            <img
                src={image2}
                alt="Overlay"
                className={styles.image}
                style={clipPathStyle}
            />
            {showDivider && (
                <div
                    className={styles.divider}
                    style={{ left: `${splitX}px`, transform: "translateX(-2px)" }}
                />
            )}
        </div>
    );
};

export default ImageSplit;