import React from "react";
import {  useIsMenuFloatingDesktop } from "../../contexts/RouteContext";

export const CenteredContainer = ({ children, style = {}, ...props }) => {
  const floatDown = useIsMenuFloatingDesktop();

  const dynamicStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    minHeight: "100vh",
    boxSizing: "border-box",
    Overflow: "scroll",
    ...(!floatDown
  && { paddingTop: "calc(var(--navHeightDESKTOP) + 0px)" }),
    ...style,
  };

  return (
    <div style={dynamicStyle} {...props}>
      {children}
    </div>
  );
};