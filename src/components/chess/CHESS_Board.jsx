import React from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";

// Map letters to Unicode chess symbols
const pieceSymbols = {
  P: "♙",
  R: "♖",
  N: "♘",
  B: "♗",
  Q: "♕",
  K: "♔",
  p: "♟",
  r: "♜",
  n: "♞",
  b: "♝",
  q: "♛",
  k: "♚",
};

export const CHESS_Board = ({ board }) => {
  const { darkMode } = useDarkMode();
  const rows = 8;
  const cols = 8;
  const squares = [];

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const isDarkSquare = (r + c) % 2 === 1;
      const piece = board[r][c];

      // Square colors based on dark mode
      const darkColor = darkMode ? "rgba(23, 23, 23, 0.8)" : "rgba(53, 92, 31, 0.8)";
      const lightColor = darkMode ? "rgba(50, 50, 50, 0.8)" : "rgba(208, 207, 207, 0.8)";

      squares.push(
        <div
          key={`${r}-${c}`}
          style={{
            backgroundColor: isDarkSquare ? darkColor : lightColor,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "3rem",
            color: piece && piece === piece.toUpperCase() ? (darkMode ? "#fff" : "#000") : (darkMode ? "rgba(221, 197, 61, 1)" : "#000"),
            aspectRatio: "1 / 1",
            width: "100%",
            height: "100%",
            boxShadow: isDarkSquare
              ? "inset 0 0 5px rgba(24, 27, 27, 0.2)"
              : "inset 0 0 5px rgba(0,0,0,0.1)",
          }}
        >
          {piece ? pieceSymbols[piece] : ""}
        </div>
      );
    }
  }

  return (
    <div
      style={{
        // width: "100%",
        margin: "1rem",
        // maxWidth: "600px",
        aspectRatio: "1 / 1",
        display: "grid",
        gridTemplateColumns: "repeat(8, 1fr)",
        gridTemplateRows: "repeat(8, 1fr)",
        border: darkMode ? "1px solid rgba(0, 255, 255, 0.3)" : "1px solid rgba(0,0,0,0.2)",
        boxShadow: darkMode
          ? "0 0 15px rgba(42, 91, 91, 0.8), 0 0 30px rgba(0, 255, 255, 0.4)"
          : "0 0 10px rgba(0,0,0,0.3), 0 0 20px rgba(100,100,100,0.2)",
        backgroundColor: darkMode ? "rgba(0, 0, 0, 0.6)" : "rgba(240,240,240,0.6)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          pointerEvents: "none",
          boxShadow: darkMode
            ? "inset 0 0 20px rgba(148, 203, 219, 0.6), inset 0 0 40px #4e6666ff"
            : "inset 0 0 10px rgba(0,0,0,0.1), inset 0 0 20px rgba(200,200,200,0.2)",
          opacity: 0.1,
        }}
      />
      {squares}
    </div>
  );
};