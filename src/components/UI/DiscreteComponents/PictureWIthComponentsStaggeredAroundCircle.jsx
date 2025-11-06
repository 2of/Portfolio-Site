import React, { useEffect, useRef, useState } from "react";
import styles from "./Styles/ImageWithStaggeredComponents.module.scss";

export const ImageWithStaggeredComponents = ({ image, children, radius = 10, gap = -50 }) => {
    const containerRef = useRef();
    const [paddings, setPaddings] = useState([]);

    useEffect(() => {
        if (!containerRef.current) return;

        const elements = Array.from(containerRef.current.children);
        const total = elements.length;

        const newPaddings = elements.map((_, i) => {
            const angle = Math.PI * (i / (total - 1)); // 0 → π (half-circle)
            const offset = radius * Math.sin(angle);    // sin curve: 0 → max → 0
            return offset;
        });

        setPaddings(newPaddings);
    }, [children, radius]);

    return (
        <div className={styles.heroSplit}>
            <div className={styles.imageContainer}>
                <img src={image} alt="Hero" />
            </div>
            <div
                ref={containerRef}
                className={styles.HerofirstSection}
                style={{ marginLeft: `${gap}px` }} // horizontal gap between image and text
            >
                {React.Children.map(children, (child, i) => (
                    <div style={{ paddingLeft: paddings[i] || 0 }}>{child}</div>
                ))}
            </div>
        </div>
    );
};
