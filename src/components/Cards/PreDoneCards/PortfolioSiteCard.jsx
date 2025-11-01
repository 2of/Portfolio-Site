import React from "react";
import styles from "./PortfolioSiteCard.module.scss";
import ImageSplit from "../../Misc/ImageSplit";
import image1 from "../../../assets/Images/default.png";
import image2 from "../../../assets/Images/NewYork.png";

export const PortfolioSiteCard = () => {
  // Define tags for the project
  const tags = ["React", "CSS Modules", "Portfolio", "Web Development"];

  return (
    <div className={styles.card}>
      <header className={styles.cardHeader}>
        <h2 className={styles.title}>Portfolio Site</h2>
        <p className={styles.subtitle}>
          A personal portfolio showcasing projects, skills, and experience.
        </p>
      </header>

      <div className={styles.cardBody}>
        <p className={styles.description}>
          This portfolio site is built with React and styled using CSS Modules.
          It demonstrates my web development skills, responsive design
          abilities, and project presentation techniques. The site features
          interactive components, image galleries, and a clean modern UI.
        </p>

        {/* Image showcase */}
        <ImageSplit image1={image1} image2={image2} />
      </div>

      {/* Tags section */}
      <footer className={styles.cardFooter}>
        <h4 className={styles.tagsTitle}>Tech Stack & Keywords:</h4>
        <div className={styles.tagsContainer}>
          {tags.map((tag, index) => (
            <span key={index} className={styles.tag}>
              {tag}
            </span>
          ))}
        </div>
      </footer>
    </div>
  );
};
