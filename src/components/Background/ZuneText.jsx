import React from "react";
import styles from "./ZuneTextBg.module.scss"; // Assuming your SCSS is here
import clsx from "clsx";

// Define a list of predefined colors
const colorOptions = {
    default: "var(--accent-color)", // Default color
    red: "rgba(255, 0, 0, 0.5)",
    blue: "rgba(0, 0, 255, 0.5)",
    green: "rgba(0, 255, 0, 0.5)",
    yellow: "rgba(255, 255, 0, 0.5)",
    purple: "rgba(128, 0, 128, 0.5)",
    orange: "rgba(255, 165, 0, 0.5)",
    pink: "rgba(255, 105, 180, 0.5)",
    brown: "rgba(165, 42, 42, 0.5)",
    gray: "rgba(169, 169, 169, 0.5)",
  
    // Tropical and vibrant gradients
    tropicalSunset: "linear-gradient(135deg, rgba(255, 94, 77, 0.8), rgba(255, 159, 64, 0.8))", // Sunset gradient
    beachVibes: "linear-gradient(45deg, rgba(255, 223, 128, 0.7), rgba(0, 183, 255, 0.7))", // Tropical beach vibes
    oceanBreeze: "linear-gradient(120deg, rgba(0, 153, 255, 0.6), rgba(255, 255, 255, 0.4))", // Ocean breeze
    islandEscape: "linear-gradient(135deg, rgba(0, 128, 128, 0.6), rgba(255, 165, 0, 0.6))", // Tropical island
    palmShade: "linear-gradient(90deg, rgba(72, 209, 204, 0.6), rgba(255, 228, 196, 0.6))", // Tropical palm shade
    coralReef: "linear-gradient(120deg, rgba(255, 127, 80, 0.6), rgba(70, 130, 180, 0.6))", // Coral reef gradient
  
    // Summer vibes
    sunnyDay: "linear-gradient(45deg, rgba(255, 223, 0, 0.6), rgba(255, 165, 0, 0.6))", // Summer sunset
    iceCreamDream: "linear-gradient(135deg, rgba(255, 182, 193, 0.7), rgba(255, 218, 185, 0.7))", // Ice cream pastel vibes
  
    // Subtle gradients
    softPeach: "linear-gradient(135deg, rgba(255, 182, 193, 0.6), rgba(255, 228, 225, 0.6))", // Soft peach gradient
    mintyFresh: "linear-gradient(45deg, rgba(152, 255, 152, 0.6), rgba(0, 255, 255, 0.6))", // Minty fresh gradient
  };
  
  

export const ZuneTextBG = ({ text = "hello!", blur = false,verydarkblur=false, color = "default" }) => (
  <div
    className={clsx(
      styles.floatingTextBackgroundWrapper,
      blur ? styles.legibilityfilter : "",
      verydarkblur ? styles.superdarkblur : ""
    )}
    style={{ "--zune-text-bg-color": colorOptions[color] || colorOptions.default }} // Set color based on prop
  >
    <div className={styles.floatingTextBackground}>
      <div className={styles.floatingTextContent}>
        {/* Row 1 */}
        <div className={styles.floatingTextRow}>
          {[...Array(20)].map((_, i) => (
            <span key={`row1-${i}`}>{text} • </span>
          ))}
        </div>
        {/* Row 2 */}
        <div className={styles.floatingTextRow}>
          {[...Array(20)].map((_, i) => (
            <span key={`row2-${i}`}>{text} • </span>
          ))}
        </div>
        {/* Row 3 */}
        <div className={styles.floatingTextRow}>
          {[...Array(20)].map((_, i) => (
            <span key={`row3-${i}`}>{text} • </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);