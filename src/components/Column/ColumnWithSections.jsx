import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
import newspaperStyles from './NewsPaper.Column.module.scss';
import modernStyles from './Modern.Column.module.scss';

import { TooltipProvider,useTooltip } from "../../contexts/tooltip";
import ImageHandle from "../ImageHandle";
import getIcon from "../../utils/Iconifier";
import useScreenSize from "../../utils/screensize";
const ColumnWithSections = ({
  data,
  fullLink,
  fullLinkCallBack,
  twoColumns,
  topDivider = false,
  topDivideDouble = false,
  leftDivider = false,
  AsArticle = false,
  style = "modern"
}) => {
  const [imageStatus, setImageStatus] = useState({});
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const containerRef = useRef(null);
  const styles = style === 'newspaper' ? newspaperStyles : modernStyles;
    const { showTooltip, hideTooltip } = useTooltip();

  useEffect(() => {
    if (AsArticle && containerRef.current) {
      const handleScroll = () => {
        const scrollTop = containerRef.current.scrollTop;
        const fadeStart = 0;
        const fadeEnd = 100;
        if (scrollTop < fadeStart) {
          setScrollOpacity(0);
        } else if (scrollTop > fadeEnd) {
          setScrollOpacity(1);
        } else {
          setScrollOpacity((scrollTop - fadeStart) / (fadeEnd - fadeStart));
        }
      };

      const container = containerRef.current;
      container.addEventListener("scroll", handleScroll);
      handleScroll();

      return () => container.removeEventListener("scroll", handleScroll);
    }
  }, [AsArticle]);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);
  const screenSize = useScreenSize();
  return (
    <div
      ref={containerRef}
      className={clsx(styles.column, {
        [styles.fullLink]: fullLink,
        [styles.dividerTop]: topDivider,
        [styles.dividerTopDouble]: topDivideDouble,
        [styles.dividerLeft]: leftDivider,
        [styles.article]: AsArticle,
        [styles.sm]: screenSize === "sm",
        [styles.lg]: screenSize === "lg",
        [styles.md]: screenSize === "md",
      })}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >

      {/* overlay */}
      {fullLink && (
        <div
          className={clsx(styles.overlayLink, {
            [styles.showOverlayLink]: isMouseOver,
          })}
          onClick={() => fullLinkCallBack(data)}
        >
          <h2> Go </h2>
        </div>
      )}

      {data.title && (
        <div className={clsx(styles.titleContainer)}>
          <div className={styles.title}>
            <h2>{data.title}</h2>

            {data.subtitle && AsArticle && (
        <p className={styles.subtitle}>{data.subtitle}</p>

              



      )
      

      }



 {AsArticle && <div className={styles.divider}> </div>}
         
 {data.heroLinks && (
  <>
  <div className={styles.heroLinkContainer}>

    {data.heroLinks.map((link, index) => (
 
      <div className={styles.heroLink}
      onMouseMove={(e) => showTooltip(link.to, e)}
      onMouseLeave={hideTooltip}
      
      key={index} href={link.to}>
       
       
       <p>{getIcon(link.type)} {' '} {link.title}</p>
      </div>
    ))}
    </div>
  </>
)}
          </div>
          <div
            className={styles.collapsedTitle}
            style={{ opacity: scrollOpacity }}
          >
            <h2>{data.title}</h2>
            
          </div>
        </div>
      )}

      {data.subtitle && !AsArticle && (
        <p className={styles.subtitle}>{data.subtitle}</p>
      )}

     

      <div
        className={clsx(styles.sectionsContainer, {
          [styles.twoColumns]: twoColumns,
          [styles.singleColumn]: !twoColumns,
        })}
      >
        <div className={styles.columnSection}>
          {AsArticle && data.subtitle && false && (
            <div className={styles.section}>
              <h3 className={styles.sectionName}>In Brief</h3>
              <div className={styles.items}>
                <p className={styles.paragraph}>{data.subtitle}</p>
             
              </div>
            </div>
          )}

            {/* 
            
            Big chonker for how rendering is done here


            1. if two columns we actually split the items into their own sections  (so they flow with
            columsn logic )
            UNLESS a 'booost' is set in the JSON for that section in which case
            it gets made its own special classed section.

            about it
            
            */}

          {data.sections.map((section, sectionIndex) =>
            twoColumns ? (
              <React.Fragment key={sectionIndex}>
                {section.boost ? (
                  <React.Fragment>
                      <div key={sectionIndex} className={styles.herosection}>
                   
                {section.name && <h3 className={styles.sectionName}>{section.name}</h3>}
                <div className={styles.items}>
                  {section.items.map((item, itemIndex) => renderItem(item, itemIndex))}
                </div>
              </div>
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    {section.name && (
                      <h3 className={styles.sectionName}>
                        {section.name}
                      </h3>
                    )}
                    {section.items.map((item, itemIndex) => (
                      <div key={`${sectionIndex}-${itemIndex}`} className={styles.section}>
                        {renderItem(item, itemIndex)}
                      </div>
                    ))}
                    <div className={styles.sectionSpacer}></div>
                  </React.Fragment>
                )}
              </React.Fragment>
            ) : (
              <div key={sectionIndex} className={styles.section}>
                {section.name && <h3 className={styles.sectionName}>{section.name}</h3>}
                <div className={styles.items}>
                  {section.items.map((item, itemIndex) => renderItem(item, itemIndex))}
                </div>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );

  function renderItem(item, index) {
    if (item.type === "paragraph") {
      return <p key={index} className={styles.paragraph}>{item.text}</p>;
    } else if (item.type === "image") {
      return (
        <div key={index} className={styles.imageContainer}>
          {/* <img
            src={item.src}
            alt={item.alt || "Image"}
            className={styles.image}
            onError={(e) => { e.target.src = "/assets/images/default.png"; }}
          /> */}
          {console.log(item.src)}
          <ImageHandle
          src={item.src}
          alt={item.alt || "image"}
          onError={(e) => { e.target.src = "/assets/images/default.png"; }}
          />
          {item.alt && <div className={styles.imageCaption}>{item.alt}</div>}
        </div>
      );
    } else if (item.type === "highlight") {
      return <div key={index} className={styles.highlight}>{item.text}</div>;
    } else if (item.type === "pills") {
      return (
        <div key={index} className={styles.pillsContainer}>
          {item.pills.map((pill, pillIndex) => (
            <span key={pillIndex} className={styles.pill}>{pill}</span>
          ))}
        </div>
      );
    } else if (item.type === "link") {
      return (
        <a key={index} href={item.to} 
        onMouseMove={(e) => showTooltip(item.to, e)}
        onMouseLeave={hideTooltip}
      
      className={styles.linkItem} target="_blank" rel="noopener noreferrer">
          {item.label}
        </a>
      );
    }
    return null;
  }
};

export default ColumnWithSections;