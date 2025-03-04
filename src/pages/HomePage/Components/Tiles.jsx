import React from "react";
import styles from "./Tiles.module.scss";  // You can create a specific SCSS file for tiles here
import { ZuneTextBG } from "../../../components/ZuneText";

// HeroTile component
export const HeroTile = ({ title, subtitle }) => (
    <div className={`${styles.section} ${styles.hero}`}>
      <img src="/pointinghand.svg" alt="Pointing Hand" className={styles.pointingHand} />  {/* Use public path */}
      <h1 className={styles.title}>{title}</h1>
      <p className={styles.subtitle}>{subtitle}</p>
    </div>
  );

// FeaturedTile component
export const FeaturedTile = ({ title, description, link }) => (
  <div className={`${styles.section} ${styles.featuredProject}`}>
    <h4>featured project</h4>
    <h2 className={styles.featuredProjectTitle}>{title}</h2>
    
    <p
      className={styles.featuredProjectDescription}
      dangerouslySetInnerHTML={{
        __html: description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
      }}
    />
    <a href={link} className={styles.featuredProjectLink}>
      View Project →
    </a>
  </div>
);


// QualificationsTile component
export const QualificationsTile = ({ title, items }) => (
  <div className={`${styles.section} ${styles.qualifications}`}>
    <h2 className={styles.qualificationsTitle}>{title}</h2>
    <ul className={styles.qualificationsList}>
      {items.map((item, index) => (
        <li
          key={index}
          dangerouslySetInnerHTML={{
            __html: item.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
          }}
        />
      ))}
    </ul>
  </div>
);

// SocialMediaTile component
export const SocialMediaTile = ({ title, items }) => (
  <div className={`${styles.section} ${styles.socialMedia} `}>
    <h2 className={styles.socialMediaTitle}>{title}</h2>
    <div>
      {items.map((social, index) => (
        <a key={index} href={social.url} target="_blank" rel="noopener noreferrer">
          {social.name}
        </a>
      ))}
    </div>
  </div>
);

// AboutTile component
export const AboutTile = ({ content, title }) => (
  <div className={`${styles.section} ${styles.aboutMe} `}>
    <h2 className={styles.aboutMeTitle}>{title}</h2>
    {content.map((paragraph, index) => (
      <p
        key={index}
        dangerouslySetInnerHTML={{
          __html: paragraph.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        }}
      />
    ))}
  </div>
);

// RecentWorkTile component
export const RecentWorkTile = ({ title, items }) => (
  <div className={`${styles.section} ${styles.recentWork} `}>
    <h2 className={styles.recentWorkTitle}>{title}</h2>
    <div>
      {items.map((work, index) => (
        <div key={index} className={styles.recentWorkItem}>
          <h3 className={styles.recentWorkItemTitle}>{work.title}</h3>
          <p
            className={styles.recentWorkItemDescription}
            dangerouslySetInnerHTML={{
              __html: work.description.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
            }}
          />
        </div>
      ))}
    </div>
  </div>
);

// FooterTile component (dark mode tile or any footer content)
export const FooterTile = () => (
  <div className={`${styles.section} `}>
    {/* You can include any footer component here, like a dark mode toggle */}
    <p>Footer content (Dark Mode Tile)</p>
  </div>
);
