import React, { useState } from "react";
import reg_styles from "./ArticleContentMultiCol.module.scss";
import odd_styles from "./ArticleContent-Vomit-Desktop.module.scss";
import { useTooltip } from "../../contexts/tooltip";
import {
  ParagraphSection,
  ImageSection,
  HighlightSection,
  PillsSection,
  LinkSection,
  CodeSection,
  TitleSection,
  DataSection,
  GridSection,
} from "./Sections";
import WigglyLine from "../Misc/WigglyLine";
import { useGlobalContext } from "../../contexts/GlobalContext";

// Render one item (paragraph, image, link, etc.)
export const renderItem = (item, index, styles, showTooltip, hideTooltip, key) => {
  const finalKey = key || item.id || item.name || index;

  switch (item.type) {
    case "paragraph":
      return (
        <ParagraphSection
          key={finalKey}
          text={item.text}
          className={styles.paragraph}
        />
      );
    case "image":
      return (
        <ImageSection
          key={finalKey}
          src={item.src}
          alt={item.alt}
          className={styles.imageContainer}
          onError={(e) => {
            e.target.src = "/assets/images/default.png";
          }}
        />
      );

    case "grid":
      return <GridSection key={finalKey} rows={item.rows} styles={styles} />;
    case "data":
      return (
        <DataSection
          key={finalKey}
          title={item.title}
          datapoints={item.datapoints}
          className={styles.DataSection}
          styles={styles}
        />
      );
    case "highlight":
      return (
        <HighlightSection
          key={finalKey}
          text={item.text}
          className={styles.highlight}
        />
      );
    case "pills":
      return (
        <PillsSection
          key={finalKey}
          pills={item.pills}
          pillStyle={styles.pill}
          className={styles.pillsContainer}
        />
      );
    case "link":
      return (
        <LinkSection
          key={finalKey}
          truncatable={item.truncatable}
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
          key={finalKey}
          text={item.text}
          className={styles.titleinline}
        />
      );
    case "code":
      return (
        <CodeSection
          key={finalKey}
          language={item.language}
          content={item.content}
          className={`${styles.codeBlock} ${
            item.truncatable && styles.truncate
          }`}
          styles={styles}
        />
      );
    default:
      return null;
  }
};
// Individual section renderer
const Section_ = React.memo(({ data, styles, showTooltip, hideTooltip }) => {
  // Helper to generate unique keys per item
  const getItemKey = (item, index) => item.id || item.name || `item-${index}`;

  return (
    <>
      {data.boost ? (
        <div className={styles.HighLightSection}>
          {data.name && <h3 className={styles.sectionName}>{data.name}</h3>}

          {Array.isArray(data.items) && data.items.length > 0 && (
            <div className={styles.items}>
              {data.items.map((item, index) =>
                renderItem(item, index, styles, showTooltip, hideTooltip, getItemKey(item, index))
              )}
            </div>
          )}
        </div>
      ) : (
        <div>
          {data.name && (
            <div>
              <h3 className={styles.sectionTitle}>{data.name}</h3>
            </div>
          )}

          {Array.isArray(data.items) && data.items.length > 0 && (
            <div className={styles.sectionItems}>
              {data.items.map((item, index) =>
                renderItem(item, index, styles, showTooltip, hideTooltip, getItemKey(item, index))
              )}
            </div>
          )}
        </div>
      )}
    </>
  );
});

export const ArticleContent = ({ data }) => {
  const { showTooltip, hideTooltip } = useTooltip();
  const { themeoverride, togglethemeOverride, openShareSheet } =
    useGlobalContext();

  const styles = !themeoverride ? reg_styles : odd_styles;

  return (
    <div className={`${true ? styles.ContentContainer : ""}`}>
      {themeoverride && <h3> Ridiculous mode is on by the way </h3>}
{data?.sections?.map((section, sectionIndex) => (
  <React.Fragment key={`section-${sectionIndex}`}>
    <div className={styles.sectionContainer}>
      <Section_
        data={section}
        styles={styles}
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
      />
    </div>
    <div className={styles.sectionDivider}>
      {/* <WigglyLine /> */}
    </div>
  </React.Fragment>
))}

      <div className={styles.sectionDivider}>
        <WigglyLine />
      </div>
    </div>
  );
};