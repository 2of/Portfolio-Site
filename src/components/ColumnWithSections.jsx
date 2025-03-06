import React, { useState } from "react";
import styles from "./Column.module.scss";
import clsx from "clsx";
import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";

const ColumnWithSections = ({ data, fullLink, twoColumns,topDivider=false,topDivideDouble=false , leftDivider=false }) => {
  const [imageStatus, setImageStatus] = useState({});
  const [isMouseOver, setIsMouseOver] = useState(false);

  const handleImageLoad = (index) => {
    setImageStatus((prev) => ({ ...prev, [index]: "loaded" }));
  };

  const handleImageError = (index) => {
    setImageStatus((prev) => ({ ...prev, [index]: "error" }));
  };

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);

  return (
    <div
      className={`${styles.column} ${fullLink ? styles.fullLink : ""}${topDivider ? styles.dividerTop : "" }  ${leftDivider ? styles.dividerLeft : "" } ${topDivideDouble ? styles.dividerTopDouble : "" }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {fullLink && (
        <div
          className={clsx(styles.overlayLink, {
            [styles.showOverlayLink]: isMouseOver,
          })}
        >
          <h2> Go </h2>
        </div>
      )}

      {/* Title */}
      {data.title && <h2 className={styles.title}>{data.title}</h2>}

      {/* Subtitle */}
      {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

      {/* Render Sections */}

      <div className={`${styles.sectionsCOntainer} ${twoColumns ? styles.twoColumns : styles.singleColumn}`}>
  


  <div className={styles.columnSection}>
    {data.sections.map((section, sectionIndex) =>
      twoColumns
        ? // If twoColumns is true, split items into their own sections
          section.items.map((item, itemIndex) => (
            <div key={`${sectionIndex}-${itemIndex}`} className={styles.section}>
              {renderItem(item, itemIndex)}
            </div>
          ))
        : // Otherwise, keep normal section structure
          (
            <div key={sectionIndex} className={styles.section}>
              {section.name && <h3 className={styles.sectionName}>{section.name}</h3>}
              <div className={styles.items}>
                {section.items.map((item, itemIndex) => renderItem(item, itemIndex))}
              </div>
            </div>
          )
    )}
  </div>
</div>

      {/* Link */}
      {data.link && (
        <a href={data.link.url} className={styles.link}>
          {data.link.text}
        </a>
      )}
    </div>
  );

  function renderItem(item, index) {
    if (item.type === "paragraph") {
      return (
        <p key={index} className={styles.paragraph}>
          {item.text}
        </p>
      );
    } else if (item.type === "image") {
      // Directly reference the image path from the public folder
      const imageSrc = item.src; // Path relative to the public folder
      const fallbackSrc = "/assets/images/default.png"; // Path to your default.png
      return (
        <div key={index} className={styles.imageContainer}>
          <img
            src={imageSrc}
            alt={item.alt || "Image"}
            className={styles.image}
            onError={(e) => {
              e.target.src = fallbackSrc;
            }}
          />
          {item.alt && <div className={styles.imageCaption}>{item.alt}</div>}
        </div>
      );
    } else if (item.type === "highlight") {
      return (
        <div key={index} className={styles.highlight}>
          {item.text}
        </div>
      );
    } else if (item.type === "pills") {
      return (
        <div key={index} className={styles.pillsContainer}>
          {item.pills.map((pill, pillIndex) => (
            <span key={pillIndex} className={styles.pill}>
              {pill}
            </span>
          ))}
        </div>
      );
    } else if (item.type === "link") {
      // Check if the link is external (starts with http:// or https://)
      const isExternal = item.to.startsWith("http://") || item.to.startsWith("https://");

      return (
        <a
          key={index}
          href={item.to}
          className={styles.linkItem}
          target={isExternal ? "_blank" : undefined} // Open external links in a new tab
          rel={isExternal ? "noopener noreferrer" : undefined} // Security best practice for external links
        >
          {item.label}
        </a>
      );
    }
    return null;
  }
};

export default ColumnWithSections;