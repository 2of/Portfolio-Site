import React from "react";
import styles from "./styles/HeaderDesktopDoc.module.scss";

export const HeaderDesktopDoc = ({ 
  title, 
  subtitle, 
  tags, 
  icon, 
  herolinks, 
  extratext, 
  date, 
  author, 
  heroimage 
}) => {
  return (
    <header 
      className={styles.headerDesktopDoc} 
      style={heroimage ? { backgroundImage: `url(${heroimage})` } : {}}
    >
      <div className={styles.headerOverlay}>
        <div className={styles.headerMain}>
          {icon && <span className={styles.headerIcon}>{icon}</span>}
          <h1 className={styles.headerTitle}>{title}</h1>
        </div>
        {subtitle && <p className={styles.headerSubtitle}>{subtitle}</p>}
        {extratext && <p className={styles.headerExtraText}>{extratext}</p>}
        {(author || date) && (
          <div className={styles.headerMeta}>
            {author && <span className={styles.headerAuthor}>By {author}</span>}
            {date && <span className={styles.headerDate}>{date}</span>}
          </div>
        )}
        {tags && tags.length > 0 && (
          <ul className={styles.headerTags}>
            {tags.map((tag, i) => (
              <li key={i} className={styles.headerTag}>{tag}</li>
            ))}
          </ul>
        )}
        {herolinks && herolinks.length > 0 && (
          <nav className={styles.headerHeroLinks}>
            {herolinks.map((link, i) => (
              <a key={i} href={link.href} className={styles.headerLink}>
                {link.label}
              </a>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
};