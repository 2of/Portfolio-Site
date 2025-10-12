import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"; // use Link for navigation + transitions
import base_styles from "./styles/CardLarge.module.scss";
import ridiculous_styles from "./styles/CardLarge_Ridiculous.module.scss";
import { cardPropShape } from "./PropTypes";
import getIcon from "../../utils/Iconifier";
import { ImageLoader } from "../ImageLoader";
import FeatherRevealImage from "../Misc/FeatherImageMouseTracked";
import { useGlobalContext } from "../../contexts/GlobalContext";

const LargeThumbCard = ({ data = {}, tags = [], to, isExternal, onClick }) => {
  const { themeoverride } = useGlobalContext();
  const styles = !themeoverride ? base_styles : ridiculous_styles;




const WrapperComponent = isExternal ? "a" : to ? Link : "div";
const wrapperProps = isExternal
  ? { href: to, target: "_blank", rel: "noopener noreferrer" }
  : to
    ? { to, viewTransition: true }
    : { role: onClick ? "button" : undefined, onClick };
  return (
    <WrapperComponent
      className={styles.large_thumb}
      {...wrapperProps}
      tabIndex={to || onClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (
          (to || onClick) &&
          (e.key === "Enter" || e.key === " ")
        ) {
          e.preventDefault();
          if (onClick && !to) {
            onClick();
          }
          // For Link, Enter key activates by default
        }
      }}
    >
      {data.bgimage && (
        <div className={styles.cover}>
          <ImageLoader src={data.bgimage} alt={data.title ?? "cover image"} />
        </div>
      )}


      <div className={styles.header}>
        <span className={styles.title}>
          {data.icon && <span className={styles.icon}>{getIcon(data.icon)}</span>}
          {isExternal && <p>   {getIcon("external")}</p>} {data.title ?? "Untitled"}      
        </span>
        
      </div>

      <div className={styles.content}>
        {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

        {(tags.length > 0 || (data.tags && data.tags.length > 0)) && (
          <ul className={styles.PillContainer}>
            {(tags.length > 0 ? tags : data.tags).map((tag, i) => (
              <li key={i} className={styles.pill}>
                {tag}
              </li>
            ))}
          </ul>
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
  }),
  tags: PropTypes.arrayOf(PropTypes.string),
  to: PropTypes.string,
  onClick: PropTypes.func,
};

export default LargeThumbCard;
