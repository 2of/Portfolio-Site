import React, { useEffect, useState } from "react";

export function ThemeProvider({ theme, children }) {
  useEffect(() => {
    for (const key in theme) {
      document.documentElement.style.setProperty(key, theme[key]);
    }
  }, [theme]);

  return <>{children}</>;
}

export function useTheme(varName) {
  const [value, setValue] = useState(
    getComputedStyle(document.documentElement).getPropertyValue(varName).trim(),
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      const newValue = getComputedStyle(document.documentElement)
        .getPropertyValue(varName)
        .trim();
      setValue(newValue);
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["style"],
    });

    return () => observer.disconnect();
  }, [varName]);

  return value;
}
