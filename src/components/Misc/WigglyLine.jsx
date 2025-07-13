import React from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";

const WigglyLine = ({ fillAllSpace = true }) => {
  const { isDarkMode } = useGlobalContext();

  const wiggleCount = 12;
  const singleWiggleWidth = 12;
  const amplitude = 5;
  const totalWidth = wiggleCount * singleWiggleWidth;
  const height = amplitude * 2;

  let path = `M0 ${amplitude}`;
  for (let i = 0; i < wiggleCount; i++) {
    const startX = i * singleWiggleWidth;
    const midX = startX + singleWiggleWidth / 2;
    const endX = startX + singleWiggleWidth;
    const controlY = i % 2 === 0 ? 0 : amplitude * 2;
    path += ` Q${midX} ${controlY}, ${endX} ${amplitude}`;
  }

  const strokeColor = isDarkMode ? "#ffffff" : "#000000";
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${totalWidth}' height='${height}' viewBox='0 0 ${totalWidth} ${height}'><path d='${path}' fill='none' stroke='${strokeColor}' stroke-width='1.5'/></svg>`;
  const base64Svg = btoa(svg);
  const backgroundImage = `url("data:image/svg+xml;base64,${base64Svg}")`;

  const style = {
    height: `${height}px`,
    width: fillAllSpace ? "100%" : `${totalWidth}px`,
    backgroundImage,
    backgroundRepeat: "repeat-x",
    backgroundSize: `${totalWidth}px ${height}px`,
    display: "block",
  };

  return <div style={style} />;
};

export default WigglyLine;