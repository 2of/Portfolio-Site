import React, { useState, useRef, useEffect } from "react";
import styles from "./styles/StandardTab.module.scss";

export const StandardTab = ({
                                tabPosition = "top",
                                variant = "default",
                                tabs = {},
                            }) => {
    const tabKeys = Object.keys(tabs);
    const [activeTab, setActiveTab] = useState(tabKeys[0]);
    const [indicatorStyle, setIndicatorStyle] = useState({});
    const tabRefs = useRef({});

    useEffect(() => {
        const node = tabRefs.current[activeTab];
        if (node) {
            const rect = node.getBoundingClientRect();
            const parentRect = node.parentElement.getBoundingClientRect();
            setIndicatorStyle({
                width: rect.width,
                left: rect.left - parentRect.left,
            });
        }
    }, [activeTab]);

    const ActiveComponent = tabs[activeTab];

    return (
        <div
            className={`${styles.StandardTabContainer} ${
                tabPosition === "bottom" ? styles.bottom : styles.top
            } ${styles[variant]}`}
        >
            <div className={styles.tabList}>
                {Object.keys(tabs).map((title) => (
                    <button
                        key={title}
                        ref={(el) => (tabRefs.current[title] = el)}
                        className={`${styles.tabButton} ${
                            activeTab === title ? styles.active : ""
                        }`}
                        onClick={() => setActiveTab(title)}
                    >
                        {title}
                    </button>
                ))}

            </div>

            <div className={styles.tabContent}>
                {ActiveComponent ? <ActiveComponent /> : null}
            </div>
        </div>
    );
};
