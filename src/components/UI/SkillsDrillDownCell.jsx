import React from 'react';
import styles from './styles/SkillsDrillDown.module.scss'; // Import the SCSS file

const SkillsDrillDown = () => {
  return (
    <div className={styles.skillsDrillDown}>
      <div className={styles.sectionTitle}>
        <h2>Things I'm Decent with.</h2>
        <div className={styles.dotDivider}></div>
      </div>

      <p className={styles.introText}>
        Here's a quick glance at my background and expertise. Over the years, I've built up experience in AI, IT administration, and working with top-tier tools across various industries.
      </p>
        <div className={styles.skillSet}>
          <h3>Programming Languages</h3>
          <div className={styles.tags}>
          <span className={styles.tag}>Python</span>
          <span className={styles.tag}>Java</span>
          <span className={styles.tag}>JavaScript</span>
          <span className={styles.tag}>C#</span>
          <span className={styles.tag}>C</span>
          <span className={styles.tag}>C++</span>
          <span className={styles.spacer}> </span>
          <span className={styles.tag}>R</span>
          </div>
        </div>

        <div className={styles.skillSet}>
          <h3>Cloud & IT Tools</h3>
          <div className={styles.tags}>
          <span className={styles.tag}>M365</span>
          <span className={styles.tag}>Entra</span>
          <span className={styles.tag}>Intune</span>
          <span className={styles.tag}>Google Admin</span>
          <span className={styles.tag}>Azure Appliances</span>
          <span className={styles.tag}>AaD</span>
          <span className={styles.tag}>Windows Server</span>
          <span className={styles.spacer}> </span>
          <span className={styles.tag}>Network Design</span>
          </div>
        </div>

        <div className={styles.skillSet}>
          <h3>Libraries & Frameworks</h3>
          <div className={styles.tags}>
          <span className={styles.tag}>TensorFlow</span>
          <span className={styles.tag}>Pandas</span>
          <span className={styles.tag}>SQL</span>
          <span className={styles.tag}>Spark</span>
          <span className={styles.tag}>PyTorch</span>
          <span className={styles.spacer}> </span>
          <span className={styles.tag}>REACT</span>
          <span className={styles.tag}>VUE</span>
          </div>
        </div>

        <div className={styles.skillSet}>
          <h3>Other Skills (That use those ones)</h3>
          <div className={styles.tags}>
            <span className={styles.tag}>Data Analysis</span>
            <span className={styles.tag}>Regression Analysis</span>
            <span className={styles.tag}>Neural Network Architecture</span>
            <span className={styles.tag}>Distributed Computing</span>
            <span className={styles.tag}>Algorithm analysis</span>
            <span className={styles.spacer}> </span>
            <span className={styles.tag}>Dealing with Sharepoint + Onedrive with a brave face</span>
          </div>
        </div>
      </div>
  
  );
};

export default SkillsDrillDown;
