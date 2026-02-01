import React from "react";
import { FaBriefcase, FaChevronRight, FaMapMarkerAlt, FaCalendarAlt } from "react-icons/fa";
import styles from "./Styles/CareerTileMobile.module.scss";
import { useModal } from "../../../contexts/ModalContext.jsx";

// Specialized Modal Content Component
const MobileDetailView = ({ position, company, duration, location, doing, techStack, icon }) => {
    return (
        <div className={styles.ModalWrapper}>
            <div className={styles.Header}>
                <div className={styles.modalIcon}>
                    {icon || <FaBriefcase />}
                </div>
                <h2 className={styles.modalPosition}>{position}</h2>
                <div className={styles.modalMeta}>
                    <span className={styles.modalCompany}>{company}</span>
                    <span className={styles.modalDuration}>
                        <FaCalendarAlt size={12} /> {duration}
                    </span>
                    {location && (
                        <span className={styles.modalLocation}>
                            <FaMapMarkerAlt size={12} /> {location}
                        </span>
                    )}
                </div>
            </div>

            <div className={styles.Section}>
                <h4>Responsibilities</h4>
                <ul className={styles.ResponsibilityList}>
                    {doing.map((item, index) => (
                        <li key={index}>{item}</li>
                    ))}
                </ul>
            </div>

            <div className={styles.Section}>
                <h4>Tech Stack</h4>
                <div className={styles.TechTags}>
                    {techStack.map((tech, index) => (
                        <span key={index} className={styles.tag}>{tech}</span>
                    ))}
                </div>
            </div>
        </div>
    );
};

const MobileCareerTile = ({
    position = "Software Engineer",
    company = "Company Name",
    duration = "Jan 2023 - Present",
    location = "Remote",
    doing = [],
    techStack = [],
    icon = null,
}) => {
    const { showModal } = useModal();

    const handleOpenModal = () => {
        showModal({
            title: "", // Hide default title, we render a custom header
            floatnav: true, // Use floating close button for premium look
            size: "large",
            content: (
                <MobileDetailView
                    position={position}
                    company={company}
                    duration={duration}
                    location={location}
                    doing={doing}
                    techStack={techStack}
                    icon={icon}
                />
            ),
            noPadding: true,
        });
    };

    return (
        <div className={styles.MobileTile} onClick={handleOpenModal}>
            <div className={styles.icon}>
                {icon || <FaBriefcase />}
            </div>

            <div className={styles.content}>
                <div className={styles.position}>{position}</div>
                <div className={styles.company}>{company}</div>
                <div className={styles.dates}>{duration}</div>
            </div>

            <div className={styles.arrow}>
                <FaChevronRight />
            </div>
        </div>
    );
};

export default MobileCareerTile;
