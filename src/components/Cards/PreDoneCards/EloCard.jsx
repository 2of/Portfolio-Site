import React, { useRef, useEffect } from "react";
import styles from "./EloCard.module.scss";
import { StandardButton } from "../../UI/StandardButton";

export const EloCard = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let animationId;
    let time = 0;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

const drawChessboard = () => {
  const w = canvas.offsetWidth;
  const h = canvas.offsetHeight;

  ctx.clearRect(0, 0, w, h);

  const tilt = Math.sin(time * 0.0003) * 0.08; // smoother
  const rotate = Math.sin(time * 0.0002) * 0.04;

  const squareSize = 60;
  const cols = 12;
  const rows = 10;

  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * squareSize - 100 + Math.sin(time * 0.0008 + col * 0.25) * 8;
      const y = row * squareSize - 50 + Math.cos(time * 0.0008 + row * 0.25) * 8;

      const depth = 1 - (row / rows) * 0.3;
      const size = squareSize * depth;
      const offsetX = (col - cols / 2) * tilt * 25;
      const offsetY = (row - rows / 2) * rotate * 20;

      const finalX = x + offsetX + w * 0.1;
      const finalY = y + offsetY + h * 0.2;

      const isLight = (row + col) % 2 === 0;
      const baseOpacity = 0.02 + Math.sin(time * 0.0015 + row * 0.2 + col * 0.2) * 0.015;

      ctx.fillStyle = isLight
        ? `rgba(255, 255, 255, ${baseOpacity})`
        : `rgba(0, 0, 0, ${baseOpacity + 0.01})`;

      ctx.fillRect(finalX, finalY, size, size);

      ctx.strokeStyle = `rgba(100, 100, 100, ${baseOpacity * 0.5})`;
      ctx.lineWidth = 0.4;
      ctx.strokeRect(finalX, finalY, size, size);
    }
  }

  time++;
  animationId = requestAnimationFrame(drawChessboard);
};


    drawChessboard();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const tags = ["Machine Learning", "Neural Networks", "Python", "TensorFlow", "Chess AI"];
  const links = [
    { label: "View Project", icon: "→", primary: true },
    { label: "GitHub", icon: "⚡" },
    { label: "Documentation", icon: "📄" }
  ];

  return (
    <div className={styles.card}>
      <canvas ref={canvasRef} className={styles.canvas} />

      <div className={styles.content}>
        {/* Title Section */}
        <div className={styles.titleSection}>
          <div className={styles.subtitle}>Machine Learning Project</div>
          <h1 className={styles.title}>Chess Elo Estimator</h1>
        </div>

        {/* Description */}
        <div className={styles.description}>
         Rudimentary Machine Leraning models generated from 30m+ Chess games and exposed through a react front end.     
        </div>

        {/* Tags */}
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={tag} className={styles.tag} style={{ animationDelay: `${0.1 + i * 0.1}s` }}>
              {tag}
            </span>
          ))}
        </div>

        <div className={styles.spacer} />

        {/* Links */}
        <div className={styles.links}>
          {links.map(link => (

            <StandardButton label={link.label} icon={link.icon} type="modern"/>
            // <button key={link.label} className={`${styles.linkButton} ${link.primary ? styles.primary : ""}`}>
            //   {link.label} <span className={styles.icon}>{link.icon}</span>
            // </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EloCard;
