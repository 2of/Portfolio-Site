import React from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import base_styles from "./styles/CardLarge.module.scss";
import ridiculous_styles from "./styles/CardLarge_Ridiculous.module.scss";
import { cardPropShape } from "./PropTypes";
import getIcon from "../../utils/Iconifier";
import { ImageLoader } from "../ImageLoader";
import FeatherRevealImage from "../Misc/FeatherImageMouseTracked";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { StandardButton } from "../UI/StandardButton";
import TrackedGradientBG from "../Background/TrackedGradientBg";
import FeatherTwoLayer from "../Misc/FeatherTwoLayer";
import GlassPushOverlay from "../UI/GlassContainer";
import PhysicsShapes from "../Background/PhysicsShapes";

const LargeThumbCard = ({
  data = {},
  tags = [],
  to,
  isExternal,
  onClick,
  isCardClickable = false,
  showFooter = true,
  isdouble = false,
  swapsides = true,
}) => {
  const { themeoverride } = useGlobalContext();
  const styles = !themeoverride ? base_styles : ridiculous_styles;
  const navigate = useNavigate();

  // Primary handler for the main card action
  const handleButtonClick = () => {
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

  let WrapperComponent = "div";
  let wrapperProps = {};
  let isWrapperInteractive = false;

  if (isCardClickable) {
    isWrapperInteractive = to || onClick;
    WrapperComponent = isExternal ? "a" : to ? Link : "div";

    wrapperProps = isExternal
      ? { href: to || data.url, target: "_blank", rel: "noopener noreferrer" }
      : to
      ? { to, viewTransition: true }
      : { role: onClick ? "button" : undefined, onClick };
  } else {
    WrapperComponent = "div";
    wrapperProps = {};
  }

  // Simplified Pills component
  const Pills = ({ styles, tags, data }) => {
    // Determine the tags array, giving priority to the 'tags' prop
    const tagSource = tags.length > 0 ? tags : data?.tags || [];

    // Use the conditional operator for clean rendering
    return tagSource.length > 0 ? (
      <ul className={styles.PillContainer}>
        {tagSource.map((tag, i) => (
          <li key={i} className={styles.pill}>
            {tag}
          </li>
        ))}
      </ul>
    ) : null;
  };

  return (
    <WrapperComponent
      className={`${styles.large_thumb} ${
        isdouble ? styles.doublewide : styles.singlewide
      }
      ${swapsides && styles.swapsides}`}
      {...wrapperProps}
      tabIndex={isWrapperInteractive ? 0 : undefined}
      onKeyDown={(e) => {
        if (isWrapperInteractive && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          if (onClick && !to) {
            onClick();
          }
        }
      }}
    >
      {data.bgimage && (
        <div className={styles.thumbnailImage}>
          {!isdouble && (

              <span className={styles.title}>
                {isExternal && <p> {getIcon("external")}</p>}
                {data.title ?? "Untitled"}
              </span>
 
          )}

          <ImageLoader src={data.bgimage} alt={data.title ?? "cover image"} />
        </div>
      )}
      <div className={styles.TextContent}>
        <div className={styles.header}>
          {/* regular header for double wide */}
          {isdouble && (
            <span className={styles.title}>
              {isExternal && <p> {getIcon("external")}</p>}
              {data.title ?? "Untitled"}
            </span>
          )}
        </div>

        <div className={styles.content}>
         
          {data.subtitle && (
            <p className={styles.subtitle}>{data.subtitle}</p>
          )}{" "}

    <Pills styles={styles} tags={tags} data={data} />
           {/*  */}

        </div>

        {showFooter && (
          <div className={styles.footer}>
            <StandardButton
              type="rounded_label"
              label="Open"
              icon={getIcon("article")}
              callback={handleButtonClick}
            />

            {data.extralinks && Array.isArray(data.extralinks) && (
              <>
                {data.extralinks.map((link, i) => (
                  <StandardButton
                    key={i}
                    type="rounded_label"
                    label={link.label}
                    icon={getIcon(link.label)}
                    callback={createNavigationCallback(link.url)}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
    </WrapperComponent>
  );
};

LargeThumbCard.propTypes = {
  data: PropTypes.shape({
    bgimage: PropTypes.string,
    subtitle: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
    title: PropTypes.string,
    type: PropTypes.string,
    url: PropTypes.string,
    icon: PropTypes.string,
    // Assuming the JSON was restructured to an array of objects
    extralinks: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
  to: PropTypes.string,
  onClick: PropTypes.func,
  isExternal: PropTypes.bool,
  isCardClickable: PropTypes.bool,
  showFooter: PropTypes.bool,
};

export default LargeThumbCard;
