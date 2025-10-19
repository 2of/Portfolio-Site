import React, { useState, useEffect, useRef } from "react";
import TinderView from "../components/Scroll/ScrollableViews/TinderView";
import styles from "./styles/TinderPage.module.scss";
import { CenteredContainer } from "../components/Scroll/CenteredContainer";
import { ShowcasecardStack } from "../assets/TextAssets/Showcase";
import useScreenSize from "../utils/screensize";
import { StandardSlider } from "../components/UI/StandardSlider";
import PageDots from "../components/UI/PageDots";
import { useNavStack } from "../contexts/NavStackContext";
import getIcon from "../utils/Iconifier";
import TrackedGradientBG from "../components/Background/TrackedGradientBg";
import ResponsiveGradient from "../components/Background/ResponsiveGradient";

const TinderPage = () => {
  const screenSize = useScreenSize();
  const cardEntries = Object.entries(ShowcasecardStack);

  const [wiggle, setWiggle] = useState(false);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [prevCardIndex, setPrevCardIndex] = useState(null);
  const [animating, setAnimating] = useState(false);
  const {
    navstack,
    pushNav,
    popNav,
    clearStack,
    removeButton,
    addButton,
    extraButtons,
    extraButtonsContains,
  } = useNavStack();
  const inactivityTimer = useRef(null);
  const periodicTimer = useRef(null);

  const [conductnext, setConductNext] = useState(0);

  const triggerNext = () => {
    // alert("TEST")
    setConductNext((prev) => prev + 1);
  };

  const resetInactivityTimer = () => {
    clearTimeout(inactivityTimer.current);
    clearInterval(periodicTimer.current);
    setWiggle(false);

    inactivityTimer.current = setTimeout(() => {
      setWiggle(true);
      periodicTimer.current = setInterval(() => {
        setWiggle((prev) => !prev);
      }, 5000);
    }, 5000);
  };

  useEffect(() => {
    if (screenSize === "sm") {
      addButton({
        id: "TINDERNAV",
        callback: triggerNext,
        label: "Close",
        icon: getIcon("right"),
      });
    }

    return () => {
      removeButton({ id: "TINDERNAV" });
    };
  }, [screenSize, addButton, removeButton]);
  useEffect(() => {
    const events = ["mousemove", "mousedown", "touchstart", "keydown"];
    events.forEach((evt) => window.addEventListener(evt, resetInactivityTimer));
    resetInactivityTimer();

    return () => {
      events.forEach((evt) =>
        window.removeEventListener(evt, resetInactivityTimer),
      );
      clearTimeout(inactivityTimer.current);
      clearInterval(periodicTimer.current);
    };
  }, []);

  const handleCardChange = (index) => {
    setPrevCardIndex(currentCardIndex);
    setCurrentCardIndex(index % cardEntries.length);
    setAnimating(true);

    // Reset animation flag after duration
    setTimeout(() => setAnimating(false), 400); // 400ms animation
  };
  const cardKeys = Object.keys(ShowcasecardStack);
  const prevTitle =
    prevCardIndex !== null ? cardEntries[prevCardIndex]?.[1]?.title : "";
  const prevSubtitle =
    prevCardIndex !== null ? cardEntries[prevCardIndex]?.[1]?.subtitle : "";
  const currentTitle = cardEntries[currentCardIndex]?.[1]?.title ?? "";
  const currentSubtitle = cardEntries[currentCardIndex]?.[1]?.subtitle ?? "";

  return (
    <CenteredContainer>
      {screenSize === "sm" && <TrackedGradientBG />}
      {/* <TrackedGradientBG />*/}
      {/* <ResponsiveGradient colorProfile={currentCardIndex %10}/> */}
      <div
        className={`${
          screenSize === "sm" ? styles.sidebyside_mobile : styles.sidebyside
        }`}
      >
        {/* Right side — swipeable stack */}
        <div className={styles.StackView}>
          
          <TinderView
            onChange={handleCardChange}
            setActiveIndex={handleCardChange}
            setwiggle={wiggle}
            showNext={screenSize !== "sm"}
            conductnext={conductnext}
          >
            {cardEntries.map(([key, { card }]) => (
              <React.Fragment key={key}>{card}</React.Fragment>
            ))}
          </TinderView>
        </div>

        {/* <button onClick={triggerNext}>test</button> */}
        {/* Left side — dynamic text */}
        <div className={styles.DescView}>
          <div className={styles.descContent}>

            {/* 1. Outgoing Text: Renders with styles.fadeOut during animation */}
            {animating && prevCardIndex !== null && (
              <div
                key={prevCardIndex}
                
                className={`${styles.textBlock} ${styles.fadeOut}`}
              >
                <h1>{prevTitle}</h1>
                <p>{prevSubtitle}</p>
              </div>
            )}

            {/* 2. Incoming Text: Always renders, but applies styles.fadeIn for animation */}

            <div
              key={currentCardIndex}
              className={`${styles.textBlock} ${
                animating ? styles.fadeIn : styles.ready
              }`}
            >
              <h1>{currentTitle}</h1>
              <p>{currentSubtitle}</p>
            </div>

            {/* Removed the unnecessary double <div className={styles.DescView}> wrapper */}
          </div>

          <div className={styles.spacer} />
          <div className={styles.DotContainer}>
            <PageDots
              n_dots={cardKeys.length}
              // min={0}
              direction="horizontal"
              currentPage={currentCardIndex}
              disable={true}
            />
          </div>
        </div>
      </div>
    </CenteredContainer>
  );
};

export default TinderPage;
