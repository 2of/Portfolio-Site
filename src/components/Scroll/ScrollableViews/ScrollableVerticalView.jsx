import React, { useRef, useEffect, useState } from "react";
import clsx from "clsx";
import styles from "./ScrollableVerticalView.module.scss";
import ProgressBar from "../../UI/ProgressBar";
import { useGlobalContext } from "../../../contexts/GlobalContext";
import useScreenSize from "../../../utils/screensize";
export const Section = ({ Header, children, sticky = false, narrow }) => {
  const screenSize = useScreenSize()
  const headerClass = clsx(styles.sectionHeaderContainer, {
    [styles.stickyHeader]: sticky,
    [styles.narrow]: narrow,
  });

  const contentClass = clsx(styles.sectionContent, {
    [styles.narrow]: narrow,
  });

  return (
    <section className={styles.section}>
      {Header && (
        <div className={headerClass}>
          <div className={`${styles.headerContentContainer} ${screenSize === "sm" && styles.mobile}`}>
            <Header />
          </div>
        </div>
      )}
      <div className={contentClass}>{children}</div>
    </section>
  );
};

export const ScrollableVerticalView = ({
  children,
  trackVelocity = true,
  trackScrollPercent,
  staggerStart = false,
  alignCenter = false
}) => {
  const scrollRef = useRef(null);
  const [normalizedVelocity, setNormalizedVelocity] = useState(0);
  const [direction, setDirection] = useState("None");
  const [scrollPercent, setScrollPercent] = useState(0);
  const { isDev } = useGlobalContext;
  const MAX_SCROLL_VELOCITY = 3000;

  useEffect(() => {
    if (!trackVelocity && !trackScrollPercent) return;

    let lastScrollTop = 0;
    let lastTime = performance.now();

    const handleScroll = () => {
      if (!scrollRef.current) return;

      const el = scrollRef.current;
      const scrollTop = el.scrollTop;
      const now = performance.now();
      const deltaY = scrollTop - lastScrollTop;
      const deltaTime = now - lastTime || 1;

      if (trackVelocity) {
        const rawVelocity = (deltaY / deltaTime) * 1000;
        const absVelocity = Math.abs(rawVelocity);
        const clamped = Math.min(absVelocity / MAX_SCROLL_VELOCITY, 1);

        setNormalizedVelocity(clamped.toFixed(2));
        setDirection(deltaY > 0 ? "Down" : deltaY < 0 ? "Up" : "None");
        lastScrollTop = scrollTop;
        lastTime = now;
      }

      if (trackScrollPercent) {
        const scrollHeight = el.scrollHeight - el.clientHeight;
        const percent = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
        setScrollPercent(Math.min(Math.max(percent, 0), 100).toFixed(1));
      }
    };

    const el = scrollRef.current;
    el?.addEventListener("scroll", handleScroll);

    return () => el?.removeEventListener("scroll", handleScroll);
  }, [trackVelocity, trackScrollPercent]);

 const containerClass = clsx(
  styles.scrollContainer,
  trackVelocity
    ? styles.scrollContainerVelocity
    : styles.scrollContainerBounce,
  alignCenter && styles.alignCenter 
);

  const enhancedChildren = React.Children.map(children, (child) => {
    if (!React.isValidElement(child)) return child;
    // witchcraft to make sure sections are sticky
    const isSection = child.type?.name === "Section";
    return isSection
      ? React.cloneElement(child, {
          sticky: true,
          narrow: child.props.narrow,
        })
      : child;
  });

  return (
    <div ref={scrollRef} className={containerClass}>
      {isDev && (trackVelocity || trackScrollPercent) && (
        <div className={styles.velocityInfo}>
          {trackVelocity && (
            <>
              Velocity: {normalizedVelocity} | Direction: {direction}
            </>
          )}
          {trackVelocity && trackScrollPercent && (
            <span style={{ margin: "0 0.5rem" }}>|</span>
          )}
          {trackScrollPercent && <>Scrolled: {scrollPercent}%</>}
        </div>
      )}

      {trackScrollPercent && (
        <div className={styles.progressBarOverlay}>
          <ProgressBar
            lowerBound={0}
            upperBound={100}
            style={"marker"}
            val={scrollPercent}
            mappedtoinput
          />
          {/* <h1>test</h1> */}
          {/* {scrollPercent} */}
        </div>
      )}
      <div 
      className={clsx(
    styles.contentColumn,
    alignCenter && styles.alignCenter
  )}
  >
        {staggerStart && <div className={styles.staggerSpacer} />}
        {enhancedChildren}
      </div>
    </div>
  );
};
