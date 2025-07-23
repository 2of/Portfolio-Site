import React, { createContext, useContext, useState } from "react";

const AlertMenuContext = createContext();

export const useAlertMenu = () => useContext(AlertMenuContext);

export const AlertMenuProvider = ({ children }) => {
  const [alertState, setAlertState] = useState({
    open: false,
    type: "info",
    message: "",
    title: "",
    buttons: [],
    customContent: null,
    shareData: null,
  });

  const showAlert = (options = {}) => {
    setAlertState({
      open: true,
      type: options.type || "info",
      title: options.title || "",
      message: options.message || "",
      buttons: options.buttons || [],
      customContent: options.customContent || null,
      shareData: options.shareData || null,
    });
  };

  const hideAlert = () => {
    setAlertState(prev => ({
      ...prev,
      open: false,
      type: "info",
      message: "",
      title: "",
      buttons: [],
      customContent: null,
      shareData: null,
    }));
  };


  const alertVisible = alertState.open;

  return (
    <AlertMenuContext.Provider value={{ 
      alertState, 
      showAlert, 
      hideAlert,
      alertVisible 
    }}>
      {children}
    </AlertMenuContext.Provider>
  );
};
