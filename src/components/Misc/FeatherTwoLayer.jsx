import React, { useRef, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import styles from "./styles/FeatherTwoLayer.module.scss";
import { useTheme } from "../../contexts/ThemeProvider";


const FeatherTwoLayer = ({
  radius = 300,
  transitionDuration = 300,
  alwaysListen = false,
  isbg = false
}) => {
  const canvasRef = useRef(null);

  // 🎨 Theme variables
  const bg = useTheme("--bg");
  const textColor = useTheme("--bg-l1");
  const borderColor = useTheme("--border-color");

  // Base layer style = background color
  const baseLayerStyle = {
    backgroundColor: bg,
  };

  // Dot properties pulled from theme
  const DOT_PROPERTIES = {
    color: textColor || "#d6d6d6ff", // fallback if unset
    size: 1.2,
    spacing: 12,
  };

  const pointer = useRef({ x: 0, y: 0 });
  const size = useRef({ width: 0, height: 0 });
  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const rafRef = useRef(null);
  const patternCache = useRef(null);

  // Generate repeating dot pattern
  const getPattern = useCallback(
    (ctx, width, height) => {
      if (patternCache.current) {
        return patternCache.current;
      }

      const patternCanvas = document.createElement("canvas");
      patternCanvas.width = DOT_PROPERTIES.spacing;
      patternCanvas.height = DOT_PROPERTIES.spacing;

      const patternCtx = patternCanvas.getContext("2d");
      patternCtx.fillStyle = DOT_PROPERTIES.color;
      patternCtx.beginPath();
      patternCtx.arc(
        DOT_PROPERTIES.spacing / 2,
        DOT_PROPERTIES.spacing / 2,
        DOT_PROPERTIES.size,
        0,
        Math.PI * 2
      );
      patternCtx.fill();

      const pattern = ctx.createPattern(patternCanvas, "repeat");
      patternCache.current = pattern;
      return pattern;
    },
    [DOT_PROPERTIES]
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      size.current = { width: rect.width, height: rect.height };
      patternCache.current = null; // clear cache on resize
    };

    const updateRadius = (dt) => {
      const speed = radius / transitionDuration;
      const diff = targetRadius.current - currentRadius.current;

      if (Math.abs(diff) < 0.5) {
        currentRadius.current = targetRadius.current;
      } else {
        currentRadius.current += diff * Math.min(1, (dt * speed) / radius);
      }
    };

    const draw = (now) => {
      if (!draw.lastTime) draw.lastTime = now;
      const dt = now - draw.lastTime;
      draw.lastTime = now;

      updateRadius(dt);

      const { width, height } = size.current;
      ctx.clearRect(0, 0, width, height);

      // 1. Draw dotted cover layer
      ctx.globalCompositeOperation = "source-over";
      const pattern = getPattern(ctx, width, height);
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, width, height);

      // 2. Apply radial mask
      if (currentRadius.current > 1) {
        const gradient = ctx.createRadialGradient(
          pointer.current.x,
          pointer.current.y,
          currentRadius.current * 0.3,
          pointer.current.x,
          pointer.current.y,
          currentRadius.current
        );

        gradient.addColorStop(0, "rgba(255, 255, 255, 1)");
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)");

        ctx.globalCompositeOperation = "destination-in";
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
      } else if (currentRadius.current < 1 && currentRadius.current > 0) {
        // let animation fade out
      } else {
        ctx.clearRect(0, 0, width, height);
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
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
      if (alwaysListen) startLoop();
    };

    const handleEnter = () => {
      targetRadius.current = radius;
      startLoop();
    };

    const handleLeave = () => {
      if (!alwaysListen) targetRadius.current = 0;
    };

    updateSize();
    draw.lastTime = performance.now();
    startLoop();

    window.addEventListener("resize", updateSize);

    if (alwaysListen) {
      window.addEventListener("mousemove", handleMove);
      handleEnter();
    } else {
      canvas.addEventListener("mousemove", handleMove);
      canvas.addEventListener("mouseenter", handleEnter);
      canvas.addEventListener("mouseleave", handleLeave);
    }

    return () => {
      stopLoop();
      window.removeEventListener("resize", updateSize);
      if (alwaysListen) {
        window.removeEventListener("mousemove", handleMove);
      } else {
        canvas.removeEventListener("mousemove", handleMove);
        canvas.removeEventListener("mouseenter", handleEnter);
        canvas.removeEventListener("mouseleave", handleLeave);
      }
    };
  }, [radius, transitionDuration, alwaysListen, getPattern]);

  return (
    <div className={`${styles.container} ${isbg && styles.fullscreen}`}>
      {/* Base Layer: theme background */}
      <div className={styles.baseLayer} style={baseLayerStyle} />
      {/* Cover Layer: dotted canvas */}
      <canvas ref={canvasRef} className={styles.coverLayer} />
    </div>
  );
};

FeatherTwoLayer.propTypes = {
  radius: PropTypes.number,
  transitionDuration: PropTypes.number,
  alwaysListen: PropTypes.bool,
};

export default FeatherTwoLayer;