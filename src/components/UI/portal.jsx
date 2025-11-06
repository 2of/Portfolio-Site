
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const Portal = ({ children }) => {
  const [portalElement, setPortalElement] = useState(null);

  useEffect(() => {
    // Create a new div for the portal
    const element = document.createElement("div");
    document.body.appendChild(element);
    setPortalElement(element);

    // Cleanup on unmount
    return () => {
      document.body.removeChild(element);
    };
  }, []);

  if (!portalElement) return null;

  return createPortal(children, portalElement);
};

export default Portal;