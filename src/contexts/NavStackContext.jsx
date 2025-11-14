import React, { createContext, useContext, useState, useCallback } from "react";

const NavStackContext = createContext();

export const useNavStack = () => useContext(NavStackContext);

export const NavStackProvider = ({ children }) => {
  const [navstack, setNavstack] = useState([]);

const [shouldHideNavBgDesktop, setShouldHideNavBgDesktop] = useState(false);

  const [extraButtons, setExtraButtons] = useState([]);


const shouldNavBgBeTransparent = () => {
  return shouldHideNavBgDesktop;
};

const setNavBgTransparent = (value) => {
  setShouldHideNavBgDesktop(value);
};




  // --- navbg funcs



  // --- navstack functions ---
  const pushNav = useCallback((navObj) => {
    setNavstack((prev) => [...prev, navObj]);
  }, []);
  const clearStack = useCallback(() => { 
    setNavstack([])
  })
  const popNav = useCallback(() => {
    setNavstack((prev) => prev.slice(0, -1));
  }, []);

  const removeNav = useCallback(({ id }) => {
    setNavstack((prev) => prev.filter((nav) => nav.id !== id));
  }, []);

  // --- extraButtons functions ---
const addButton = useCallback(

  (buttonObj) => {
    setExtraButtons((prev) => {
      if (prev.some((btn) => btn.id === buttonObj.id)) {
          console.log("ADDED A BUTTON", buttonObj);

        return prev;
      }
      return [...prev, buttonObj];
    });
  },
  [] // no deps — safe because we’re using functional setState
);

const extraButtonsContains = useCallback(
  (id) => extraButtons?.some((btn) => btn.id === id) ?? false,
  [extraButtons]
);
  const removeButton = useCallback(({ id }) => {
    setExtraButtons((prev) => prev.filter((btn) => btn.id !== id));
  }, []);

  const clearButtons = useCallback(() => {
    setExtraButtons([]);
  }, []);

  return (
    <NavStackContext.Provider
      value={{
        navstack,
        pushNav,
        popNav,
        clearStack,
        
        removeNav,
        extraButtons,
        addButton,
        removeButton,
        clearButtons,
        extraButtonsContains,
        shouldNavBgBeTransparent,
        setNavBgTransparent
      }}
    >
      {children}
    </NavStackContext.Provider>
  );
};