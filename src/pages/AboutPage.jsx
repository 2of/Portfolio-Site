import React, { useState, useEffect } from "react";
import { useProjects } from "../contexts/ContentContext";
import ProgressBar from "../components/UI/StandardLib/ProgressBar.jsx";
import styles from "./styles/AboutPage.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { StandardChips } from "../components/UI/Chips";
import {
  Section,
  ScrollableVerticalView,
} from "../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView";
import useScreenSize from "../utils/screensize";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";
import getIcon from "../utils/Iconifier";

export const AboutPage = () => {
  const screenSize = useScreenSize();
  const { getLink } = useGlobalContext();
  const { getPageData } = useProjects();
  const [about, setAbout] = useState(null);

useEffect(() => {
  const load = async () => {
    const data = await getPageData({ pagename: "about" }); 
    setAbout(data);
  };
  load();
}, [getPageData]);


  if (!about) return <p>Loading...</p>;

  const { title, subtitle, description, ...sections } = about;

  const sectionHeaderClass = `${styles._sectionHeader}${
    screenSize === "sm" ? ` ${styles.mobile}` : ""
  }`;

  return (
    <ScrollableVerticalView  trackScrollPercent staggerStart={screenSize!== "sm"}>
      <Section sticky={true}
        // narrow
        Header={() => <h2 className={sectionHeaderClass}>{title}</h2>}
      >
        <div className={styles.infoChunk}>
          <h3>{subtitle}</h3>
          <p>{description}</p>
          <ProgressBar
            style="linear"
            animated={true}
            beginAnimate={true}
            val={10}
          />
          <p>{about.areatitle}..</p>
          <span className={styles.buttonContainer}>
            <StandardButton
              label="Résumé"
              // tooltip="Navigate to resume"
              type="subtle"
              icon={getIcon("resume")}
              link={getLink("resume")}
              external={true}
            />
            <StandardButton
              label="Github"
              type="subtle"
              icon={getIcon("github")}
              link={getLink("github")}
              external
            />
            <StandardButton
              label="LinkedIn"
              type="subtle"
              icon={getIcon("linkedin")}
              link={getLink("linkedin")}
              external
            />
          </span>
        </div>
      </Section>

      {Object.entries(sections)
        .filter(
          ([_, content]) =>
            content &&
            (content.title ||
              content.subtitle ||
              content.paragraph1 ||
              content.paragraph2 ||
              content.lastline ||
              (Array.isArray(content.data) && content.data.length > 0))
        )
        .map(([sectionKey, content]) => (
          <Section
            // narrow
            sticky={true}
            key={sectionKey}
            Header={() =>
              content.title ? (
                <h2 className={sectionHeaderClass}>{content.title}</h2>
              ) : null
            }
          >
            <div className={styles.infoChunk}>
              {content.subtitle && <h3>{content.subtitle}</h3>}
              {content.paragraph1 && <p>{content.paragraph1}</p>}
              {content.paragraph2 && <p>{content.paragraph2}</p>}
              {Array.isArray(content.data) && content.data.length > 0 && (
                <div className={styles.dataContainer}>
                  <StandardChips
                    items={content.data.map((d, i) => ({
                      id: i,
                      label: d.title || d.label || "Untitled",
                    }))}
                    variant="outlined"
                    size="small"
                    onChipClick={(chip) => console.log("Clicked:", chip.label)}
                  />
                </div>
              )}
              {content.lastline && <p>{content.lastline}</p>}
            </div>
          </Section>
        ))}
    </ScrollableVerticalView>
  );
};
