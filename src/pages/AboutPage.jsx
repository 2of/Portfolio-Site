import React, { useState, useEffect } from "react";
import { useProjects } from "../contexts/ContentContext";
import ProgressBar from "../components/UI/ProgressBar";
import styles from "./AboutPage.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { StandardButton } from "../components/UI/StandardButton";
import StandardToggle from "../components/UI/StandardToggle";
import getIcon from "../utils/Iconifier";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";
import RowView from "../components/UI/RowView";
import DarkModeToggle from "../components/darkmodeToggleSmallInline";
import { StandardChips } from "../components/UI/Chips";

export const AboutPage = () => {
  const {
    prefersCol,
    togglePrefersColumnView,
    openShareSheet,
    themeoverride,
    toggleThemeOverride,
  } = useGlobalContext();

  const { getAboutData } = useProjects();
  const [about, setAbout] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await getAboutData();
      setAbout(data);
    };
    load();
  }, [getAboutData]);

  if (!about) return <p>Loading...</p>;

  // Destructure the general fields
  const { title, subtitle, description, ...sections } = about;

  return (
    <div className="GenericPageContainer scrollyCentered">

   
      <div className={styles.infoChunk}>
        <h2>{title}</h2>
        <h3>{subtitle}</h3>
        <p>{description}</p>
        <ProgressBar
          style="linear"
          animated={true}
          beginAnimate={true}
          val={10}
        />
        <p>{about.areatitle}..</p>
      </div>


      {/* Dynamically render each sub-section */}
      {Object.entries(sections)
  .filter(([_, content]) => {
    // Only render if there's meaningful content
    return (
      content &&
      (content.title ||
        content.subtitle ||
        content.paragraph1 ||
        content.paragraph2 ||
        content.lastline ||
        (Array.isArray(content.data) && content.data.length > 0))
    );
  })
  .map(([sectionKey, content], index) => (
    <div key={sectionKey} className={styles.infoChunk}>
      {content.title && <h2>{content.title}</h2>}
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
  ))}
    </div>
  );
};
