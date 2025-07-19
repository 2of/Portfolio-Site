// SectionComponents.js
import React from "react";

import ProgressBar from "../UI/ProgressBar";
import { classNames } from "@react-pdf-viewer/core";
import clsx from "clsx";
import ImageHandle from "../Handlers/ImageHandle";

// Paragraph Section
export const ParagraphSection = ({ text, className }) => {
  return <p className={className}>{text}</p>;
};

// Image Section
export const ImageSection = ({ src, alt, className, onError }) => {
  return (
    <div className={className}>
      <ImageHandle src={src} alt={alt} onError={onError} />
      {alt && <div className="imageCaption">{alt}</div>}
    </div>
  );
};

// Highlight Section
export const HighlightSection = ({ text, className }) => {
  return <div className={className}>{text}</div>;
};

// Pills Section
export const PillsSection = ({ pills, className, pillStyle }) => {
  return (
    <div className={`${className || ""}`}>
      {pills.map((pill, index) => (
        <span key={index} className={`pill ${pillStyle || ""}`}>
          {pill}
        </span>
      ))}
    </div>
  );
};
// Link Section
export const LinkSection = ({
  to,
  label,
  className,
  showTooltip,
  hideTooltip,
}) => {
  return (
    <a
      href={to}
      onMouseMove={(e) => showTooltip(to, e)}
      onMouseLeave={hideTooltip}
      className={className}
      target="_blank"
      rel="noopener noreferrer"
    >
      {label}
    </a>
  );
};


export const DataSection = ({
  title,
  datapoints = [],
  className,
  styles, // ✅ passed from parent
}) => {


  return (
    <div className={className}>
      {title && <h2 className={styles.sectionTitle}>{title}</h2>}

      {datapoints.map((pointGroup, i) => {
        const barType = pointGroup.type;

        // Render each group block
        return (
          <div key={i} className={styles.block}>
            {pointGroup.overallLabel && (
              <h3 className={styles.overallLabel}>{pointGroup.overallLabel}</h3>
            )}

            {barType === "linear_bar" && (
              <>
                {pointGroup.data.map((point, j) => {
                  const commonProps = {
                    val: point.value,
                    lowerBound: point.lowerBound,
                    upperBound: point.upperBound,
                    showVal: true,
                    showBounds: true,
                  };
                  return (
                    <div className={styles.linearBarRow} key={j}>
            
                      <div className={styles.BarContainer}>
                        <ProgressBar {...commonProps}  label={point.label} />
                      </div>
                    </div>
                  );
                })}
              </>
            )}

            {barType === "radial" && (
              <div className={styles.radialbar}>
                {pointGroup.data.map((point, j) => {
                  const commonProps = {
                    val: point.value,
                    lowerBound: point.lowerBound,
                    upperBound: point.upperBound,
                    showVal: true,
                    showBounds: true,
                  };
                  return (
                    <div className={styles.RadialContainerCell} key={j}>
                      <ProgressBar style="round" {...commonProps}  label={point.label}/>
                      {/* <span className={styles.pointLabel}>{point.label}</span> */}
                    </div>
                  );
                })}
              </div>
            )}

            {/* Fallback for unknown type */}
            {!["linear_bar", "radial"].includes(barType) && (
              <h1 key={`unknown-${i}`}>Unknown type: {barType}</h1>
            )}
          </div>
        );
      })}
    </div>
  );
};




export const GridSection = ({ rows = [], className, styles }) => {
  // console.log(rows, "here");
  return (
    <div className={clsx(styles.gridSection, className)}>

      {rows.map((row, index) => (
        <div key={index} className={styles.row}>
          <span className={styles.rowLabel}>{row.label}</span>
          <span className={styles.rowValue}>{row.value}</span>
        </div>
      ))}
    </div>
  );
};


export const CodeSection = ({
  language = "plaintext",
  content = "",
  className,
}) => {
  return (
    <div className={className}>
      <pre className={`language-${language}`}>
        <code>{content}</code>
      </pre>
    </div>
  );
};

export const TitleSection = ({ text, className }) => {
  return (
    <div className={className}>
      <h4>{text}</h4>
    </div>
  );
};
