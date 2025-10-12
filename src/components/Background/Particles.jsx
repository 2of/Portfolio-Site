import React, { useRef, useEffect } from "react";

const ParticleBackground = ({
  bgColor = "rgba(7, 7, 7, 1)",
  particleCount = 50,
  maxDistance = 140,
  speed = 2,
}) => {
  const canvasRef = useRef(null);
  const particles = [];

  // Utility functions
  const randomColor = () => `hsl(${Math.random() * 360}, 70%, 70%)`;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 2 * speed,
        vy: (Math.random() - 0.5) * 2 * speed,
        radius: Math.random() * 2 + 1.5,
        color: randomColor(),
        alpha: Math.random() * 0.5 + 0.5,
        alphaDir: Math.random() > 0.5 ? 0.01 : -0.01, // for twinkling
      });
    }

    const animate = () => {
      // Clear canvas
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw connections first for layering
      for (let i = 0; i < particleCount; i++) {
        for (let j = i + 1; j < particleCount; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            const gradient = ctx.createLinearGradient(
              particles[i].x,
              particles[i].y,
              particles[j].x,
              particles[j].y
            );
            gradient.addColorStop(0, particles[i].color);
            gradient.addColorStop(1, particles[j].color);

            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = gradient;
            ctx.globalAlpha = 1 - dist / maxDistance;
            ctx.lineWidth = 2;
            ctx.shadowBlur = 2;
            ctx.shadowColor = "#fff";
            ctx.stroke();
            ctx.globalAlpha = 1; // reset alpha
          }
        }
      }

      // Move and draw particles
      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Bounce off edges
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Twinkle effect
        p.alpha += p.alphaDir;
        if (p.alpha <= 0.2 || p.alpha >= 1) p.alphaDir *= -1;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.alpha;
        ctx.shadowBlur = 6;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.globalAlpha = 1; // reset alpha
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [bgColor, particleCount, maxDistance, speed]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -1,
        background: bgColor,
      }}
    />
  );
};

export default ParticleBackground;