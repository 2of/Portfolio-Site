// SectionComponents.js
import React from 'react';
import ImageHandle from '../ImageHandle';

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
    <div className={`${className || ''}`}>
      {pills.map((pill, index) => (
        <span key={index} className={`pill ${pillStyle || ''}`}>
          {pill}
        </span>
      ))}
    </div>
  );
};
// Link Section
export const LinkSection = ({ to, label, className, showTooltip, hideTooltip }) => {
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