import React, { createContext, useContext, useState, useEffect } from "react";
import linksdict from "../assets/links.json";

// Create context
const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

// Provider component
export const GlobalProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [basename, setBasename] = useState("");
  const [isBlurPage, setBlurPage] = useState(true);
  const [isMenuOpenforNav, setisMenuOpenforNav] = useState(false);
  const [hopNav, setHopNav] = useState(false);
  const [floatingNavisOnRight, setFloatingNavisOnRight] = useState(true);

  const [disableForPopup, setDisableForPopupState] = useState(false);
  const [disablePopupClickOffCallback, setDisablePopupClickOffCallback] = useState(null);

  // Stack-based navigation replacement buttons
  const [navReplacementButtonStack, setNavReplacementButtonStack] = useState([]);

  const pushNavReplacementButton = (button) => {
    setNavReplacementButtonStack((prevStack) => [...prevStack, button]);
  };

  const popNavReplacementButton = () => {
    setNavReplacementButtonStack((prevStack) => prevStack.slice(0, -1));
  };

  const getCurrentNavReplacementButton = () => {
    return navReplacementButtonStack.length > 0
      ? navReplacementButtonStack[navReplacementButtonStack.length - 1]
      : { label: "", callback: null };
  };

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  const getLink = (linktitle) => {
    return linksdict[linktitle] || null;
  };

  // Toggle disableForPopup
  const toggleDisableForPopUp = () => {
    setDisableForPopupState((prev) => !prev);
  };

  // Set popup disable with optional callback
  const setDisableForPopupEnhanced = (isDisabled, clickOffCallback = null) => {
    setDisableForPopupState(isDisabled);
    if (clickOffCallback) {
      setDisablePopupClickOffCallback(() => clickOffCallback);
    } else {
      setDisablePopupClickOffCallback(null);
    }
  };

  // Clear the click-off callback
  const clearDisablePopupClickOffCallback = () => {
    setDisablePopupClickOffCallback(null);
  };

  // Execute the click-off callback if it exists and reset disable flag
  const handlePopupClickOff = () => {
    if (disablePopupClickOffCallback) {
      disablePopupClickOffCallback();
      setDisablePopupClickOffCallback(null);
      setDisableForPopupState(false);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        basename,
        isBlurPage,
        setBlurPage,
        isMenuOpenforNav,
        setisMenuOpenforNav,
        floatingNavisOnRight,
        setFloatingNavisOnRight,
        navReplacementButtonStack,
        pushNavReplacementButton,
        popNavReplacementButton,
        getCurrentNavReplacementButton,
        hopNav,
        setHopNav,
        disableForPopup,
        setDisableForPopUp: setDisableForPopupState,
        toggleDisableForPopUp,
        setDisableForPopupEnhanced,
        disablePopupClickOffCallback,
        clearDisablePopupClickOffCallback,
        handlePopupClickOff,
        getLink,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};