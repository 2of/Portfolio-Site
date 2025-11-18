import React, { useRef, useEffect, useMemo, useCallback } from "react";
import { useDarkMode } from "../../contexts/DarkModeContext";
import { useAppTheme } from "../../contexts/ThemeContext.jsx";

const ParticleBackground = ({
  particleCount = 35,
  maxDistance = 120,
  speed = 0.5,
}) => {
  const canvasRef = useRef(null);
  const animationFrameRef = useRef(null);
  const particlesRef = useRef([]);
  const widthRef = useRef(window.innerWidth);
  const heightRef = useRef(window.innerHeight);
  const resizeTimeoutRef = useRef(null);
  const { darkMode } = useDarkMode();
  const { getColor } = useAppTheme();

  // Get theme colors
  const themeColors = useMemo(() => {
    if (darkMode) {
      return {
        bg: getColor("--bg") || "#080B10",
        accent: getColor("--accent") || "#4AA3FF",
        link: getColor("--link") || "#5CB5FF",
        guide: getColor("--guide-color") || "#455268",
        particleColors: [
          getColor("--accent") || "#4AA3FF",
          getColor("--link") || "#5CB5FF",
          "#6BC5FF",
          "#7DD0FF",
          getColor("--guide-color") || "#455268",
        ],
      };
    } else {
      return {
        bg: getColor("--bg") || "#F8FAFC",
        accent: getColor("--accent") || "#2E7FC8",
        link: getColor("--link") || "#1E6BA8",
        guide: getColor("--guide-color") || "#9FC4E0",
        particleColors: [
          getColor("--accent") || "#2E7FC8",
          getColor("--link") || "#1E6BA8",
          "#3D8FD9",
          "#5A9BC7",
          getColor("--guide-color") || "#9FC4E0",
        ],
      };
    }
  }, [darkMode, getColor]);

  // Initialize particles
  const initializeParticles = useCallback(
    (width, height, colors) => {
      const particles = [];
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          vx: (Math.random() - 0.5) * 2 * speed,
          vy: (Math.random() - 0.5) * 2 * speed,
          radius: Math.random() * 1.5 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: Math.random() * 0.4 + 0.6,
          alphaDir: (Math.random() > 0.5 ? 1 : -1) * (0.008 + Math.random() * 0.004),
          baseAlpha: Math.random() * 0.3 + 0.5,
        });
      }
      particlesRef.current = particles;
    },
    [particleCount, speed],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: false, desynchronized: true });
    if (!ctx) return;

    // Initialize dimensions
    widthRef.current = window.innerWidth;
    heightRef.current = window.innerHeight;
    canvas.width = widthRef.current;
    canvas.height = heightRef.current;

    // Initialize particles
    initializeParticles(widthRef.current, heightRef.current, themeColors.particleColors);

    // Pre-calculate connection stroke styles
    const connectionColor = darkMode
      ? "rgba(74, 163, 255, 0.3)"
      : "rgba(46, 127, 200, 0.25)";

    // Spatial grid for O(n) connection checking instead of O(n²)
    const gridCellSize = maxDistance;
    const grid = new Map();

    const getGridKey = (x, y) => {
      const cellX = Math.floor(x / gridCellSize);
      const cellY = Math.floor(y / gridCellSize);
      return `${cellX},${cellY}`;
    };

    const addToGrid = (particle, index) => {
      const key = getGridKey(particle.x, particle.y);
      if (!grid.has(key)) {
        grid.set(key, []);
      }
      grid.get(key).push(index);
    };

    // Optimized distance calculation (avoid sqrt when possible)
    const getDistanceSq = (p1, p2) => {
      const dx = p1.x - p2.x;
      const dy = p1.y - p2.y;
      return dx * dx + dy * dy;
    };

    const maxDistanceSq = maxDistance * maxDistance;

    // Cache for connection opacity calculations
    const opacityCache = new Map();
    const getOpacity = (dist) => {
      const key = Math.floor(dist);
      if (!opacityCache.has(key)) {
        opacityCache.set(key, 1 - dist / maxDistance);
      }
      return opacityCache.get(key);
    };

    const animate = () => {
      // Use refs to get current dimensions (safe during resize)
      const width = widthRef.current;
      const height = heightRef.current;

      // Ensure canvas dimensions match
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      // Clear canvas with background (single operation)
      ctx.fillStyle = themeColors.bg;
      ctx.fillRect(0, 0, width, height);

      const particles = particlesRef.current;

      // Update particles first
      particles.forEach((p) => {
        // Update position
        p.x += p.vx;
        p.y += p.vy;

        // Wrap around edges for smoother experience
        if (p.x < 0) p.x = width;
        if (p.x > width) p.x = 0;
        if (p.y < 0) p.y = height;
        if (p.y > height) p.y = 0;

        // Smooth twinkle effect
        p.alpha += p.alphaDir;
        if (p.alpha <= p.baseAlpha || p.alpha >= 1) {
          p.alphaDir *= -1;
          p.alpha = Math.max(p.baseAlpha, Math.min(1, p.alpha));
        }
      });

      // Build spatial grid
      grid.clear();
      particles.forEach((p, i) => addToGrid(p, i));

      // Draw connections using spatial grid (much faster than O(n²))
      // Batch connections by opacity for better performance
      ctx.lineWidth = 1.5;
      const connections = [];
      const checkedPairs = new Set(); // Prevent duplicate checks

      particles.forEach((p1, i) => {
        const cellX = Math.floor(p1.x / gridCellSize);
        const cellY = Math.floor(p1.y / gridCellSize);

        // Check current cell and adjacent cells (3x3 grid)
        for (let dx = -1; dx <= 1; dx++) {
          for (let dy = -1; dy <= 1; dy++) {
            const key = `${cellX + dx},${cellY + dy}`;
            const cellParticles = grid.get(key);
            if (!cellParticles) continue;

            cellParticles.forEach((j) => {
              if (i >= j) return; // Skip same or already processed

              const pairKey = `${i}-${j}`;
              if (checkedPairs.has(pairKey)) return;
              checkedPairs.add(pairKey);

              const p2 = particles[j];
              const distSq = getDistanceSq(p1, p2);

              if (distSq < maxDistanceSq) {
                const dist = Math.sqrt(distSq);
                const opacity = getOpacity(dist);
                connections.push({
                  x1: p1.x,
                  y1: p1.y,
                  x2: p2.x,
                  y2: p2.y,
                  opacity,
                });
              }
            });
          }
        }
      });

      // Draw all connections grouped by opacity (reduces state changes)
      if (connections.length > 0) {
        ctx.strokeStyle = connectionColor;
        // Group by rounded opacity to reduce state changes
        const opacityGroups = new Map();
        connections.forEach((conn) => {
          const opacityKey = Math.floor(conn.opacity * 10) / 10; // Round to 0.1
          if (!opacityGroups.has(opacityKey)) {
            opacityGroups.set(opacityKey, []);
          }
          opacityGroups.get(opacityKey).push(conn);
        });

        // Draw each opacity group
        opacityGroups.forEach((group, opacity) => {
          ctx.globalAlpha = opacity;
          ctx.beginPath();
          group.forEach((conn) => {
            ctx.moveTo(conn.x1, conn.y1);
            ctx.lineTo(conn.x2, conn.y2);
          });
          ctx.stroke();
        });
      }

      // Reset globalAlpha before drawing particles
      ctx.globalAlpha = 1;

      // Batch draw particles (no shadow blur for performance)
      particles.forEach((p) => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.fill();
      });

      // Reset globalAlpha
      ctx.globalAlpha = 1;

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      // Clear any pending resize timeout
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }

      // Debounce resize to avoid excessive updates
      resizeTimeoutRef.current = setTimeout(() => {
        const newWidth = window.innerWidth;
        const newHeight = window.innerHeight;

        // Only update if dimensions actually changed
        if (newWidth === widthRef.current && newHeight === heightRef.current) {
          return;
        }

        const oldWidth = widthRef.current;
        const oldHeight = heightRef.current;

        // Update dimension refs
        widthRef.current = newWidth;
        heightRef.current = newHeight;

        // Update canvas dimensions
        canvas.width = newWidth;
        canvas.height = newHeight;

        // Adjust existing particles proportionally to maintain their relative positions
        const particles = particlesRef.current;
        const scaleX = newWidth / oldWidth;
        const scaleY = newHeight / oldHeight;

        particles.forEach((p) => {
          // Scale position proportionally
          p.x = p.x * scaleX;
          p.y = p.y * scaleY;

          // Ensure particles stay within bounds
          if (p.x < 0) p.x = 0;
          if (p.x > newWidth) p.x = newWidth;
          if (p.y < 0) p.y = 0;
          if (p.y > newHeight) p.y = newHeight;
        });
      }, 100); // 100ms debounce
    };

    window.addEventListener("resize", handleResize, { passive: true });

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
      window.removeEventListener("resize", handleResize);
    };
  }, [themeColors, maxDistance, darkMode, initializeParticles]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: themeColors.bg,
        pointerEvents: "none",
      }}
    />
  );
};

export default ParticleBackground;
