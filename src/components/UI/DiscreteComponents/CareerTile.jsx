import React, { useState, useRef, useEffect } from "react";
import { FaBriefcase } from "react-icons/fa";
import styles from "./styles/CareerTile.module.scss";

const SHOW_DELAY = 200; // ms before showing the clone
const HIDE_DELAY = 200; // ms before hiding the clone (lets user move between elements)

const CareerTile = ({
                        position = "Software Engineer",
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
    const [hovered, setHovered] = useState(false); // whether clone is mounted
    const [animateIn, setAnimateIn] = useState(false); // whether clone's "FullReveal" animation/state is active
    const [coords, setCoords] = useState(null);

    const tileRef = useRef(null);
    const showTimer = useRef(null);
    const hideTimer = useRef(null);

    // cleanup timers on unmount
    useEffect(() => {
        return () => {
            clearTimeout(showTimer.current);
            clearTimeout(hideTimer.current);
        };
    }, []);

    const scheduleShowClone = () => {
        clearTimeout(showTimer.current);
        // If we already plan to hide, cancel it — user moved back quickly
        clearTimeout(hideTimer.current);

        showTimer.current = setTimeout(() => {
            if (!tileRef.current) return;
            const rect = tileRef.current.getBoundingClientRect();
            setCoords({
                top: rect.top + window.scrollY,
                left: rect.left + window.scrollX,
                width: rect.width,
                height: rect.height,
            });
            setHovered(true);

            // allow a rAF to let the element mount then trigger animateIn for CSS transitions
            requestAnimationFrame(() => setAnimateIn(true));
        }, SHOW_DELAY);
    };

    const cancelShow = () => {
        clearTimeout(showTimer.current);
    };

    const scheduleHideClone = () => {
        clearTimeout(hideTimer.current);

        // start hide animation
        setAnimateIn(false);

        // only unmount after HIDE_DELAY (let CSS fade/scale-out finish)
        hideTimer.current = setTimeout(() => {
            setHovered(false);
            // ensure animateIn is false after hiding
            setAnimateIn(false);
        }, HIDE_DELAY);
    };

    // base tile handlers
    const handleBaseMouseEnter = () => {
        scheduleShowClone();
    };

    const handleBaseMouseLeave = () => {
        // if the clone is not yet visible (we were in SHOW_DELAY), cancel showing
        if (!hovered) {
            cancelShow();
            return;
        }
        // if clone visible, begin hiding (but clone's mouseenter can cancel hide)
        scheduleHideClone();
    };

    // clone handlers — these are crucial to keep clone visible while cursor over it
    const handleCloneMouseEnter = () => {
        // cancel any pending hide (user moved into the clone)
        clearTimeout(hideTimer.current);
        // ensure it's fully revealed
        requestAnimationFrame(() => setAnimateIn(true));
    };

    const handleCloneMouseLeave = () => {
        // user left the clone — schedule hide
        scheduleHideClone();
    };

    const TileContent = (
        <div className={styles.content} aria-hidden={false}>
            <div className={styles.iconWrapper}>
                <div className={styles.iconGlow}></div>
                <div className={styles.iconRelative}>
                    {icon ? <div className={styles.jobIcon}>{icon}</div> : <FaBriefcase className={styles.jobIcon} />}
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
    );

    return (
        <>
            {/* Base tile (compact) — still handles enter/leave */}
            <div
                ref={tileRef}
                className={`${styles.tile} ${hovered ? styles.ignorePointer : ""}`}
                onMouseEnter={handleBaseMouseEnter}
                onMouseLeave={handleBaseMouseLeave}
            >
                <div className={styles.content}>
                    <div className={styles.iconWrapper}>
                        <div className={styles.iconGlow}></div>
                        <div className={styles.iconRelative}>
                            {icon ? <div className={styles.jobIcon}>{icon}</div> : <FaBriefcase className={styles.jobIcon} />}
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
                    </div>
                </div>
            </div>

            {/* Floating hover clone (mounted after show delay) */}
            {hovered && coords && (
                <div
                    className={`${styles.hoverClone} ${animateIn ? styles.FullReveal : ""}`}
                    style={{
                        top: `${coords.top}px`,
                        left: `${coords.left}px`,
                        width: `${coords.width}px`,
                    }}
                    onMouseEnter={handleCloneMouseEnter}
                    onMouseLeave={handleCloneMouseLeave}
                >
                    {TileContent}
                </div>
            )}
        </>
    );
};

export default CareerTile;
