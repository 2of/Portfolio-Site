import React, { createContext, useContext, useState, useCallback } from "react";

const NavStackContext = createContext();

export const useNavStack = () => useContext(NavStackContext);

export const NavStackProvider = ({ children }) => {
  const [navstack, setNavstack] = useState([]);
  const [extraButtons, setExtraButtons] = useState([]);

  // --- navstack functions ---
  const pushNav = useCallback((navObj) => {
    setNavstack((prev) => [...prev, navObj]);
  }, []);

  const popNav = useCallback(() => {
    setNavstack((prev) => prev.slice(0, -1));
  }, []);

  const removeNav = useCallback(({ id }) => {
    setNavstack((prev) => prev.filter((nav) => nav.id !== id));
  }, []);

  // --- extraButtons functions ---
  const addButton = useCallback((buttonObj) => {
    setExtraButtons((prev) => [...prev, buttonObj]);
  }, []);

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
        removeNav,
        extraButtons,
        addButton,
        removeButton,
        clearButtons,
      }}
    >
      {children}
    </NavStackContext.Provider>
  );
};