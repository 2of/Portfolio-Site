import React from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom"; // if you use react-router
import base_styles from "./styles/CardLarge.module.scss";
import ridiculous_styles from "./styles/CardLarge_Ridiculous.module.scss";
import { cardPropShape } from "./PropTypes";
import getIcon from "../../utils/Iconifier";
import { ImageLoader } from "../ImageLoader";
import FeatherRevealImage from "../Misc/FeatherImageMouseTracked";
import { useGlobalContext } from "../../contexts/GlobalContext";
const LargeThumbCard = ({ data = {}, tags = [], to, onClick }) => {
  const {themeoverride} = useGlobalContext();
    const styles = !themeoverride ? base_styles : ridiculous_styles;
  const navigate = useNavigate();

  const handleClick = () => {
    if (to) {
      navigate(to);
    } else if (onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`${styles.large_thumb}`}
      onClick={handleClick}
      role={handleClick ? "button" : undefined}
      tabIndex={handleClick ? 0 : undefined}
      onKeyDown={(e) => {
        if (handleClick && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      {data.bgimage && (
        <div className={styles.cover}>

            <ImageLoader src={data.bgimage} alt={data.title ?? "cover image"} />
        
        </div>
      )}

      <div className={styles.header}>
        <p className={styles.title}>
          {data.icon && <span className={styles.icon}>{getIcon(data.icon)}</span>}
          {data.title ?? "Untitled"}
        </p>
      </div>

      <div className={styles.content}>
        {data.subtitle && <p className={styles.subtitle}>{data.subtitle}</p>}

        {tags.length > 0 || (data.tags && data.tags.length > 0) ? (
          <ul className={styles.PillContainer}>
            {(tags.length > 0 ? tags : data.tags).map((tag, i) => (
              <li key={i} className={styles.pill}>
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </div>
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