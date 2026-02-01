import React, { useState, useEffect } from "react";
import styles from "./Styles/RichTabShowcaseView.module.scss";
import getIcon from "../../utils/Iconifier";

const Tab = ({
  title,
  subtitle,
  description,
  icon,
  index,
  isActive,
  onClick,
}) => {
  return (
    <div
      className={`${styles.tab} shadowL2 ${isActive ? styles.active : ""}`}
      onClick={() => onClick(index)}
    >
      <h4 className={styles.subtitle}>
        {getIcon(icon)}
        {subtitle}
      </h4>
      <div className={styles.text}>
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const RichTabShowCaseView = ({ data, tabPosition = "left", animationType = "scale" }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevTab, setPrevTab] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (index) => {
    if (index === activeTab || isAnimating) return;
    setPrevTab(activeTab);
    setActiveTab(index);
    setIsAnimating(true);
  };

  // Reset animation state after animation duration
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setPrevTab(null);
        setIsAnimating(false);
      }, 400); // match the CSS animation duration (0.4s)
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  return (
    <div className={`${styles.wrapper} ${styles[tabPosition]}`}>
      <div className={`${styles.tabBar} ${styles[tabPosition]}`}>
        {data.map((item, i) => (
          <Tab
            key={i}
            index={i}
            title={item.tabdata.title}
            subtitle={item.tabdata.subtitle}
            description={item.tabdata.description}
            icon={item.tabdata.icon}
            isActive={activeTab === i}
            onClick={handleTabClick}
          />
        ))}
      </div>

      <div className={`${styles.contentWrapper} shadowL2 `}>
        {prevTab !== null && (
          <div className={`${styles.content} ${styles[`${animationType}Out`]}`}>
            {data[prevTab].richdata}
          </div>
        )}
        <div
          className={`${styles.content} ${isAnimating ? styles[`${animationType}In`] : ""}`}
        >
          {data[activeTab].richdata}
        </div>
      </div>
    </div>
  );
};
