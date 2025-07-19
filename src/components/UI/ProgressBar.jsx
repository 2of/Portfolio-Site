import React, { useEffect, useRef, useState } from "react";
import styles from "./ProgressBar.module.scss";
import clsx from "clsx";

const ProgressBar = ({
  style = "linear",
  animated = false,
  beginAnimate,
  val = 0,
  lowerBound = 0,
  upperBound = 100,
  showVal = false,
  showBounds = false,
label,
mappedtoinput
}) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(!animated);
  const [finalPercent, setFinalPercent] = useState(animated ? 0 : calculatePercent(val));

  function calculatePercent(value) {
    const clamped = Math.min(Math.max(value, lowerBound), upperBound);
    const range = upperBound - lowerBound;
    if (range === 0) return 0;
    return ((clamped - lowerBound) / range) * 100;
  }

  useEffect(() => {
    if (animated && beginAnimate === undefined) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
          }
        },
        { threshold: 0.5 }
      );
      if (ref.current) observer.observe(ref.current);
      return () => observer.disconnect();
    }
  }, [animated, beginAnimate]);

  useEffect(() => {
    const nextPercent = calculatePercent(val);
    const trigger = beginAnimate === true || (beginAnimate === undefined && inView);
    if (animated && trigger) {
      setShouldAnimate(true);
      setTimeout(() => setFinalPercent(nextPercent), 20);
    } else if (!animated) {
      setFinalPercent(nextPercent);
    }
  }, [animated, beginAnimate, inView, val, lowerBound, upperBound]);

  return (
    <div
      ref={ref}
      className={clsx(
        styles.progressContainer,
        styles[style],
        animated && shouldAnimate && styles.animate
      )}
      style={{ "--fill-percent": finalPercent }}
    >


      {style === "linear" && (
        
        <>
              {label &&  <div className={styles.headerlabel}>{label}</div>}
          {showBounds && (
            <div className={styles.bounds}>
              <span>{lowerBound}</span>
              <span>{upperBound}</span>
            </div>
          )}
          <div className={styles.bar}>
            <div className={`${styles.fillBar} ${!mappedtoinput && styles.smooth}`}>
              {showVal && (
                <span className={styles.valueLabel}>{val}</span>
              )}
            </div>
          </div>
        </>
      )}

      {style === "round" && (
        <div className={styles.circleWrapper}>
          <svg className={styles.circle} viewBox="0 0 100 100">
            <circle className={styles.track} cx="50" cy="50" r="45" />
            <circle className={styles.fill} cx="50" cy="50" r="45" />
          </svg>
          {showVal && (
            <div className={styles.centerValue}>{val}</div>
          )}
          {label && (
            <div className={styles.belowLabel}>{label}</div>
          )}
        </div>
      )}

{style === "marker" && (
  <div className={styles.dotWrapper}>
    {label && <div className={styles.headerlabel}>{label}</div>}
    <div className={styles.dotTrack}>
      <div className={styles.dotCapLeft} />
<div
  className={clsx(styles.dotMarker, {
    [styles.smooth]: !mappedtoinput,
  })}
  style={{ left: `calc(${finalPercent}% - 1px)` }} // half the width of the marker
/>
      <div className={styles.dotCapRight} />
    </div>
    {showBounds && (
      <div className={styles.bounds}>
        <span>{lowerBound}</span>
        <span>{upperBound}</span>
      </div>
    )}
    {showVal && <div className={styles.dotValue}>{val}</div>}
  </div>
)}
    </div>
  );
};

export default ProgressBar;