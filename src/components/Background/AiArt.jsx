import React, { useEffect, useRef } from "react";
import styles from "./AiArt.module.scss";

const AiArt = ({ interactive = false }) => {
  const canvasRef = useRef(null);
  const gradientRef = useRef(null);
  const animationRef = useRef(null);
  const particles = useRef([]);
   const palette = [
      "#FF9EE2", // pink
      "#FFD980", // gold
      "#A6FFB5", // mint
      "#92D7FF", // sky blue
      "#D0B3FF", // lilac
    ];
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      generateParticles();
    };
    resize();
    window.addEventListener("resize", resize);

 

    function randomColor() {
      return palette[Math.floor(Math.random() * palette.length)];
    }

    function generateParticles() {
      const count = 80;
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 2 + 0.8,
        dx: (Math.random() - 0.5) * 0.3,
        dy: (Math.random() - 0.5) * 0.3,
        color: randomColor(),
      }));
    }

    let t = 0;

    const animate = () => {
      t += 0.0025;

      // 🌈 Dynamic multi-layer gradient
      const midShiftX = 50 + Math.sin(t * 1.5) * 20;
      const midShiftY = 50 + Math.cos(t * 1.2) * 20;
      const rotation = Math.sin(t * 0.5) * 360;

      gradientRef.current.style.background = `
        radial-gradient(
          circle at ${midShiftX}% ${midShiftY}%,
          rgba(255, 255, 255, 0.3) 0%,
          transparent 60%
        ),
        conic-gradient(
          from ${rotation}deg at 50% 50%,
          #ff9ee2,
          #ffd980,
          #a6ffb5,
          #92d7ff,
          #d0b3ff,
          #ff9ee2
        )
      `;

      // 🌌 Particle shimmer
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      particles.current.forEach((p) => {
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 6);
        grad.addColorStop(0, `${p.color}cc`);
        grad.addColorStop(1, `${p.color}00`);

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animationRef.current = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className={styles.bgDecor}>
      <div ref={gradientRef} className={styles.gradientLayer} />
      {/* <canvas ref={canvasRef} className={styles.particleLayer} /> */}
      <div className={styles.edgeFade} />
    </div>
  );
};

export default AiArt;