import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
import newspaperStyles from './NewsPaper.Column.module.scss';
import modernStyles from './Modern.Column.module.scss';
import BlurStyles from './ModernBlur.Column.module.scss';
import { TooltipProvider, useTooltip } from "../../contexts/tooltip";
import ImageHandle from "../ImageHandle";
import getIcon from "../../utils/Iconifier";
import useScreenSize from "../../utils/screensize";
import {
  ParagraphSection,
  ImageSection,
  HighlightSection,
  PillsSection,
  LinkSection,
} from './Sections'; // Import all section components from the new file

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
  const styles = style === 'newspaper' ? newspaperStyles : BlurStyles;

  const { showTooltip, hideTooltip } = useTooltip();

  useEffect(() => {
    if (AsArticle && containerRef.current) {
      const handleScroll = () => {
        const scrollTop = containerRef.current.scrollTop;
        const fadeStart = 0;
        const fadeEnd = 300;
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

  const renderItem = (item, index) => {
    switch (item.type) {
      case "paragraph":
        return <ParagraphSection key={index} text={item.text} className={styles.paragraph} />;
      case "image":
        return (
          <ImageSection
            key={index}
            src={item.src}
            alt={item.alt}
            className={styles.imageContainer}
            onError={(e) => { e.target.src = "/assets/images/default.png"; }}
          />
        );
      case "highlight":
        return <HighlightSection key={index} text={item.text} className={styles.highlight} />;
      case "pills":
        return <PillsSection key={index} pills={item.pills} pillStyle={styles.pill} className={styles.pillsContainer} />;
      case "link":
        return (
          <LinkSection
            key={index}
            to={item.to}
            label={item.label}
            className={styles.linkItem}
            showTooltip={showTooltip}
            hideTooltip={hideTooltip}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div
      ref={containerRef}
      className={clsx(styles.page, {
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

      {/* {scrollOpacity} */}

      {data.title && (
        <div
          className={clsx(styles.titleContainer)}

        >

          <div className={`${styles.bgImageContainer} `}>

            <div
              className={styles.bgImage}
              style={data?.heroImage ? {
                backgroundImage: `url(${data.heroImage})`,
                backgroundAttachment: "fixed",
                transform: `scale(${1.2 - (scrollOpacity * 0.2)})`, // Adjust scale based on scrollOpacity
                filter: `blur(${scrollOpacity * 5}px)`, // Adjust blur dynamically
                transition: "transform 0.1s ease-out, filter 0.1s ease-out" // Smooth transition
              } : {}}

            />
          </div>




          <div className={styles.titleText}


            style={{
              // fontSize:`${40-(10*scrollOpacity)}px`
            }}> {data.title}</div>
          {screenSize === 'sm' ? <>


            {data.subtitle && AsArticle && (
              <p className={styles.subtitle}>{data.subtitle}</p>
            )}

{data.heroLinks && (
          <>
            <div className={styles.heroLinkContainer}>
              {data.heroLinks.map((link, index) => (
                <div
                  className={`${styles.heroLink} ` }
                  onMouseMove={(e) => showTooltip(link.to, e)}
                  onMouseLeave={hideTooltip}
                  key={index}
                  href={link.to}
                >
                  <p>{getIcon(link.type)} {' '} {link.type}</p>
                </div>
              ))}
            </div>
          </>
        )}


          </> :




            <></>}

          <div className={`${styles.collapsedTitleContainer}`}>
            <div
              className={`${styles.collapsedTitle} `}
              style={{
                // opacity: scrollOpacity,
                transform: `translateY(${(1 - scrollOpacity) * -72 - 2}px)`, // Moves up when scrollOpacity is 0 // Moves down when scrollOpacity is 0
              }}
            >
              <h4>{data.title}</h4>
            </div>
          </div>




          <div className={styles.fadeToBgColourOverlay} />
        </div>
      )}



      {/* {scrollOpacity} */}

      <div className={styles.contentContainer}>
        <div>
        {data.subtitle && AsArticle && screenSize !== 'sm' && (
  <p className={styles.subtitle}>{data.subtitle}</p>
)}
          {/* {AsArticle && <div className={styles.divider}> </div>} */}

        </div>
        {/* {scrollOpacity} */}
        {data.subtitle && !AsArticle && (
          <p className={styles.subtitle}>{data.subtitle}</p>
        )}
        {data.heroLinks && screenSize !== 'sm' && (
          <>
            <div className={styles.heroLinkContainer}>
              {data.heroLinks.map((link, index) => (
                <div
                  className={styles.heroLink}
                  onMouseMove={(e) => showTooltip(link.to, e)}
                  onMouseLeave={hideTooltip}
                  key={index}
                  href={link.to}
                >
                  <p>{getIcon(link.type)} {' '} {link.type}</p>
                </div>
              ))}
            </div>
          </>
        )}
        <div
          className={clsx(styles.sectionsContainer, {
            [styles.MultiColumn]: twoColumns,
            [styles.singleColumn]: twoColumns,
          })}
        >

          <div className={styles.divider} />
          <div className={styles.content}>
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
                          {/* {<h1>test</h1>} */}
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
          <div className={styles.EndSpacer}></div>
        </div>
      </div>
    </div>
  );
};

export default ColumnWithSections;