// background.jsx
import React, { useEffect, useState, useRef } from "react";
import styles from "./background.module.scss";
import clsx from "clsx";

const TRANSITION_DURATION = 1200; // in ms

// === Individual Background Components ===
const Stars = ({ animateOut }) => {
  return (
    <div className={clsx(styles.starsContainer, animateOut && styles.exit)}>
      {Array.from({ length: 30 }).map((_, i) => (
        <div key={i} className={styles.star} />
      ))}
    </div>
  );
};

const Chess = ({ animateOut }) => {
  return (
    <div className={clsx(styles.chessContainer, animateOut && styles.exit)}>
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className={styles.chessPiece} />
      ))}
    </div>
  );
};

const Workshop = ({ animateOut }) => {
  return (
    <div className={clsx(styles.workshopContainer, animateOut && styles.exit)}>
      {Array.from({ length: 10 }).map((_, i) => (
        <div key={i} className={styles.tool} />
      ))}
    </div>
  );
};

const componentsMap = {
  stars: Stars,
  chess: Chess,
  workshop: Workshop,
};

export default function Background({ type }) {
  const [currentType, setCurrentType] = useState(type);
  const [prevType, setPrevType] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const queueRef = useRef([]);
  const timeoutRef = useRef(null);

  const transitionTo = (newType) => {
    if (isAnimating) {
      queueRef.current.push(newType);
      return;
    }

    if (newType === currentType) return;

    setPrevType(currentType);
    setCurrentType(newType);
    setIsAnimating(true);

    timeoutRef.current = setTimeout(() => {
      setIsAnimating(false);
      setPrevType(null);

      if (queueRef.current.length > 0) {
        const next = queueRef.current.shift();
        transitionTo(next);
      }
    }, TRANSITION_DURATION);
  };

  useEffect(() => {
    transitionTo(type);
    return () => clearTimeout(timeoutRef.current);
  }, [type]);

  const CurrentLayer = componentsMap[currentType];
  const PrevLayer = prevType ? componentsMap[prevType] : null;

  return (
    <div className={styles.backgroundWrapper}>
      {PrevLayer && (
        <div className={clsx(styles.layer)}>
          <PrevLayer animateOut={true} />
        </div>
      )}
      <div className={clsx(styles.layer)}>
        <CurrentLayer animateOut={false} />
      </div>
    </div>
  );
}