import React, { useState, useRef, useEffect, useLayoutEffect } from "react";
import { createPortal } from "react-dom";
import { FaBriefcase } from "react-icons/fa";
import styles from "./styles/CareerTile.module.scss";
import { useModal } from "../../../contexts/ModalContext.jsx";

const SHOW_DELAY = 200; // Snappy but deliberate
const HIDE_DELAY = 300; // Forgiving for mouse movement

const BasicTile = ({
    position,
    company = "Tech Innovators Inc.",
    duration = "Jan 2021 - Present",
    location = "Remote",
    doing = [
        "Developed and maintained full-stack web applications.",
        "Collaborated with cross-functional teams to deliver high-quality products.",
    ],
    techStack = ["React", "Node.js", "AWS"],
    icon = null,

}) => {
    return (
        <div className={styles.BasicTileContent}>
            {position && (
                <div className={styles.titleRow}>
                    <h3 className={styles.position}>{position}</h3>
                </div>
            )}

            <div className={styles.meta}>
                <span className={styles.company}>{company}</span>
            </div>

            <div className={styles.meta}>
                {location && (
                    <>
                        <span className={styles.location}>{location}</span>
                    </>
                )}
            </div>

            <span className={styles.duration}>{duration}</span>

            <ul className={styles.responsibilities}>
                {doing.map((item, index) => (
                    <li key={index}>{item}</li>
                ))}
            </ul>

            <div className={styles.techStack}>
                {techStack.map((tech, index) => (
                    <span key={index} className={styles.techItem}>
                        {tech}
                    </span>
                ))}
            </div>
        </div>
    );
};

