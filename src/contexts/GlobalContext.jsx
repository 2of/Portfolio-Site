import React, { createContext, useContext, useState, useEffect } from "react";
import linksdict from "../assets/links.json"
// Create context
const GlobalContext = createContext();

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};

// Provider component
export const GlobalProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [basename, setBasename] = useState(""); // Store basename in state
  const [isBlurPage, setBlurPage] = useState(true);
  const [isMenuOpenforNav, setisMenuOpenforNav] = useState(false);
  const [hopNav, setHopNav] = useState(false);
  const [floatingNavisOnRight, setFloatingNavisOnRight] = useState(true)
  const [disableForPopup, setDisableForPopUp] = useState(false)
  // const [links,setLinks] = useState()
  // Store function and label
  const [navReplacementButtonFunc, setNavReplacementButtonFunc] = useState({
    callback: () => console.log("TEST"), // Initially null
    label: "", // Initially empty
  });

  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  // Update the data-theme attribute on the <body> tag when dark mode is toggled
  useEffect(() => {
    if (isDarkMode) {
      document.body.setAttribute("data-theme", "dark");
    } else {
      document.body.removeAttribute("data-theme");
    }
  }, [isDarkMode]);

  const getLink = (linktitle) => {
    return linksdict[linktitle] || null; // Return the link or null if not found
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
    floatingNavisOnRight, // Add this
    setFloatingNavisOnRight, // If you need to update it elsewhere
    navReplacementButtonFunc,
    setNavReplacementButtonFunc,
    hopNav,
    setHopNav,
    disableForPopup,
    setDisableForPopUp,
    getLink
  }}
>

      {children}
    </GlobalContext.Provider>
  );
};