import React, { useState, useEffect } from "react";
import { useProjects } from "../contexts/ContentContext";
import ProgressBar from "../components/UI/ProgressBar";
import styles from "./AboutPage.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { StandardChips } from "../components/UI/Chips";
import { Section, ScrollableVerticalView } from "../components/Scroll/ScrollableViews/ScrollableVerticalView";
import useScreenSize from "../utils/screensize";



export const AboutPage = () => {
 
  const screenSize = useScreenSize();

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

  const { title, subtitle, description, ...sections } = about;

  const sectionHeaderClass = `${styles._sectionHeader}${screenSize==="sm" ? ` ${styles.mobile}` : ""}`;

  return (
    <ScrollableVerticalView staggerStart trackScrollPercent>
      <Section
        narrow
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
        </div>

      </Section>

      {Object.entries(sections)
        .filter(([_, content]) =>
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
            narrow
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