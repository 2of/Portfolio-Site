import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
// import styles from "./styles/FeatherRevealPattern.module.scss";

const FeatherRevealPattern = ({ bgColor = "#111", svgPattern, radius = 150, transitionDuration = 300 }) => {
  const canvasRef = useRef(null);
  const patternImage = useRef(new Image());
  const pointer = useRef({ x: 0, y: 0 });
  const size = useRef({ width: 0, height: 0 });

  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    // Load the SVG pattern into an <img> for drawing
    patternImage.current.src = svgPattern;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      size.current = { width: canvas.width, height: canvas.height };
    };

    const updateRadius = (dt) => {
      const speed = radius / transitionDuration;
      const diff = targetRadius.current - currentRadius.current;
      if (Math.abs(diff) < 0.5) {
        currentRadius.current = targetRadius.current;
      } else {
        currentRadius.current += diff * (dt * speed / radius);
      }
    };

    const draw = (now) => {
      if (!draw.lastTime) draw.lastTime = now;
      const dt = now - draw.lastTime;
      draw.lastTime = now;

      updateRadius(dt);

      const { width, height } = size.current;
      ctx.clearRect(0, 0, width, height);

      // Background
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, width, height);

      if (currentRadius.current > 1) {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d");

        // Draw SVG pattern on temp canvas (scaled to fit fullscreen)
        tempCtx.drawImage(patternImage.current, 0, 0, width, height);

        // Mask with radial gradient
        const gradient = tempCtx.createRadialGradient(
          pointer.current.x,
          pointer.current.y,
          currentRadius.current * 0.3,
          pointer.current.x,
          pointer.current.y,
          currentRadius.current
        );
        gradient.addColorStop(0, "rgba(0, 0, 0, 1)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        tempCtx.globalCompositeOperation = "destination-in";
        tempCtx.fillStyle = gradient;
        tempCtx.fillRect(0, 0, width, height);

        ctx.drawImage(tempCanvas, 0, 0);
      }

      rafRef.current = requestAnimationFrame(draw);
    };

    const startLoop = () => {
      if (!rafRef.current) rafRef.current = requestAnimationFrame(draw);
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const handleMove = (e) => {
      pointer.current.x = e.clientX;
      pointer.current.y = e.clientY;
    };

    const handleEnter = () => {
      targetRadius.current = radius;
      startLoop();
    };

    const handleLeave = () => {
      targetRadius.current = 0;
    };

    const onPatternLoaded = () => {
      updateSize();
      draw.lastTime = performance.now();
      startLoop();
    };

    patternImage.current.onload = onPatternLoaded;

    window.addEventListener("resize", updateSize);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    updateSize();

    return () => {
      stopLoop();
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [bgColor, svgPattern, radius, transitionDuration]);

  return (
    <canvas
      ref={canvasRef}
    //   className={styles.canvas}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "auto",
      }}
    />
  );
};

FeatherRevealPattern.propTypes = {
  bgColor: PropTypes.string, // background color
  svgPattern: PropTypes.string.isRequired, // path or URL to SVG file
  radius: PropTypes.number,
  transitionDuration: PropTypes.number,
};

export default FeatherRevealPattern;