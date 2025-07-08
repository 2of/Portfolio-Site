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

  const containerStyle = details.bgimage
    ? {
        backgroundImage: `url(${details.bgimage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }
    : {};

  const handleClick = () => {
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
                  label="More Info"
                  icon={getIcon("open")}
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