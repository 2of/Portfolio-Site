// components/StandardCollapsableRow.jsx
import React, { useState } from "react";
import styles from "./Styles/CollapsableSection.module.scss";
import getIcon from "../../../utils/Iconifier.jsx";

export const StandardCollapsableRow = ({ 
  title, 
  children, 
  defaultOpen = true,
  buttons = [] ,
  useStandardStyle
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className={`${styles.collapsableSection} ${useStandardStyle && "flatStyleShadow_NO_INTERACT"}`}>
      <div className={styles.collapsableHeaderContainer}>
        <div 
          className={styles.collapsableHeader} 
          onClick={() => setIsOpen(!isOpen)}
        >
          <h3>{title}</h3>
            <div className={styles.collapsableButtons}>
          {buttons.map((button, index) => (
            <button 
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                button.callback();
              }}
              aria-label={button.label}
              className="standardMouseOverBounce"
            >
              {button.label}
            </button>
          ))}

           <span>{!isOpen ? getIcon("down") : getIcon("up")}</span>    
        </div>
    
         
            </div>
        </div>
      
      {isOpen && (
        <div className={styles.collapsableContent}>
          {children}
        </div>
      )}
    </div>
  );
};