import React from 'react';
import { FaAward } from 'react-icons/fa';
import styles from './styles/QualificationTile.module.scss';
import getIcon from "../../../utils/Iconifier.jsx";

const QualificationTile = ({
                               title = "Bachelor of Science",
                               institution = "University of Excellence",
                               year = "2020",
                               field = "Computer Science",
                               gpatag = null,
    icon = null
                           }) => {
    return (
        <div className={`${styles.tile} group`}>
            <div className={styles.content}>
                {/* Award icon */}
                <div className={styles.iconWrapper}>
                    <div className={styles.iconGlow}></div>
                    <div className={styles.iconRelative}>
                        {icon ? (
                            <div className={styles.awardIcon}>
                                {React.cloneElement(getIcon(icon), { className: styles.awardIconSVG })}
                            </div>
                        ) : (
                            <FaAward className={styles.awardIcon} />
                        )}
                    </div>

                </div>

                {/* Text content */}
                <div className={styles.textContent}>
                    <div className={styles.titleRow}>
                        <h3 className={styles.title}>{title}</h3>
                    </div>

                    <span className={styles.field}>
            {field}
                        {gpatag && (
                            <>
                                <span className={styles.dot}>•</span>
                                <span className={styles.gpa}>{gpatag}</span>
                            </>
                        )}
          </span>

                    <div className={styles.meta}>
                        <span>{institution}</span>
                        <span className={styles.dot}>•</span>
                        <span>{year}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QualificationTile;
