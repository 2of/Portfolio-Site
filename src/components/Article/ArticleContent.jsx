import React, { useState } from "react";
import singleCol from "../Article/ArticleContent-Vomit-Desktop.module.scss"
import multiCol from "../Article/ArticleContentMultiCol.module.scss" 
import { useTooltip } from "../../contexts/tooltip";
import {
  ParagraphSection,
  ImageSection,
  HighlightSection,
  PillsSection,
  LinkSection,
  CodeSection,
  TitleSection,
} from "./Sections";
import WigglyLine from "../Misc/WigglyLine";
import { useGlobalContext } from "../../contexts/GlobalContext";

// Render one item (paragraph, image, link, etc.)
const renderItem = (item, index, styles, showTooltip, hideTooltip) => {
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

// Individual section renderer
const Section_ = React.memo(({ data, styles, showTooltip, hideTooltip }) => {
  return (
    <>
      {data.boost ? (
        <div className={styles.HighLightSection}>
          {data.name && <h3 className={styles.sectionName}>{data.name}</h3>}
          <div className={styles.items}>
            {data.items.map((item, index) =>
              renderItem(item, index, styles, showTooltip, hideTooltip)
            )}
          </div>
        </div>
      ) : (
        <>
          {data.name && (
            <div>
              <h3 className={styles.sectionTitle}>{data.name}</h3>
            </div>
          )}
          <div className={styles.sectionItems}>
            {data.items.map((item, index) =>
              renderItem(item, index, styles, showTooltip, hideTooltip)
            )}
          </div>
        </>
      )}
    </>
  );
});

export const ArticleContent = ({ data }) => {

  const { showTooltip, hideTooltip } = useTooltip();
     const {
     prefersCol,
     togglePrefersColumnView,
     openShareSheet
   } = useGlobalContext();

     const styles = prefersCol ? multiCol : singleCol
  return (
    <div className={`${styles.ContentContainer}`}>
      {data?.sections?.map((section, sectionIndex) => (
        <>
          <div className={styles.sectionContainer}>
            <Section_
              key={sectionIndex}
              data={section}
              styles={styles}
              showTooltip={showTooltip}
              hideTooltip={hideTooltip}
            />
          </div>
          <div className={styles.sectionDivider}>
            <WigglyLine />
          </div>
        </>
      ))}

      <div className={styles.sectionDivider}>
        <WigglyLine />
      </div>
    </div>
  );
};