const CareerTileWithHoverDesktop = ({
    position = "",
    company = "Tech Innovators Inc.",
    duration = "Jan 2021 - Present",
    location = "Remote",
    doing = [
        "Developed and maintained full-stack web applications.",
        "Collaborated with cross-functional teams to deliver high-quality products.",
    ],
    techStack = ["React", "Node.js", "AWS"],
    icon = null,
    blur = true,
    openasmodal = false,
    alwaysexpand = false,
}) => {
    const [hovered, setHovered] = useState(false);
    const [animateIn, setAnimateIn] = useState(false);
    const [coords, setCoords] = useState(null);
    const [isMeasuring, setIsMeasuring] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);

    const { showModal } = useModal();
    const tileRef = useRef(null);
    const cloneRef = useRef(null);
    const showTimer = useRef(null);
    const hideTimer = useRef(null);

    const handleModalOpen = () => {
        showModal({
            size: "large",
            title: position,
            content: (
                <BasicTile
                    company={company}
                    duration={duration}
                    location={location}
                    doing={doing}
                    techStack={techStack}
                    icon={icon}
                />
            ),
        });
    };

    // Manage animation state for interaction locking
    useEffect(() => {
        let timer;
        if (animateIn) {
            setIsAnimating(true);
            timer = setTimeout(() => {
                setIsAnimating(false);
            }, 550); // Slightly longer than CSS transition (500ms) to be safe
        } else {
            setIsAnimating(false);
        }
        return () => clearTimeout(timer);
    }, [animateIn]);

    // Close on scroll or resize to prevent detachment/glitches
    useEffect(() => {
        const handleScrollOrResize = () => {
            if (hovered) {
                setHovered(false);
                setAnimateIn(false);
                setCoords(null);
            }
        };

        window.addEventListener("scroll", handleScrollOrResize, { passive: true });
        window.addEventListener("resize", handleScrollOrResize, { passive: true });

        return () => {
            window.removeEventListener("scroll", handleScrollOrResize);
            window.removeEventListener("resize", handleScrollOrResize);
            clearTimeout(showTimer.current);
            clearTimeout(hideTimer.current);
        };
    }, [hovered]);

    // Measurement and Positioning Logic
    useLayoutEffect(() => {
        if (hovered && isMeasuring && cloneRef.current && tileRef.current) {
            const rect = tileRef.current.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const PADDING = 24;

            // 1. Measure content height
            const contentHeight = cloneRef.current.scrollHeight;

            // 2. Calculate max available height
            const maxAvailableHeight = viewportHeight - (2 * PADDING);

            // 3. Determine target height
            let targetHeight = Math.min(contentHeight, maxAvailableHeight);

            // 4. Calculate yOffset to fit in viewport
            const idealBottom = rect.top + targetHeight;
            const maxBottom = viewportHeight - PADDING;

            let yOffset = 0;

            if (idealBottom > maxBottom) {
                yOffset = maxBottom - idealBottom;
            }

            const finalTop = rect.top + yOffset;
            const minTop = PADDING;

            if (finalTop < minTop) {
                const correction = minTop - finalTop;
                yOffset += correction;
                targetHeight = maxBottom - minTop;
            }

            // Apply calculated coordinates
            setCoords(prev => ({
                ...prev,
                yOffset,
                maxCloneHeight: targetHeight
            }));

            // Done measuring, ready to animate
            setIsMeasuring(false);

            // Trigger animation in next frame
            requestAnimationFrame(() => {
                setAnimateIn(true);
            });
        }
    }, [hovered, isMeasuring]);

    const scheduleShowClone = () => {
        if (alwaysexpand) return;

        clearTimeout(showTimer.current);
        clearTimeout(hideTimer.current);

        showTimer.current = setTimeout(() => {
            if (!tileRef.current) return;
            const rect = tileRef.current.getBoundingClientRect();

            // Initial state: Measuring mode
            setCoords({
                top: rect.top,
                left: rect.left,
                width: rect.width,
                height: rect.height,
                yOffset: 0,
                maxCloneHeight: 2000 // Unconstrained for measurement
            });
            setIsMeasuring(true);
            setHovered(true);
        }, SHOW_DELAY);
    };

    const scheduleHideClone = () => {
        if (alwaysexpand) return;

        clearTimeout(hideTimer.current);

        clearTimeout(showTimer.current);

        setAnimateIn(false);

        hideTimer.current = setTimeout(() => {
            setHovered(false);
            setIsMeasuring(false);
            setCoords(null);
        }, HIDE_DELAY);
    };

    const TileContent = (
        <div className={styles.content} aria-hidden={false}>
            <div className={styles.iconWrapper}>
                <div className={styles.jobIcon}>
                    {icon ? icon : <FaBriefcase />}
                </div>
            </div>

            <div className={styles.textContent}>
                <div className={styles.titleRow}>
                    <h3 className={styles.position}>{position}</h3>
                </div>

                <div className={styles.meta}>
                    <span className={styles.company}>{company}</span>
                    {location && (
                        <>
                            <span className={styles.dot}>•</span>
                            <span className={styles.location}>{location}</span>
                        </>
                    )}
                </div>

                <span className={styles.duration}>{duration}</span>

                <div className={`${styles.expandableContent} ${alwaysexpand ? styles.alwaysVisible : ''}`}>
                    <ul className={styles.responsibilities}>
                        {doing.map((item, index) => (
                            <li key={index}>{item}</li>
                        ))}
                    </ul>

                    <div className={styles.techStack}>
                        {techStack.map((tech, index) => (
                            <span key={index} className={styles.techItem}>
                                {tech}
                            </span>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );

    if (alwaysexpand) {
        return (
            <div
                className={`${styles.tile} ${styles.alwaysExpanded} ${blur ? styles.blur : ""}`}
                onClick={openasmodal ? handleModalOpen : undefined}
            >
                {TileContent}
            </div>
        );
    }

    return (
        <>
            <div
                ref={tileRef}
                className={[
                    styles.tile,
                    blur ? styles.blur : "",
                    hovered ? styles.ignorePointer : ""
                ].join(" ")}

                onMouseEnter={!openasmodal ? scheduleShowClone : undefined}
                onMouseLeave={!openasmodal ? scheduleHideClone : undefined}
                onClick={openasmodal ? handleModalOpen : undefined}
            >
                {TileContent}
            </div>

            {hovered && coords && createPortal(
                <div
                    ref={cloneRef}
                    className={`${styles.hoverClone} ${animateIn ? styles.FullReveal : ""} ${isAnimating ? styles.animating : ""}`}
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        width: `${coords.width}px`,
                        '--base-height': `${coords.height}px`,
                        '--max-clone-height': `${coords.maxCloneHeight}px`,
                        '--y-offset': `${coords.yOffset}px`,
                        // Hide during measurement to prevent jumping
                        visibility: isMeasuring ? 'hidden' : 'visible',
                        // Prevent interaction during measurement
                        pointerEvents: isMeasuring ? 'none' : 'auto'
                    }}
                    onMouseEnter={() => { clearTimeout(hideTimer.current); if (!isMeasuring) setAnimateIn(true); }}
                    onMouseLeave={scheduleHideClone}
                >
                    {TileContent}
                </div>,
                document.body
            )}
        </>
    );
};

export default CareerTileWithHoverDesktop;