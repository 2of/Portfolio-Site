import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import base_styles from "./styles/SmallCard.module.scss";

import getIcon from "../../utils/Iconifier";
import { ImageLoader } from "../ImageLoader";
import { useGlobalContext } from "../../contexts/GlobalContext";

const SmallCard = ({
  data = {},
  tags = [],
  to,
  isExternal,
  onClick,
  hoverAnimate = true,
}) => {
  const { themeoverride } = useGlobalContext();
  // const styles = !themeoverride ? base_styles : ridiculous_styles;
  const styles = base_styles
  const [isAnimateOpen, setIsAnimateOpen] = useState(false);
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();

    // start animation
    setIsAnimateOpen(true);

    setTimeout(() => {
      if (isExternal && to) {
        const url =
          to.startsWith("http://") || to.startsWith("https://")
            ? to
            : "https://" + to;
        window.open(url, "_blank", "noopener,noreferrer");
        return;
      }

      if (to) {
        // navigate(to, { state: { viewTransition: true } });
        return;
      }

      if (onClick) {
        onClick(e);
      }
    }, 300); // adjust delay to match your click animation
  };

  return (
    <div
      className={`${styles.small_card} ${isAnimateOpen ? styles.clicked : ""}`}
      role="button"
      tabIndex={0}
      onClick={handleClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleClick(e);
      }}
    >
      {/* {isExternal && "YES"} {to} */}
      {data.bgimage && (
        <div className={styles.cover}>
          <ImageLoader src={data.bgimage} alt={data.title ?? "cover image"} />
        </div>
      )}

      <div className={styles.goIcon}>{getIcon("Go")}</div>

      <div className={styles.header}>
        <p className={styles.title}>
          {data.icon && (
            <span className={styles.icon}>{getIcon(data.icon)}</span>
          )}
          {isExternal && (
            <span className={styles.external}>{getIcon("external")}</span>
          )}
          {data.title ?? "Untitled"}
        </p>
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
    </div>
  );
};

SmallCard.propTypes = {
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
  isExternal: PropTypes.bool,
  onClick: PropTypes.func,
};

export default SmallCard;
