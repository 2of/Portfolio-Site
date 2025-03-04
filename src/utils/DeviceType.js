import { useState, useEffect } from "react";

const useDeviceType = () => {
  const [deviceType, setDeviceType] = useState(() => {
    if (typeof window === "undefined") return "desktop"; // Default to desktop in SSR
    const isHoverable = window.matchMedia("(hover: hover)").matches;
    const isCoarse = window.matchMedia("(pointer: coarse)").matches;

    if (isHoverable) return "desktop";
    if (isCoarse) return "mobile";
    return "unknown";
  });

  useEffect(() => {
    const hoverQuery = window.matchMedia("(hover: hover)");
    const coarsePointerQuery = window.matchMedia("(pointer: coarse)");

    const updateDeviceType = () => {
      if (hoverQuery.matches) {
        setDeviceType("desktop");
      } else if (coarsePointerQuery.matches) {
        setDeviceType("mobile");
      } else {
        setDeviceType("unknown");
      }
    };

    updateDeviceType();
    hoverQuery.addEventListener("change", updateDeviceType);
    coarsePointerQuery.addEventListener("change", updateDeviceType);

    return () => {
      hoverQuery.removeEventListener("change", updateDeviceType);
      coarsePointerQuery.removeEventListener("change", updateDeviceType);
    };
  }, []);

  return deviceType;
};

export default useDeviceType;