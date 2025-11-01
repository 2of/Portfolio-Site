import React, { createContext, useContext, useMemo, useCallback } from "react";
import { useDarkMode } from "./DarkModeContext";
import { lightTheme, darkTheme } from "../styles/Themes";

// had to rename this becacuse it conflicted iwth the injector thingie
const AppThemeContext = createContext();

export const AppThemeProvider = ({ children }) => {
  const { darkMode } = useDarkMode();

  const activeTheme = useMemo(
    () => (darkMode ? darkTheme : lightTheme),
    [darkMode],
  );

  const getColor = useCallback(
    (token) => {
      if (!token) return null;

      const value = activeTheme[token];
      if (value) return value;

      console.warn(`[AppThemeContext] Token "${token}" not found in theme`);
      return null;
    },
    [activeTheme],
  );

  const contextValue = useMemo(
    () => ({
      theme: activeTheme,
      getColor,
      darkMode,
    }),
    [activeTheme, getColor, darkMode],
  );

  return (
    <AppThemeContext.Provider value={contextValue}>
      {children}
    </AppThemeContext.Provider>
  );
};

// Hook for consuming theme context
export const useAppTheme = () => {
  const context = useContext(AppThemeContext);
  if (!context) {
    throw new Error(
      "ahhhh useAppTheme AppThemeContext  to be used within an AppThemeProvider",
    );
  }
  return context;
};
