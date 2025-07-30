// contexts/ScreenSizeContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const ScreenSizeContext = createContext('lg');

const getScreenSize = () => {
  const width = window.innerWidth;
  if (width < 768) return 'sm';
  if (width >= 768 && width < 1024) return 'md';
  return 'lg';
};

export const ScreenSizeProvider = ({ children }) => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <ScreenSizeContext.Provider value={screenSize}>
      {children}
    </ScreenSizeContext.Provider>
  );
};

export const useScreenSize = () => useContext(ScreenSizeContext);