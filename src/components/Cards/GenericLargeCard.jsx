import React from "react";
import styles from "./styles/GenericLargeCard.module.scss";
import GlassPushOverlay from "../UI/InteractionContainers/GlassContainer";

export const GenericCardLarge = ({
  title,
  subtitle,
  description,
  tags = [],
  icon,
  bgComponent,
  buttons = [],
  variant = "bottom",
  headertext = "nothing",
    bgImage
}) => {

  // Corrected content function
  const content = () => {
    return (
      <div className={`${styles.contentContainer} ${styles[variant] || styles.right}`}>
        <h3 className={styles.title}>{title}</h3>

        <p className={styles.subtitle}>{subtitle}</p>

        <p className={styles.description}>{description}</p>

        <div className={styles.tagsContainer}>
          {tags.map((tagi, i) => (
            <p className={styles.tag} key={i}>
              {tagi}
            </p>
          ))}
        </div>

        {buttons.length > 0 && (
          <div className={styles.buttonContainer}>
            {buttons.map((button, index) => (
              <div key={index}>{button}</div>
            ))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div
      className={styles.container}
      style={{
        "--header-text": `"${headertext}"`,
      }}
    >
      {/* Background */}
      <div className={styles.bgContainer}>

        {bgImage && <img className={styles.bgImage} src={bgImage}/>}
        {bgComponent}
      </div>
{        content()}
      {/* Content Panel */}
      {/* {variant === "floating"  || ? (
    <GlassPushOverlay spiciness={1.1}>
          {content()}
        </GlassPushOverlay>
      ) : (
        content()
      )} */}
    </div>
  );
};
