import React, { useState, useEffect } from "react";
import { CHESS_Board } from "./CHESS_Board";
import { StandardSlider } from "../UI/StandardSlider";
import { StandardButton } from "../UI/StandardButton";


export const CHESS_Container = ({ game }) => {
  const [sliderVal, setSliderVal] = useState(0);
  const [showParticles, setShowParticles] = useState(false);
  const totalMoves = game.totalMoves;

  const controlsDisabled = totalMoves <= 1;

  // Auto-hide particles after a short duration
  useEffect(() => {
    if (showParticles) {
      const timeout = setTimeout(() => setShowParticles(false), 1500);
      return () => clearTimeout(timeout);
    }
  }, [showParticles]);

  return (
    <div
      style={{
        display: "flex",
        gap: "22px",
        flexDirection: "column",
        width: "100%",
        margin: "2rem",
        height: "100%",
        position: "relative", // for overlay positioning
      }}
    >
      <CHESS_Board board={game.getStateAtMove(sliderVal)} />

      <div
        style={{
          display: "flex",
          gap: "8px",
          alignItems: "center",
          justifyContent: "center",
          filter: controlsDisabled ? "blur(2px) grayscale(60%)" : "none",
          transition: "filter 0.3s ease",
          pointerEvents: controlsDisabled ? "none" : "auto",
        }}
      >
        Move:
        <StandardButton
          label="Previous"
          disable={sliderVal <= 0 || controlsDisabled}
          type="subtle"
          callback={() => setSliderVal((v) => v - 1)}
        />
        <StandardSlider
          min={0}
          max={totalMoves}
          value={sliderVal}
          variant="thick"
     
          onChange={setSliderVal}
          disabled={controlsDisabled}
        />
        <StandardButton
          label="Next"
          disable={sliderVal === totalMoves || controlsDisabled}
          type="subtle"
          callback={() => setSliderVal((v) => v + 1)}
        />
      </div>

       
    
    </div>
  );
};