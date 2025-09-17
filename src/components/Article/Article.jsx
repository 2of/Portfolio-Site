import React, { useState, useEffect, useRef } from "react";
import styles from "./Article.module.scss";
import { useProjects } from "../../contexts/ContentContext";
import { useTooltip } from "../../contexts/tooltip";
import getIcon from "../../utils/Iconifier";
import Loader from "../Loader";
import { StandardButton } from "../UI/StandardButton";

import { ArticleContent } from "./ArticleContent";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext";
import DarkModeToggle from "../darkmodeToggleSmallInline";
import WigglyLine from "../Misc/WigglyLine";
import StandardToggle from "../UI/StandardToggle";
import { DarkModeWrapper } from "../UI/DarkModeWrapper";
import useScreenSize from "../../utils/screensize";

const StandardControls = ({ data, mobile = false }) => {
  //   console.log("STANDARD", data);

  const { themeOverride, toggleThemeOverride, openShareSheet } =
    useGlobalContext();

  return (
    <>
      <div className={`${styles.ToggleContainer} standardMouseOverBounce `}>
        {" "}
        {/* <DarkModeToggle mobile={false} /> */}
        <DarkModeWrapper />
      </div>

      <StandardButton
        label="Share"
        icon={getIcon("share")}
        callback={() => {
          openShareSheet(
            window.location.href,
            "twitter",
            data.shortDesc || data.subtitle || "Noah's Portfolio @ 2of.io",
            data.title
          );
        }}
        type="article"
        fillContainer={mobile}
      />
      {useScreenSize !== "sm" && (
        <> </>
        // <div className={`${styles.ToggleContainer} standardMouseOverBounce `}>
        //   {" "}
        //   {/* <DarkModeToggle mobile={false} /> */}
        //   <StandardToggle
        //     type="box"
        //     callback={() => togglePrefersColumnView}
        //     checked={prefersCol}
        //     firsticon={getIcon("columns")}
        //     secondicon={getIcon("listview")}
        //   />
        // </div>
      )}
    </>
  );
};

export const TitleSectionPortable = ({ data, variant = "desktop", hiderows }) => {
  const screenSize = useScreenSize();
  const isMobile = variant === "mobile"; // fix this — previously inverted

  return (
    <div
      className={`${styles.articleContainer} ${
        isMobile ? styles.mobile : styles.desktop
      }`}
    >
      <div className={styles.bgImageContainer}>
        <div
          className={styles.bgImage}
          style={
            data?.heroImage
              ? {
                  backgroundImage: `url(${data.heroImage})`,
                  backgroundAttachment: "fixed",
                  filter: "blur(4px)", // static default, or make it responsive
                  transform: `scale(1.1)`,
                }
              : {}
          }
        />
      </div>

      <div className={styles.titleSection}>
        <TitleSection data={data} mobile={isMobile} />
      </div>

      <div className={styles.gradientBG} />
    </div>
  );
};
export const TitleSection = ({ data, tags, mobile = false,hiderows = false }) => {
  return (
    <div className={styles.header}>
      <h1>{data.title}</h1>
      <h2>{data.subtitle}</h2>
 {tags && (
        <div className={styles.tagContainer}>
          <p> {getIcon("tag")} </p>
          {tags.map((tag, i) => (
            <span key={i}>{tag}</span>
          ))}
        </div>
      )}
          <div className={styles.aboutText}>
        <p>{data.author || "Unknown Author"}</p>
        <span className={styles.separator}>•</span>
        <p>{data.date || "Unknown Date"}</p>
        <span className={styles.separator}>•</span>
        <p>{data.extratext}</p>
      </div>

      {mobile && (
        <div className={styles.standardControlsContainer}>
          {/* <span className={styles.separator}>•</span> */}
          <WigglyLine />
          <StandardControls data={data} mobile={mobile} />
        </div>
      )}

      {!hiderows && ( 
      <div className={styles.heroLinksContainer}>
        <HeroLinks linkData={data.heroLinks} />

        {!mobile && (
          <>
            <StandardControls data={data} />
          </>
        )}
      </div>)}

      {/* {mobile ? "YES" : "NO"} */}
     
      <div className={styles.fullDivider}>
        <WigglyLine />
      </div>
    </div>
  );
};

