import React from 'react';
import styles from './TextPath.module.scss';

const TextOnPath = ({
  position,
  pathData,
  text,
  width = 300,
  height = 200,
}) => {
  // Clamp position between 0 and 1
  const clampedPosition = Math.min(1, Math.max(0, position));
  const pathId = `path-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div className={styles.container}>
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={styles.svg}
      >
        {/* The path that the text will follow */}
        <path
          id={pathId}
          d={pathData}
          fill="none"
          stroke="transparent"
          className={styles.path}
        />
        
        {/* The text positioned along the path */}
        <text className={styles.text}>
          <textPath
            href={`#${pathId}`}
            startOffset={`${clampedPosition * 100}%`}
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {text}
          </textPath>
        </text>
        
        {/* Optional: Visualize the path for debugging */}
        <path
          d={pathData}
          fill="none"
          stroke="#ccc"
          strokeDasharray="2,2"
          className={styles.debugPath}
        />
      </svg>
    </div>
  );
};

export default TextOnPath;