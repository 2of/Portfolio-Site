import React, { useEffect } from "react";
import { useIsMenuFloatingDesktop } from "../../contexts/RouteContext";
import { useNavStack } from "../../contexts/NavStackContext";
import useScreenSize from "../../utils/screensize";

export const CenteredContainer = ({ children, style = {}, ...props }) => {
  const floatDown = useIsMenuFloatingDesktop();
  const { setNavBgTransparent } = useNavStack();
  const screenSize = useScreenSize();

  useEffect(() => {
    setNavBgTransparent(true);
  }, []);

  const dynamicStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: "100%",
    
    minHeight: "100vh",
    boxSizing: "border-box",
    overflow: "scroll", // ✅ fixed lowercase key
    overflowX: "hidden",
    ...( !floatDown && screenSize !== "sm" &&  {
      paddingTop: "calc(var(--navHeightDESKTOP) + 0px)"
    }),
    ...style,
  };

  return (
    <div style={dynamicStyle} {...props}>
      {children}
    </div>
  );
};
