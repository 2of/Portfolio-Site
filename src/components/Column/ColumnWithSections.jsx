import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import { FaExchangeAlt, FaMoon, FaSun } from "react-icons/fa";
import newspaperStyles from "./NewsPaper.Column.module.scss";
import modernStyles from "./Modern.Column.module.scss";
import BlurStyles from "./ModernBlur.Column.module.scss";
import FunStyles from "./FunStyle.module.scss";
import { TooltipProvider, useTooltip } from "../../contexts/tooltip";
import ImageHandle from "../ImageHandle";
import getIcon from "../../utils/Iconifier";
import useScreenSize from "../../utils/screensize";
import { useProjects } from "../../contexts/ContentContext";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import {
  ParagraphSection,
  ImageSection,
  HighlightSection,
  PillsSection,
  LinkSection,
  CodeSection,
  TitleSection,
} from "./Sections"; // Import all section components from the new file
import { StandardButton } from "../UI/StandardButton";
import Loader from "../Loader";
import Feedback from "../FeedBack";
import { Button } from "@react-pdf-viewer/core";
import DarkModeToggle from "../darkmodeToggleSmallInline";
import WigglyLine from "../Misc/WigglyLine";

const HeroLinks = ({ linkData, styles }) => {
  const navigate = useNavigate();

  const RenderItem = ({ item }) => {
    // return <h1>hi</h1>
    switch (item.type) {
      case "external_link":
        return (
          <StandardButton
            label={item.title}
            icon={getIcon(item.icon)}
            // tooltip="Load the selected model"
            type="article"
            external={true}
            callback={() => {
              window.open(item.to, "_blank");
            }}
            fillContainer={true}
          />
        );
      case "internal_link":
        return (
          <StandardButton
            label={item.title}
            icon={getIcon(item.icon)}
            // tooltip="Load the selected model"
            callback={() => {
              navigate(item.to);
            }}
            type="article"
            fillContainer={true}
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      {linkData &&
        Array.isArray(linkData) &&
        linkData.map((link, index) => (
          <React.Fragment key={index}>
            <div className={styles.buttonContainer}>
              <RenderItem item={link} />
            </div>
          </React.Fragment>
        ))}
    </>
  );
};

// ready , wait, fail, load
const ColumnWithSections = ({
  hasloaded = "wait",
  metadata,
  initialdata,
  fullLink,
  fullLinkCallBack,
  topDivider = false,
  topDivideDouble = false,
  leftDivider = false,
  AsArticle = false,
  style = "modern",
}) => {
  const { getArticle } = useProjects();
  const [imageStatus, setImageStatus] = useState({});
  const [isMouseOver, setIsMouseOver] = useState(false);
  const [scrollOpacity, setScrollOpacity] = useState(0);
  const containerRef = useRef(null);
  // const styles = style === 'newspaper' ? newspaperStyles : BlurStyles;
  const styles = FunStyles;
  const [data, setData] = useState(initialdata);

  const { showTooltip, hideTooltip } = useTooltip();
  const [state, setState] = useState(hasloaded);
console.log("RENDER COLUMN")
  useEffect(() => {
    if (AsArticle && containerRef.current) {
      const handleScroll = () => {
        const scrollTop = containerRef.current.scrollTop;
        const fadeStart = 0;
        const fadeEnd = 500;
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
  }, [data]);

  useEffect(() => {
    const fetchData = async () => {
      if (!metadata) {
        console.warn("[useEffect] No metadata provided");
        setState("fail");
        return;
      }

      // console.log("[useEffect] Fetching article for:", metadata.name);
      const result = await getArticle(metadata);

      if (!result || typeof result !== "object" || Array.isArray(result)) {
        console.warn("[useEffect] Invalid article structure:", result);
        setState("fail");
        return;
      }

      setData(result);
      setState("ready");
    };

    fetchData();
  }, [metadata]);

  const handleMouseEnter = () => setIsMouseOver(true);
  const handleMouseLeave = () => setIsMouseOver(false);
  const screenSize = useScreenSize();
  const { openShareSheet } = useGlobalContext();
  const renderItem = (item, index) => {
    switch (item.type) {
      case "paragraph":
        return (
          <ParagraphSection
            key={index}
            text={item.text}
            className={styles.paragraph}
          />
        );
      case "image":
        return (
          <ImageSection
            key={index}
            src={item.src}
            alt={item.alt}
            className={styles.imageContainer}
            onError={(e) => {
              e.target.src = "/assets/images/default.png";
            }}
          />
        );
      case "highlight":
        return (
          <HighlightSection
            key={index}
            text={item.text}
            className={styles.highlight}
          />
        );
      case "pills":
        return (
          <PillsSection
            key={index}
            pills={item.pills}
            pillStyle={styles.pill}
            className={styles.pillsContainer}
          />
        );
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

      case "title":
        return (
          <TitleSection
            key={index}
            text={item.text}
            className={styles.titleinline}
          />
        );

      case "code":
        return (
          <CodeSection
            key={index}
            language={item.language}
            content={item.content}
            className={styles.codeBlock}
          />
        );

      default:
        return null;
    }
  };

  switch (state) {
    case "ready":
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

          {data.title && (
            <div className={clsx(styles.titleContainer)}>
              <div className={`${styles.bgImageContainer} `}>
                <div
                  className={styles.bgImage}
                  style={
                    data?.heroImage
                      ? {
                          backgroundImage: `url(${data.heroImage})`,
                          backgroundAttachment: "fixed",
                          transform: `scale(${1.2 - scrollOpacity * 0.2})`, // Adjust scale based on scrollOpacity
                          filter: `blur(${scrollOpacity * 5}px)`, // Adjust blur dynamically
                          transition:
                            "transform 0.1s ease-out, filter 0.1s ease-out", // Smooth transition
                        }
                      : {}
                  }
                />
              </div>

              <div className={styles.titleText}> {data.title}</div>

              {data.subtitle && (
                <p className={styles.subtitle}>{data.subtitle}</p>
              )}

              <div className={styles.fadeToBgColourOverlay} />

              {screenSize === "sm" ? (
                <>
                  {data.heroLinks && (
                    <>
                      <div className={styles.heroLinkContainer}>
                        <HeroLinks linkData={data.heroLinks} styles={styles} />
                      </div>
                    </>
                  )}
                </>
              ) : (
                <></>
              )}

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

              {/* <div className={styles.divider}/> */}
              {data.heroLinks && screenSize !== "sm" && (
                <>
                  <div className={styles.heroLinkContainer}>
                    <HeroLinks linkData={data.heroLinks} styles={styles} />
                                <StandardButton
                  label="Share"
                  icon={getIcon("share")}
                  // tooltip="Load the selected model"
                  callback={() => {
                    openShareSheet(
                      window.location.href,
                      "twitter",

                      data.shortDesc ||
                        data.subtitle ||
                        "Noah's Portfolio @ 2of.io",
                      data.title
                    );
                  }}
                  type="article"
                />


<div className={styles.controlsDividerContainer}>

<WigglyLine/>
</div>
                    
                <DarkModeToggle mobile={false}/>
                  </div>
                </>
              )}
              <div className={styles.aboutTitle}>
                <p> {data.author ? data.author : "Unknown Author"} </p>
                <span className={styles.separator}>•</span>
                <p>{data.date ? data.date : "Unknown Date"}</p>
                <span className={styles.separator}>•</span>
                <p>{data.extratext}</p>
              </div>





              {screenSize === "sm" &&
              <div className={styles.standardControls}>
                {/* <div className={styles.leadingLine}/> */}

                <StandardButton
                  label="Share"
                  icon={getIcon("share")}
                  // tooltip="Load the selected model"
                  callback={() => {
                    openShareSheet(
                      window.location.href,
                      "twitter",

                      data.shortDesc ||
                        data.subtitle ||
                        "Noah's Portfolio @ 2of.io",
                      data.title
                    );
                  }}
                  type="article"
                />

                <div className={styles.controlsDividerContainer}>
                  <WigglyLine />
                </div>

                <DarkModeToggle mobile={screenSize != "sm"} />
              </div>}
            </div>
          )}

          {/* {scrollOpacity} */}

          <div className={styles.contentContainer}>
            {/* {scrollOpacity} */}

            <div className={clsx(styles.sectionsContainer, styles.MultiColumn)}>
              <div className={styles.content}>
                {data.sections.map((section, sectionIndex) => (
                  <React.Fragment key={sectionIndex}>
                    {section.boost ? (
                      <React.Fragment>
                        <div key={sectionIndex} className={styles.herosection}>
                          {section.name && (
                            <h3 className={styles.sectionName}>
                              {section.name}
                            </h3>
                          )}
                          <div className={styles.items}>
                            {section.items.map((item, itemIndex) =>
                              renderItem(item, itemIndex)
                            )}
                          </div>
                        </div>
                      </React.Fragment>
                    ) : (
                      <React.Fragment>
                        {section.name && (
                          <h3 className={styles.sectionName}>
                            {sectionIndex}: {section.name}
                          </h3>
                        )}
                        {section.items.map((item, itemIndex) => (
                          <div
                            key={`${sectionIndex}-${itemIndex}`}
                            className={styles.section}
                          >
                            {renderItem(item, itemIndex)}
                            {/* {<h1>test</h1>} */}
                          </div>
                        ))}
                        <div className={styles.sectionSpacer}></div>
                      </React.Fragment>
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className={styles.EndSpacer}></div>
            </div>
          </div>
        </div>
      );
    case "wait":
      return <Loader />;

    case "fail":
      return (
        <>
          <Feedback
            button={<button onClick={() => {}}>Go to Original Link</button>}
          />
        </>
      );
  }
};

export default ColumnWithSections;
