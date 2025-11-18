import React, { useState, useEffect } from "react";
import styles from "./Styles/RichTabShowcaseView.module.scss";
import getIcon from "../../utils/Iconifier";

export const RichTabShowCaseView = ({ data }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [prevTab, setPrevTab] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleTabClick = (index) => {
    if (index === activeTab || isAnimating) return;
    setPrevTab(activeTab);
    setActiveTab(index);
    setIsAnimating(true);
  };

  const Tab = ({
    title,
    subtitle,
    description,
    icon,
    index,
    isActive,
    setActiveTab,
  }) => {
    return (
      <div
        className={`${styles.tab} shadowL2 ${isActive ? styles.active : ""}`}
        onClick={() => handleTabClick(index)}
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

  // Reset animation state after animation duration
  useEffect(() => {
    if (isAnimating) {
      const timeout = setTimeout(() => {
        setPrevTab(null);
        setIsAnimating(false);
      }, 500); // match the CSS animation duration
      return () => clearTimeout(timeout);
    }
  }, [isAnimating]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.tabBar}>
        {data.map((item, i) => (
          <Tab
            key={i}
            index={i}
            title={item.tabdata.title}
            subtitle={item.tabdata.subtitle}
            description={item.tabdata.description}
            icon={item.tabdata.icon}
            isActive={activeTab === i}
            setActiveTab={setActiveTab}
          />
        ))}
      </div>

      <div className={`${styles.contentWrapper} shadowL2 `}>
        {prevTab !== null && (
          <div className={`${styles.content} ${styles.fadeOut}`}>
            {data[prevTab].richdata}
          </div>
        )}
        <div
          className={`${styles.content} ${isAnimating ? styles.fadeIn : ""}`}
        >
          {data[activeTab].richdata}
        </div>
      </div>
    </div>
  );
};
