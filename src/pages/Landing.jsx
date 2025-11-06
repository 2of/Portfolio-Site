import React, { useState, useEffect, useRef } from "react";
import TinderView from "../components/Containers/TinderView";
import styles from "./styles/LandingPage.module.scss";
import { CenteredContainer } from "../components/Containers/Scroll/CenteredContainer";
import { ShowcasecardStack } from "../assets/TextAssets/TinderStackCards";
import useScreenSize from "../utils/screensize";
import { StandardSlider } from "../components/UI/StandardLib/StandardSlider.jsx";
import PageDots from "../components/UI/StandardLib/PageDots.jsx";
import { useNavStack } from "../contexts/NavStackContext";
import getIcon from "../utils/Iconifier";
import TrackedGradientBG from "../components/Background/TrackedGradientBg";
import ResponsiveGradient from "../components/Background/ResponsiveGradient";
import { QuickLinksThing } from "../components/Misc/QuickLinksThing";

export const LandingPage = () => {
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

  if (screenSize === "sm") {
    return (
      <div className={styles.mobilecontainer}>
        {/* <h1>test</h1> */}
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
    );
  } else {
    return (
      <CenteredContainer>
        {/* <div style={styles.quicklinkscontainer}>
        <QuickLinksThing/>

        </div> */}

        <div className={styles.sidebyside}>
          <div className={styles.content}>
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

          <div className={styles.explainer}>
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
            <PageDots
              n_dots={cardKeys.length}
              // min={0}
              //   direction="horizontal"
              currentPage={currentCardIndex}
              disable={true}
            />
          </div>
        </div>
      </CenteredContainer>
    );
  }
};
