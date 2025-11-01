import React from "react";
import styles from "./styles/CatalogueCard.module.scss";
import { useNavigate } from "react-router-dom";
import getIcon from "../../utils/Iconifier";
import { StandardButton } from "../UI/StandardButton";

export const CatalogueCardCompact = ({
  data = {},
  tags = [],
  to,
  isExternal,
  onClick,
  EntireCardClickable = false,
  showFooter = true,
  isdouble = false,
  swapsides = true,
}) => {
  console.log(data);
  const navigate = useNavigate();
  const handleClick = () => {
    if (isExternal && data.url) {
      window.open(data.url, "_blank", "noopener noreferrer");
    } else if (to) {
      navigate(to, { state: { viewTransition: true } });
    } else if (onClick) {
      onClick();
    } else if (data.url) {
      window.location.href = data.url;
    }
  };
  const createNavigationCallback = (url) => {
    return (event) => {
      if (event) event.stopPropagation();
      if (
        url &&
        (url.startsWith("http") ||
          url.startsWith("mailto") ||
          url.startsWith("//"))
      ) {
        window.open(url, "_blank", "noopener noreferrer");
      } else if (url) {
        navigate(url, { state: { viewTransition: true } });
      }
    };
  };
  return (
    <div
      className={`${styles.CatalogueCardCompact} ${EntireCardClickable ? styles.EntireCardClickable : ""}`}
    >
      {/* <img src={imageSrc} alt={title} />*/}
      <div className={styles.CatalogueCardContent}>
        {data.mainTag && (
          <h3 className={styles.mainTag}>
            {getIcon(data.icon)}
            {data.mainTag}
          </h3>
        )}
        {/* <h2></h2>*/}
        <h2 className={styles.title}>
          {/* {getIcon(data.icon)}*/}
          {data.title}
        </h2>
        <p>{data.subtitle}</p>
        {!EntireCardClickable && (
          <div className={styles.buttonRow}>
            {data.extralinks && Array.isArray(data.extralinks) && (
              <>
                {data.extralinks.map((link, i) => (
                  <StandardButton
                    key={i}
                    type="rounded_catalogue_card_end"
                    label={link.label}
                    tooltip={`Open ${link.label}`}
                    icon={getIcon(link.label)}
                    callback={createNavigationCallback(link.url)}
                  />
                ))}
              </>
            )}

            <StandardButton
              label={data.buttonText}
              type="rounded_catalogue_card_end"
              tooltip="test"
              icon={getIcon("right")}
              tooltip="Open"
              callback={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
export const CatalogueCardLarge = ({
  data = {},

  to,
  isExternal,
  onClick,
  EntireCardClickable = false,
  showFooter = true,
  isdouble = false,
  swapsides = true,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (isExternal && data.url) {
      window.open(data.url, "_blank", "noopener noreferrer");
    } else if (to) {
      navigate(to, { state: { viewTransition: true } });
    } else if (onClick) {
      onClick();
    } else if (data.url) {
      window.location.href = data.url;
    }
  };

  const createNavigationCallback = (url) => {
    return (event) => {
      if (event) event.stopPropagation();
      if (
        url &&
        (url.startsWith("http") ||
          url.startsWith("mailto") ||
          url.startsWith("//"))
      ) {
        window.open(url, "_blank", "noopener noreferrer");
      } else if (url) {
        navigate(url, { state: { viewTransition: true } });
      }
    };
  };
  const tags = data.tags || [];
  return (
    <div
      className={`${styles.CatalogueCardLarge} ${
        EntireCardClickable ? styles.EntireCardClickable : ""
      }`}
      onClick={EntireCardClickable ? handleClick : undefined}
    >
      {/* Background image / Thumbnail */}
      {data.bgimage && (
        <div
          className={styles.CatalogueCardImage}
          style={{ backgroundImage: `url(${data.bgimage})` }}
        />
      )}

      <div className={styles.CatalogueCardContent}>
        {data.mainTag && (
          <h3 className={styles.mainTag}>
            {getIcon(data.icon)}
            {data.mainTag}
          </h3>
        )}

        <h2 className={styles.title}>{data.title}</h2>
        <p className={styles.subtitle}>{data.subtitle}</p>

        {/* TAGS */}
        {tags.length > 0 && (
          <div className={styles.tagsRow}>
            {tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {!EntireCardClickable && (
          <div className={styles.buttonRow}>
            {data.extralinks &&
              Array.isArray(data.extralinks) &&
              data.extralinks.map((link, i) => (
                <StandardButton
                  key={i}
                  type="rounded_catalogue_card_end"
                  label={link.label}
                  tooltip={`Open ${link.label}`}
                  icon={getIcon(link.label)}
                  callback={createNavigationCallback(link.url)}
                />
              ))}

            <StandardButton
              label={data.buttonText}
              type="rounded_catalogue_card_end"
              tooltip="Open"
              icon={getIcon("right")}
              callback={handleClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};
