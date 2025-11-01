import React, { useState, useRef, useEffect } from "react";
import styles from "./TinderView.module.scss";
import getIcon from "../../utils/Iconifier";

const TinderView = ({
  children,
  setActiveIndex,
  setwiggle = false,
  showNext = true,
  conductnext,
}) => {
  const items = React.Children.toArray(children);
  const total = items.length;

  if (total === 0) {
    return <div className={styles.empty}>No cards provided</div>;
  }

  const [current, setCurrent] = useState(0);
  const [next, setNext] = useState(1 % total);
  const [direction, setDirection] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [showHint, setShowHint] = useState(false);
  const startPos = useRef(null);
  const ANIM_DURATION = 450;
  const SWIPE_THRESHOLD = 120;
  const BASE_SCALE = 0.96; // resting scale for next card
  const BASE_Y = 18; // resting Y offset for next card
  const MAX_LIFT = 6;

  useEffect(() => {
    if (conductnext > 0) {
      handleSwipe("right");
    }
  }, [conductnext]);
  useEffect(() => {
    let hintTimeout;
    if (setwiggle) {
      hintTimeout = setTimeout(() => {
        triggerHint();
      }, 2000);
    }
    return () => clearTimeout(hintTimeout);
  }, [setwiggle]);
  // --- Swipe logic ---
  const handleSwipe = (dir) => {
    if (animating) return;
    setDirection(dir);
    setAnimating(true);

    setTimeout(() => {
      const newCurrent = next;
      const newNext = (next + 1) % total;

      setCurrent(newCurrent);
      setActiveIndex?.(newCurrent);
      setNext(newNext);
      setDirection(null);
      setAnimating(false);
      setOffset({ x: 0, y: 0 });
    }, ANIM_DURATION);
  };

  // --- Drag handlers ---
  const handleStart = (e) => {
    if (animating) return;
    setDragging(true);
    startPos.current = e.touches ? e.touches[0].clientX : e.clientX;
  };

  const handleMove = (e) => {
    if (!dragging || animating) return;
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const dx = clientX - startPos.current;
    setOffset({ x: dx, y: 0 });
  };

  const handleEnd = () => {
    if (!dragging || animating) return;
    setDragging(false);

    if (Math.abs(offset.x) > SWIPE_THRESHOLD) {
      handleSwipe(offset.x > 0 ? "right" : "left");
    } else {
      setOffset({ x: 0, y: 0 });
    }
  };

  // --- Top card style ---
  const RESTING_TILT = 0;
  const topStyle = {
    transform: dragging
      ? `translateX(${offset.x}px) rotate(${offset.x / 20}deg)`
      : direction === "left"
        ? "translateX(-150%) rotate(-10deg)"
        : direction === "right"
          ? "translateX(150%) rotate(10deg)"
          : showHint
            ? `translateX(-40px) rotate(-3deg) ` // hint swipe
            : `translateX(0) rotate(${RESTING_TILT}deg)`,
    transition: dragging
      ? "none"
      : showHint
        ? "transform 2s ease"
        : "transform var(--anim-duration) var(--ease), opacity var(--anim-duration) var(--ease)",
    opacity: direction ? 0 : 1,
  };
  const nextTransform = `translateY(${BASE_Y - Math.min(Math.abs(offset.x) / 15, MAX_LIFT)}px) scale(${Math.min(BASE_SCALE + Math.min(Math.abs(offset.x) / 2000, 0.02), 1)})`;

  const nextStyle = {
    transform: nextTransform,
    transition:
      direction || !dragging
        ? "transform var(--anim-duration) var(--ease), opacity var(--anim-duration) var(--ease)"
        : "none",
  };
  // --- Show hint animation ---
  const triggerHint = () => {
    if (animating || dragging) return;
    setShowHint(true);
    setTimeout(() => setShowHint(false), 300);
  };

  return (
    <div className={styles.tinderView}>
      <div className={styles.stack}>
        {/* Next card */}
        <div
          key={next}
          className={`${styles.card} ${styles.next}`}
          style={nextStyle}
        >
          {items[next]}
        </div>

        {/* Top card */}
        <div
          key={current}
          className={`${styles.card} ${styles.top}`}
          style={topStyle}
          onMouseDown={handleStart}
          onMouseMove={handleMove}
          onMouseUp={handleEnd}
          onMouseLeave={handleEnd}
          onTouchStart={handleStart}
          onTouchMove={handleMove}
          onTouchEnd={handleEnd}
        >
          {items[current]}
        </div>
      </div>

      <div className={styles.fakeStack} />

      {showNext && (
        <div className={styles.controls}>
          <button onClick={() => handleSwipe("right")} disabled={animating}>
            {getIcon("right")}
          </button>
        </div>
      )}
    </div>
  );
};

export default TinderView;
