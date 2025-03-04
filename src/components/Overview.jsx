import React from 'react';
import clsx from 'clsx';
import styles from './Overview.module.scss'; // Import the SCSS file

const Overview = ({ size }) => {
  const qualCells = [
    {
      title: "🎓 Master's in AI",
      description: (
        <>
          <span className={styles.highlight}>UC</span> (In progress)
        </>
      ),
    },
    {
      title: "🎓 Bachelor of Science",
      description: (
        <>
          <span className={styles.highlight}>Computer Science</span>
        </>
      ),
    },
    {
      title: "🛠️ 5+ Years as IT Administrator",
      description: "Specialized in enterprise environments",
    },
    {
      title: "🛠️ Expertise in IT Tools",
      description: "M365, Entra, Intune, Google Admin",
    },
  ];

  return (
    <div className={styles.overview}>
      <div className={styles.sectionTitle}>
        <h2>Overview</h2>
        <div className={styles.dotDivider}></div>
      </div>

      <p className={styles.introText}>
        Here's a quick glance at my background and expertise. Over the years, I've built up experience in AI, IT administration, and working with top-tier tools across various industries.
      </p>
   

      <div className={clsx(styles.qualsContainer, size !== "sm" ? styles.long : styles.compact)}>
        {qualCells.map((cell, index) => (
          <div key={index} className={styles.qualcell}>
            <h4>{cell.title}</h4>
            <p>{cell.description}</p>
          </div>
        ))}
      </div>
      <h4>Scroll</h4>
<div className="arrows">
  <span className="arrow">&#10095;</span>
  <span className="arrow">&#10095;</span>
</div>
    </div>
  );
};

export default Overview;
