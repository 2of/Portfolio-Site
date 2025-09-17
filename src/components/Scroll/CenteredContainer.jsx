import React from "react";

export const CenteredContainer = ({ children, style = {}, ...props }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor: "red",
        flexDirection: "column",
        width: "100%",
        height: "100vh", // full viewport height
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};