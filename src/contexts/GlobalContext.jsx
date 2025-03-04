import React, { createContext, useContext, useState, useEffect } from "react";

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

  return (
    <GlobalContext.Provider
      value={{
        isDarkMode,
        toggleTheme,
        basename,
        isBlurPage,
        setBlurPage, // Include setBlurPage in the context
        isMenuOpenforNav,
        setisMenuOpenforNav
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};