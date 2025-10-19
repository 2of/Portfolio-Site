import React, { useEffect } from "react";
import {  useIsMenuFloatingDesktop } from "../../contexts/RouteContext";
import { useNavStack } from "../../contexts/NavStackContext";

export const CenteredContainer = ({ children, style = {}, ...props }) => {
  const floatDown = useIsMenuFloatingDesktop();
  const {setNavBgTransparent,shouldNavBgBeTransparent } = useNavStack();

  useEffect(() => {

    setNavBgTransparent(true)
  }, [])
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