const HeroLinks = ({ linkData }) => {
  const navigate = useNavigate();

  const RenderItem = ({ item }) => {
    switch (item.type) {
      case "external_link":
        return (
          <StandardButton
            label={item.title}
            icon={getIcon(item.icon)}
            type="article"
            external={true}
            callback={() => window.open(item.to, "_blank")}
            fillContainer={true}
          />
        );
      case "internal_link":
        return (
          <StandardButton
            label={item.title}
            icon={getIcon(item.icon)}
            callback={() => navigate(item.to)}
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
      {Array.isArray(linkData) &&
        linkData.map((link, index) => (
          <div className={styles.buttonContainer} key={index}>
            <RenderItem item={link} />
          </div>
        ))}
    </>
  );
};

export const Article = ({ metadata, fixeddata }) => {
  const { getArticle } = useProjects();
  const { showTooltip, hideTooltip } = useTooltip();
  const [loadingState, setLoadingState] = useState("wait");
  const [data, setData] = useState({});
  const [bgModifiervalue, setbgModifiervalue] = useState(0);
  const containerRef = useRef(null);
  const iswip = metadata.wip;
  const screenSize = useScreenSize();
  console.log("ARTICLE METADATA", metadata);
  useEffect(() => {
    if (containerRef.current) {
      const handleScroll = () => {
        const scrollTop = containerRef.current.scrollTop;
        const fadeStart = 0;
        const fadeEnd = 500;
        if (scrollTop < fadeStart) {
          setbgModifiervalue(0);
        } else if (scrollTop > fadeEnd) {
          setbgModifiervalue(1);
        } else {
          setbgModifiervalue((scrollTop - fadeStart) / (fadeEnd - fadeStart));
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
      if (fixeddata) {
        setData(fixeddata);
        setLoadingState("ready");
        return;
      }
      if (!metadata) {
        console.warn("[useEffect] No metadata provided");
        setLoadingState("fail");
        return;
      }

      const result = await getArticle(metadata);
      if (!result || typeof result !== "object" || Array.isArray(result)) {
        console.warn("[useEffect] Invalid article structure:", result);
        setLoadingState("fail");
        return;
      }

      setData(result);
      setLoadingState("ready");
    };

    fetchData();
  }, [metadata, getArticle]);

  if (loadingState === "wait")
    return (
      <div className={styles.LoaderStatusContainer}>
        <Loader />
      </div>
    );
  if (loadingState === "fail")
    return (
      <>
        <h1>failed to load </h1>
      </>
      // <Feedback
      //   button={<button onClick={() => {}}>Go to Original Link</button>}
      // />
    );

  return (
    <div
      className={`${styles.articleContainer} ${
        screenSize === "sm" ? styles.mobile : styles.desktop
      }`}
      ref={containerRef}
    >
      <div className={`${styles.bgImageContainer} `}>
        <div
          className={styles.bgImage}
          style={
            data?.heroImage
              ? {
                  backgroundImage: `url(${data.heroImage})`,
                  backgroundAttachment: "fixed",
                     opacity: `${1 - (bgModifiervalue)-0.1}`,
                  // filter: `blur(${bgModifiervalue * 8}px)`, // starts blurry and sharpens
                  transform: `scale(${1.2 - bgModifiervalue * 0.2})`, // Adjust scale based on scrollOpacity
                  // transition: "transform 0.1s ease-out, filter 0.1s ease-out", // Smooth transition
                }
              : {}
          }
        />
      </div>

      {screenSize !== "sm" && (
        <div
          className={styles.titlePopup}
          style={{
            // opacity: bgModifiervalue, // fades in
            // transform: `scale(${0.98 + bgModifiervalue * 0.02})`, // scales from 0.98 → 1
            transform: `translateY(${-64 +  (  bgModifiervalue) * 64}px)`, // moves up slightly as it appears
            // filter: `blur(${(1 - bgModifiervalue) * 8}px)`, // starts blurry and sharpens
            // transition: 'opacity 0.4s ease, transform 0.4s ease, filter 0.4s ease',
          }}
        >
          <div className={`${styles.TitleContainer} `}>
            <p>{data.title}</p>

            <span className={styles.separator}>•</span>

            <DarkModeWrapper type="pill" />
          </div>  <div className={`${styles.TitleContainer} `}>
            <p>{data.title}</p>
            
            <span className={styles.separator}>•</span>

            <DarkModeWrapper type="pill" />
          </div>
        </div>
      )}
      
      <div className={styles.titleSection}>
        <TitleSection
          data={data}
          tags={metadata.details.tags}
          mobile={screenSize === "sm"}
          // hiderows = {bgModifiervalue}
        />
      </div>

      {iswip && (
        <div className={styles.WIPalert}>
          <h3> • this article is flagged as a work in progress or filler •</h3>
        </div>
      )}
      <div
        className={styles.gradientBG}
        // style={{
        //   transform: `translateY(${1.2 - bgModifiervalue * 42}px)`,
        // }}
      />
      <div className={styles.contentSection}>
        <ArticleContent data={data} />
      </div>
    </div>
  );
};
