import React from 'react';
import { FaBriefcase } from 'react-icons/fa';
import styles from './styles/CareerTile.module.scss';
import getIcon from "../../../utils/Iconifier.jsx";

const CareerTile = ({
                        position = "Software Engineer",
                        company = "Tech Innovators Inc.",
                        duration = "Jan 2021 - Present",
                        location = "Remote",
                        responsibilities = [
                            "Developed and maintained full-stack web applications.",
                            "Collaborated with cross-functional teams to deliver high-quality products."
                        ],
                        techStack = ["React", "Node.js", "AWS"],
                        icon = null
                    }) => {
    return (
        <div className={`${styles.tile} group`}>
            <div className={styles.content}>

                {/* Icon Section */}
                <div className={styles.iconWrapper}>
                    <div className={styles.iconGlow}></div>
                    <div className={styles.iconRelative}>
                        {icon ? (
                            <div className={styles.jobIcon}>
                                {React.cloneElement(getIcon(icon), { className: styles.jobIconSVG })}
                            </div>
                        ) : (
                            <FaBriefcase className={styles.jobIcon} />
                        )}
                    </div>
                </div>

                {/* Text Content */}
                <div className={styles.textContent}>
                    <div className={styles.titleRow}>
                        <h3 className={styles.position}>{position}</h3>
                    </div>

                    <div className={styles.meta}>
                        <span className={styles.company}>{company}</span>
                        <span className={styles.dot}>•</span>
                        <span className={styles.duration}>{duration}</span>
                        {location && (
                            <>
                                <span className={styles.dot}>•</span>
                                <span className={styles.location}>{location}</span>
                            </>
                        )}
                    </div>

                    {/* Responsibilities */}


                </div>
            </div>
        </div>
    );
};

export default CareerTile;
