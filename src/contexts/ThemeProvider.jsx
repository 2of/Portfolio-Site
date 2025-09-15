import React, { useEffect } from "react";

export function ThemeProvider({ theme, children }) {
  useEffect(() => {
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  }, [theme]);

  return <>{children}</>;
}




