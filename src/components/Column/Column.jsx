import React, { useState } from "react";
import styles from "./Column.module.scss";
import clsx from "clsx";
import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
const Column = ({ data, title, columns = 1, fullLink }) => {
  const [imageStatus, setImageStatus] = useState({});


  const handleImageLoad = (index) => {
    setImageStatus((prev) => ({ ...prev, [index]: "loaded" }));
  };

  const handleImageError = (index) => {
    setImageStatus((prev) => ({ ...prev, [index]: "error" }));
  };

  // Split items into two columns if `columns` is set to 2
  const splitIntoColumns = (items) => {
    const middle = Math.ceil(items.length / 2); // Divide into two halves
    return [
      items.slice(0, middle), // First column
      items.slice(middle), // Second column
    ];
  };
  const [isMouseOver, setIsMouseOver] = useState(false); // State to track mouse hover
  const handleMouseEnter = () => setIsMouseOver(true); // Mouse enters the container
  const handleMouseLeave = () => setIsMouseOver(false); // Mouse leaves the container

  // Split the items if columns=2, otherwise just use the original items
  const [leftColumn, rightColumn] =
    columns === 2 ? splitIntoColumns(data.items) : [data.items, []];

  return (
    <div className={`${styles.column} ${fullLink ? styles.fullLink : ""}`}
    
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    
    >
        <div
          className={clsx(styles.overlayLink, { [styles.showoverlayLink]: isMouseOver })}
        >
          <h2> <FaMoon/> <FaExchangeAlt/> <FaSun/> </h2>
        </div>


      {fullLink && <div className={styles.overlay}> test </div>}
      {/* {title && <div className={styles.columnTitle}>{title}</div>} */}

      {/* Title */}
      {data.title && <h1 className={styles.title}>{data.title}</h1>}

      {/* Subtitle */}
      {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

      {/* List of Items */}
      <div
        className={`${styles.items} ${columns === 2 ? styles.twoColumns : styles.singleColumn}`}
      >
        {/* Left Column */}
        <div className={styles.columnLeft}>
          {leftColumn.map((item, index) => {
            return renderItem(item, index);
          })}
        </div>

        {/* Right Column */}
        {columns === 2 && (
          <div className={styles.columnRight}>
            {rightColumn.map((item, index) => {
              return renderItem(item, index);
            })}
          </div>
        )}
      </div>

      {/* Link */}
      {data.link && (
        <a href={data.link.url} className={styles.link}>
          {data.link.text}
        </a>
      )}
    </div>
  );

  // Helper function to render the item based on its type
  function renderItem(item, index) {
    if (item.type === "paragraph") {
      return (
        <p key={index} className={styles.paragraph}>
          {item.text}
        </p>
      );
    } else if (item.type === "image") {
      const imageSrc = item.src.startsWith("assets/images/")
        ? `/${item.src}`
        : `/assets/images/${item.src}`;
      return (
        <div key={index} className={styles.imageContainer}>
          {imageStatus[index] === "error" ? (
            <div className={styles.imageError}>Failed to load image</div>
          ) : (
            <img
              src={imageSrc}
              alt={item.alt || "Image"}
              className={styles.image}
              onLoad={() => handleImageLoad(index)}
              onError={() => handleImageError(index)}
            />
          )}
          {imageStatus[index] === "loaded" && (
            <div className={styles.imageCaption}>{item.alt}</div>
          )}
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
    }
    return null;
  }
};

export default Column;