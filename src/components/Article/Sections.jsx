// SectionComponents.js
import React from "react";
import { useState } from "react";
import ProgressBar from "../UI/ProgressBar";
import { classNames } from "@react-pdf-viewer/core";
import clsx from "clsx";
import ImageHandle from "../Handlers/ImageHandle";

// Paragraph Section
export const ParagraphSection = ({ text, className }) => {
  const parseMath = (expr) => {
    // Replace superscripts: x^{2} to x<sup>2</sup> 
    expr = expr.replace(/([a-zA-Z0-9]+)\^\{([^}]+)\}/g, (_, base, sup) => {
      return `${base}<sup>${sup}</sup>`;
    });

    // Replace subscripts: x_{2} to x<sub>2</sub>
    expr = expr.replace(/([a-zA-Z0-9]+)_\{([^}]+)\}/g, (_, base, sub) => {
      return `${base}<sub>${sub}</sub>`;
    });

    // Replace ~ with a non-breaking space too, seems a bit breaky
    expr = expr.replace(/~/g, '\u00A0');

    return <span dangerouslySetInnerHTML={{ __html: expr }} />;
  };

  const parseText = (input) => {
    const parts = input.split(/(\$\$.*?\$\$|\$.*?\$|\*\*[^*]+\*\*)/g);

    return parts.map((part, i) => {
      if (part.startsWith("**") && part.endsWith("**")) {
        return <em key={i}>{part.slice(2, -2)}</em>;
      } else if (part.startsWith("$") && part.endsWith("$")) {
        const math = part.slice(1, -1);
        return <span key={i} className="math">{parseMath(math)}</span>;
      } else {
        return part;
      }
    });
  };

  return <p className={className}>{parseText(text)}</p>;
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
  truncatable = false,
  styles
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  // Split into lines and number them
  const lines = content.split("\n");

  return (
    <div className={`${styles.codeBlock} ${truncatable ? styles.truncate : ""} ${className} "standardMouseOverBounce"`}>
      <button className={styles.copyButton} onClick={handleCopy}>
        {copied ? "✓ Copied" : "Copy"}
      </button>
      <pre className={styles.pre}>
        {lines.map((line, idx) => (
          <div key={idx} className={styles.line}>
            <span className={styles.lineNumber}>{idx + 1}</span>
            <span className={styles.codeContent}>{line || " "}</span>
          </div>
        ))}
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
