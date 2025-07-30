import React, { useState, useEffect, useRef } from "react";
import styles from "./styles/TypeWriterHeader.module.scss";

// === Timing Config ===
const TYPE_INTERVAL = 130;
const DELETE_INTERVAL = 100;
const PAUSE_AFTER_TYPING = 2500;
const PAUSE_BEFORE_TYPING = 2200;
const CURSOR_BLINK_INTERVAL = 500;

export const AnimatedHeader = ({
  title,
  subtitle,
  icon,
  animate = false,
  replacementText = null,
}) => {
  const [displayedText, setDisplayedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  const typingForwardRef = useRef(true);
  const currentTargetRef = useRef(title);
  const indexRef = useRef(0);
  const timeoutIdRef = useRef(null);

  useEffect(() => {
    if (!animate) {
      setDisplayedText(title);
      return;
    }

    if (!replacementText) {
      // Single typing effect
      indexRef.current = 0;
      setDisplayedText("");
      const typeInterval = setInterval(() => {
        indexRef.current++;
        setDisplayedText(title.slice(0, indexRef.current));
        if (indexRef.current >= title.length) {
          clearInterval(typeInterval);
        }
      }, TYPE_INTERVAL);
      return () => clearInterval(typeInterval);
    }

    // With replacementText: type + delete loop
    const typeDeleteCycle = () => {
      if (typingForwardRef.current) {
        if (indexRef.current < currentTargetRef.current.length) {
          indexRef.current++;
          setDisplayedText(currentTargetRef.current.slice(0, indexRef.current));
          timeoutIdRef.current = setTimeout(typeDeleteCycle, TYPE_INTERVAL);
        } else {
          timeoutIdRef.current = setTimeout(() => {
            typingForwardRef.current = false;
            timeoutIdRef.current = setTimeout(typeDeleteCycle, DELETE_INTERVAL);
          }, PAUSE_AFTER_TYPING);
        }
      } else {
        if (indexRef.current > 0) {
          indexRef.current--;
          setDisplayedText(currentTargetRef.current.slice(0, indexRef.current));
          timeoutIdRef.current = setTimeout(typeDeleteCycle, DELETE_INTERVAL);
        } else {
          currentTargetRef.current =
            currentTargetRef.current === title ? replacementText : title;
          typingForwardRef.current = true;
          timeoutIdRef.current = setTimeout(typeDeleteCycle, PAUSE_BEFORE_TYPING);
        }
      }
    };

    indexRef.current = 0;
    typingForwardRef.current = true;
    currentTargetRef.current = title;
    setDisplayedText("");

    typeDeleteCycle();

    return () => clearTimeout(timeoutIdRef.current);
  }, [title, replacementText, animate]);

  useEffect(() => {
    if (!animate) return;

    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, CURSOR_BLINK_INTERVAL);

    return () => clearInterval(cursorInterval);
  }, [animate]);

  return (
    <header className={styles.StandardHeaderDesktop}>
      
      <div className={styles.textGroup}>
        <h1>
          {icon && <span className={styles.icon}>{icon}</span>}
          {displayedText || "\u200B"}
          {animate && showCursor && <span style={{ fontWeight: "bold" }}>_</span>}
        </h1>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
      </div>
    </header>
  );
};