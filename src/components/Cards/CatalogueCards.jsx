import React from "react";
import styles from "./styles/CatalogueCard.module.scss";
import { useNavigate } from "react-router-dom";
import getIcon from "../../utils/Iconifier";
import { ModernButton } from "../UI/StandardLib/Buttons/Button.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext.jsx";

// Shared navigation hook - extracted from CatalogueCardLarge
const useCardNavigation = ({ data, to, isExternal, onClick }) => {
  const navigate = useNavigate();
  const { getLink } = useGlobalContext();

  const handleClick = () => {
    if (isExternal && (to || data.url)) {
      window.open(to || data.url, "_blank", "noopener noreferrer");
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

  const getLinkUrl = (link) => {
    return link.refURL ? getLink(link.refURL) : link.url;
  };

  return { handleClick, createNavigationCallback, getLinkUrl };
};

// Shared button row component
const CardButtonRow = ({
  data,
  handleClick,
  createNavigationCallback,
  getLinkUrl,
  variant = "dev_simple",
  openButtonVariant,
  showOpenButton = true,
}) => (
  <div className={styles.buttonRow}>
    {data.extralinks &&
      Array.isArray(data.extralinks) &&
      data.extralinks.map((link, i) => (
        <ModernButton
          key={i}
          variant={variant}
          label={link.label}
          tooltip={`Open ${link.label}`}
          icon={getIcon(link.label)}
          callback={createNavigationCallback(getLinkUrl(link))}
        />
      ))}

    {showOpenButton && (
      <ModernButton
        label={data.buttonText || "Open"}
        variant={openButtonVariant || variant}
        tooltip="Open"
        icon={getIcon("right")}
        callback={handleClick}
      />
    )}
  </div>
);

export const CatalogueCardCompact = ({
  data = {},
  to,
  isExternal,
  onClick,
  EntireCardClickable = false,
}) => {
  const { handleClick, createNavigationCallback, getLinkUrl } = useCardNavigation({
    data,
    to,
    isExternal,
    onClick,
  });

  return (
    <div
      onClick={EntireCardClickable ? createNavigationCallback(to) : undefined}
      className={`${styles.CatalogueCardCompact} shadowL2 ${EntireCardClickable ? styles.EntireCardClickable : ""
        }`}
    >
      <div className={styles.CatalogueCardContent}>
        {data.mainTag && (
          <h3 className={styles.mainTag}>
            {getIcon(data.icon)}
            {data.mainTag}
          </h3>
        )}
        <h2 className={styles.title}>{data.title}</h2>
        <p>{data.subtitle}</p>

        {!EntireCardClickable && (
          <CardButtonRow
            data={data}
            handleClick={handleClick}
            createNavigationCallback={createNavigationCallback}
            getLinkUrl={getLinkUrl}
            variant="dev_simple"
            openButtonVariant="dev_icon_only_end_card"
          />
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
}) => {
  const { handleClick, createNavigationCallback, getLinkUrl } = useCardNavigation({
    data,
    to,
    isExternal,
    onClick,
  });

  const tags = data.tags || [];

  return (
    <div
      className={`${styles.CatalogueCardLarge} shadowL2 ${EntireCardClickable ? styles.EntireCardClickable : ""
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

        {/* Tags */}
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
          <CardButtonRow
            data={data}
            handleClick={handleClick}
            createNavigationCallback={createNavigationCallback}
            getLinkUrl={getLinkUrl}
            variant="code_small"
          />
        )}
      </div>
    </div>
  );
};

export const CatalogueCardTextOnly = ({
  data = {},
  tags = [],
  to,
  isExternal,
  onClick,
  EntireCardClickable = false,
}) => {
  const { handleClick, createNavigationCallback, getLinkUrl } = useCardNavigation({
    data,
    to,
    isExternal,
    onClick,
  });

  return (
    <div
      className={`${styles.CatalogueCardTextOnly} ${EntireCardClickable ? styles.EntireCardClickable : ""
        }`}
      onClick={EntireCardClickable ? createNavigationCallback(to) : undefined}
    >
      <div className={styles.CatalogueCardContent}>
        {/* Main Tag */}
        {data.mainTag && (
          <div className={styles.mainTag}>
            {data.mainTagIcon && getIcon(data.mainTagIcon)}
            <span>{data.mainTag}</span>
          </div>
        )}

        {/* Title */}
        <h3 className={styles.title}>{data.title}</h3>

        {/* Description */}
        {data.description && (
          <p className={styles.description}>{data.description}</p>
        )}

        {/* Tags */}
        {tags.length > 0 && (
          <div className={styles.tagsRow}>
            {tags.map((tag, index) => (
              <span key={index} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Buttons */}
        {!EntireCardClickable && (data.extralinks || data.buttonText) && (
          <CardButtonRow
            data={data}
            handleClick={handleClick}
            createNavigationCallback={createNavigationCallback}
            getLinkUrl={getLinkUrl}
            variant="code_small"
            showOpenButton={!!data.buttonText}
          />
        )}
      </div>
    </div>
  );
};
