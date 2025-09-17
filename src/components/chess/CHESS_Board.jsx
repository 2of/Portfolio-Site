import React from "react";

export const CHESS_Board = () => {
  const rows = 8;
  const cols = 8;

  const squares = [];
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isDark = (r + c) % 2 === 1;
      squares.push(
        <div
          key={`${r}-${c}`}
          style={{
            // Use a semi-transparent, dark blue/gray for a techy feel
            backgroundColor: isDark ? "rgba(23, 23, 23, 0.8)" : "rgba(50, 50, 50, 0.8)",
            aspectRatio: "1 / 1",
            width: "100%",
            height: "100%",
            // A subtle glow on the squares themselves
            boxShadow: isDark
              ? "inset 0 0 5px rgba(0, 255, 255, 0.2)"
              : "inset 0 0 5px rgba(255, 255, 255, 0.1)",
          }}
        />
      );
    }
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "600px",
        aspectRatio: "1 / 1",
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        // Replace the border with a glowing, vibrant frame
        border: "1px solid #00ffff",
        boxShadow:
          "0 0 15px rgba(0, 255, 255, 0.8), 0 0 30px rgba(0, 255, 255, 0.4)",
        backgroundColor: "rgba(0, 0, 0, 0.6)", // A base dark color
        position: "relative", // Needed for the pseudo-element glow
        overflow: "hidden", // Prevents inner shadows from overflowing
      }}
    >
      {/* Optional: Add a more intense inner glow with a pseudo-element
      or just use a styled div to get this effect */}
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          boxShadow: "inset 0 0 20px #00ffff, inset 0 0 40px #00ffff",
          opacity: 0.1,
        }}
      />
      {squares}
    </div>
  );
};