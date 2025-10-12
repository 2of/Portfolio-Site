// RouteContext.js
import React, { createContext, useContext, useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";
import routes from "../routes/routes";

const RouteContext = createContext(null);

export const RouteProvider = ({ children }) => {
  const location = useLocation();

  // Find the first matching route object
  const currentRoute = useMemo(() => {
    return (
      routes.find((route) =>
        matchPath({ path: route.path, end: true }, location.pathname)
      ) || null
    );
  }, [location]);

  const value = useMemo(
    () => ({
      location,
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      currentRoute,
    }),
    [location, currentRoute]
  );

  return (
    <RouteContext.Provider value={value}>{children}</RouteContext.Provider>
  );
};

export const useRoute = () => {
  const ctx = useContext(RouteContext);
  if (!ctx) throw new Error("useRoute must be used inside <RouteProvider>");
  /// yeah so gotta have this ...
  return ctx;
};

 
export const useIsMenuFloatingMobile = () => {
  const { currentRoute } = useRoute();
  return currentRoute?.fullscreenMobile ?? false;
};
export const useIsMenuFloatingDesktop = () => {
  const { currentRoute } = useRoute();
  return currentRoute?.fullscreenDesktop ?? false;
};











export const useIsDesktopPaded = () => {
  const { currentRoute } = useRoute();
  // console.log("Current Route in useIsMenuFloating:", currentRoute);
  return !currentRoute?.fullscreenDesktop ?? false;
};


export const useIsNavHidden = () => {
  const { currentRoute } = useRoute();
  return currentRoute?.hide || false;
};