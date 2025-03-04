import { useState, useEffect } from 'react';

const useScreenSize = () => {
  const [screenSize, setScreenSize] = useState(getScreenSize());

  function getScreenSize() {
    const width = window.innerWidth;
    if (width < 768) return 'sm';
    if (width >= 768 && width < 1024) return 'md';
    return 'lg';
  }

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(getScreenSize());
    };

    // Listen for window resize events
    window.addEventListener('resize', handleResize);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return screenSize;
};

export default useScreenSize;
