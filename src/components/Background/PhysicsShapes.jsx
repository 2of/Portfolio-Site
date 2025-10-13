import React, { useRef, useEffect, useState } from "react";
import styles from "./PhysicsShapes.module.scss";
import { useGlobalContext } from "../../contexts/GlobalContext";

const SPEED = 0.2;
const SHAPE_TYPES = ["circle", "star", "triangle", "square"];
const SPAWN_DURATION = 1.5;

function random(min, max) {
  return Math.random() * (max - min) + min;
}
function degToRad(deg) {
  return (deg * Math.PI) / 180;
}

const PhysicsShapes = () => {
  const { isDarkMode, isDev } = useGlobalContext();
  const canvasRef = useRef(null);
  const shapes = useRef([]);

  const [velocityChange, setVelocityChange] = useState(0.2);
  const [dirX, setDirX] = useState(0);
  const [dirY, setDirY] = useState(0);
  const [triggerExplode, setTriggerExplode] = useState(false);
  const [triggerExplodeOnce, setTriggerExplodeOnce] = useState(false);
  const [exploding, setExploding] = useState(false);
  const [numObjects, setNumObjects] = useState(75);
  const [hasExplodedOnce, setHasExplodedOnce] = useState(false);

  const createShape = () => {
    const depth = random(0.3, 1);
    return {
      x: random(0, window.innerWidth),
      y: random(0, window.innerHeight),
      vx: random(-SPEED, SPEED) * depth,
      vy: random(-SPEED, SPEED) * depth,
      size: random(10, 30) * depth,
      rotation: random(0, 360),
      rotSpeed: random(-1, 1) * depth,
      shape: SHAPE_TYPES[Math.floor(Math.random() * SHAPE_TYPES.length)],
      depth,
      color: isDarkMode
        ? `rgba(255,255,255,${0.4 * depth})`
        : `rgba(0,0,0,${0.3 + 0.1 * depth})`,
      alpha: 0.3,
      spawnTime: performance.now() / 1000,
    };
  };

  const resetShapes = () => {
    shapes.current = Array.from({ length: numObjects }, createShape);
    setHasExplodedOnce(false); // Reset the one-time explosion flag when shapes are reset
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);
    resetShapes();

    return () => window.removeEventListener("resize", resize);
  }, [isDarkMode]);

  useEffect(() => {
    resetShapes();
  }, [numObjects]);

  useEffect(() => {
    if (triggerExplode && !exploding) {
      setExploding(true);
      setTriggerExplode(false);
    }
  }, [triggerExplode, exploding]);

  useEffect(() => {
    if (triggerExplodeOnce && !exploding && !hasExplodedOnce) {
      setExploding(true);
      setTriggerExplodeOnce(false);
      setHasExplodedOnce(true);
    }
  }, [triggerExplodeOnce, exploding, hasExplodedOnce]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    let animationFrameId;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const now = performance.now() / 1000;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const maxDistance = Math.sqrt(centerX * centerX + centerY * centerY);

      for (let i = 0; i < shapes.current.length; i++) {
        const a = shapes.current[i];
        for (let j = i + 1; j < shapes.current.length; j++) {
          const b = shapes.current[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const minDist = (a.size + b.size) * 0.5;
          if (dist < minDist && dist > 0) {
            const angle = Math.atan2(dy, dx);
            const overlap = 0.5 * (minDist - dist);
            a.x += Math.cos(angle) * overlap;
            a.y += Math.sin(angle) * overlap;
            b.x -= Math.cos(angle) * overlap;
            b.y -= Math.sin(angle) * overlap;

            const tempVX = a.vx;
            const tempVY = a.vy;
            a.vx = b.vx;
            a.vy = b.vy;
            b.vx = tempVX;
            b.vy = tempVY;
          }
        }
      }

      let allGone = true;

      shapes.current.forEach((s) => {
        const spawnElapsed = now - s.spawnTime;
        const spawnProgress = Math.min(spawnElapsed / SPAWN_DURATION, 1);
        let baseAlpha = !exploding ? spawnProgress : s.alpha;

        const dx = s.x - centerX;
        const dy = s.y - centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const normDist = Math.min(dist / maxDistance, 1);
        let adjustedAlpha = baseAlpha * (Math.pow(normDist, 2) + 0.1) * s.depth;

        if (exploding) {
          s.alpha -= 0.01;
          s.vx += (s.x - centerX) * 0.001;
          s.vy += (s.y - centerY) * 0.001;
          if (s.alpha > 0) allGone = false;
        } else {
          s.alpha = adjustedAlpha;
        }

        s.vx += dirX * velocityChange * 0.01;
        s.vy += dirY * velocityChange * 0.01;

        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.rotSpeed;

        if (s.x < 0 || s.x > canvas.width) s.vx *= -1;
        if (s.y < 0 || s.y > canvas.height) s.vy *= -1;

        const wiggleX = Math.sin(now * 2 + s.x * 0.01) * 5 * s.depth;
        const wiggleY = Math.cos(now * 2 + s.y * 0.01) * 5 * s.depth;

        const scale = exploding ? 1 : spawnProgress;

        ctx.save();
        ctx.translate(s.x + wiggleX, s.y + wiggleY);
        ctx.rotate(degToRad(s.rotation));
        ctx.globalAlpha = Math.max(s.alpha, 0);
        ctx.scale(scale, scale);
        ctx.fillStyle = s.color.replace(
          /[\d\.]+\)$/g,
          `${Math.max(s.alpha, 0)})`,
        );

        switch (s.shape) {
          case "circle":
            ctx.beginPath();
            ctx.arc(0, 0, s.size / 2, 0, Math.PI * 2);
            ctx.fill();
            break;
          case "star":
            const spikes = 5;
            const outerRadius = s.size / 2;
            const innerRadius = outerRadius / 2;
            let rot = 0;
            const step = Math.PI / spikes;
            ctx.beginPath();
            ctx.moveTo(
              Math.cos(rot) * outerRadius,
              Math.sin(rot) * outerRadius,
            );
            for (let i = 0; i < spikes; i++) {
              rot += step;
              ctx.lineTo(
                Math.cos(rot) * innerRadius,
                Math.sin(rot) * innerRadius,
              );
              rot += step;
              ctx.lineTo(
                Math.cos(rot) * outerRadius,
                Math.sin(rot) * outerRadius,
              );
            }
            ctx.closePath();
            ctx.fill();
            break;
          case "triangle":
            ctx.beginPath();
            for (let i = 0; i < 3; i++) {
              const angle = degToRad(i * 120);
              const px = (s.size / 2) * Math.cos(angle);
              const py = (s.size / 2) * Math.sin(angle);
              if (i === 0) ctx.moveTo(px, py);
              else ctx.lineTo(px, py);
            }
            ctx.closePath();
            ctx.fill();
            break;
          case "square":
            ctx.fillRect(-s.size / 2, -s.size / 2, s.size, s.size);
            break;
        }

        ctx.restore();
      });

      if (exploding && allGone && !hasExplodedOnce) {
        setExploding(false);
        resetShapes();
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(animationFrameId);
  }, [velocityChange, dirX, dirY, exploding, isDarkMode, hasExplodedOnce]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className={`${styles.canvas} ${isDarkMode ? styles.dark : styles.light}`}
      />
      {isDev && (
        <div className={styles.menuOverlay}>
          <h3>Background Controls</h3>

          <label>
            Velocity Change: {velocityChange.toFixed(2)}
            <input
              type="range"
              min="0"
              max="2"
              step="0.01"
              value={velocityChange}
              onChange={(e) => setVelocityChange(parseFloat(e.target.value))}
            />
          </label>

          <label>
            Direction X: {dirX.toFixed(2)}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={dirX}
              onChange={(e) => setDirX(parseFloat(e.target.value))}
            />
          </label>

          <label>
            Direction Y: {dirY.toFixed(2)}
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={dirY}
              onChange={(e) => setDirY(parseFloat(e.target.value))}
            />
          </label>

          <label>
            Number of Objects: {numObjects}
            <input
              type="range"
              min="10"
              max="200"
              step="1"
              value={numObjects}
              onChange={(e) => setNumObjects(parseInt(e.target.value))}
            />
          </label>

          <div className={styles.buttonGroup}>
            <button onClick={() => setTriggerExplode(true)}>
              Explode & Respawn
            </button>
            <button
              onClick={() => setTriggerExplodeOnce(true)}
              disabled={hasExplodedOnce}
            >
              {hasExplodedOnce ? "Already Exploded" : "Explode Once"}
            </button>
            <button onClick={resetShapes}>Reset Shapes</button>
          </div>
        </div>
      )}
    </>
  );
};

export default PhysicsShapes;
