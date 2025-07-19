import React from "react";
import styles from "./thumbnail.module.scss";
import getIcon from "../utils/Iconifier";
import { StandardButton } from "./UI/StandardButton";
import useScreenSize from "../utils/screensize";

export const Thumbnail = ({
  data,
  fullLinkCallBack,
  type = "large_thumb",
  index = -1,
}) => {
  const screenSize = useScreenSize();
  if (!data.details) data.details = data;

  const details = data?.details ?? {};
  const tags = Array.isArray(details.tags) ? details.tags : [];

const containerStyle =
  details.bgimage && screenSize !== "sm"
    ? {
        backgroundImage: `url(${details.bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};
const handleClick = () => {
  console.log(details.ext_url);

  const isExternal =
    details.ext_url &&
    (details.ext_url.startsWith("http") || details.ext_url.startsWith("www."));

  if (isExternal) {
    const fullUrl = details.ext_url.startsWith("www.")
      ? `https://${details.ext_url}`
      : details.ext_url;
    window.open(fullUrl, "_blank");
    return; // prevent fallback callback if external
  }

  // If screen is not small and a callback is defined, use it
  if (typeof fullLinkCallBack === "function" && screenSize !== "sm") {
    fullLinkCallBack();
  }
};
  const renderByType = () => {
    switch (type) {
      case "large_thumb":
        return (
          <div
            className={`${styles.large_thumb} subtleMouseOverBounce flatStyleShadow`}
            style={containerStyle}
            onClick={handleClick}
          >
            <div className={styles.cover} />

            <div className={styles.header}>
              <h2 className={styles.title}>{details.title ?? "Untitled"}</h2>
            </div>

            <div className={styles.content}>
              {tags.length > 0 && (
                <ul className={styles.PillContainer}>
                  {tags.map((tool, i) => (
                    <li className={styles.pill} key={i}>
                      {tool}
                    </li>
                  ))}
                </ul>
              )}

              <p className={styles.subtitle}>{details.subtitle ?? ""}</p>
            </div>
          </div>
        );

      case "compact_thumb":
        return (
          <div
            className={`${styles.compact_thumb} subtleMouseOverBounce flatStyleShadow`}
            style={containerStyle}
            onClick={handleClick}
          >
            <div className={styles.cover}>
              <div className={styles.goIcon}>{getIcon("Go")}</div>
            </div>

            <h2 className={styles.title}>{details.title ?? "Untitled"}</h2>
            <p className={styles.subtitle}>{details.subtitle ?? ""}</p>

            {tags.length > 0 && (
              <ul className={styles.PillContainer}>
                {tags.map((tool, i) => (
                  <li className={styles.pill} key={i}>
                    {tool}
                  </li>
                ))}
              </ul>
            )}
          </div>
        );

      case "mobile_fullscreen":
        return (
          <div
            className={styles.mobile_fullscreen}
            style={containerStyle}
            onClick={handleClick}
          >
            <h2 className={styles.title}>{details.title ?? "Untitled"}</h2>
            <p className={styles.subtitle}>{details.subtitle ?? ""}</p>

            {tags.length > 0 && (
              <ul className={styles.PillContainer}>
                {tags.map((tool, i) => (
                  <li className={styles.pill} key={i}>
                    {tool}
                  </li>
                ))}
              </ul>
            )}

            <div className={styles.linkContainer}>
              {typeof fullLinkCallBack === "function" && (
                <StandardButton
                  label="Open"
                 
                  type="basic_Expand"
                  callback={fullLinkCallBack}
                />
              )}
            </div>
          </div>
        );

      case "mobile_compact":
        return (
          <div
            className={styles.mobile_compact}
            style={containerStyle}
            onClick={handleClick}
          >
            <h2 className={styles.title}>{details.title ?? "Untitled"}</h2>
            <p className={styles.subtitle}>{details.subtitle ?? ""}</p>
          </div>
        );

      default:
        return (
          <div
            className={`${styles.large_thumb} subtleMouseOverBounce flatStyleShadow`}
            style={containerStyle}
            onClick={handleClick}
          >
            <div className={styles.cover} />
            <h2 className={styles.title}>{details.title ?? "Untitled"}</h2>
            <p className={styles.subtitle}>{details.subtitle ?? ""}</p>
          </div>
        );
    }
  };

  return renderByType();
};
