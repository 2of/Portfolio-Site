import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import styles from "./styles/FeatherRevealImage.module.scss";

const FeatherRevealImage = ({ BaseImage, RevealedImage, radius = 150, transitionDuration = 300 }) => {
  const canvasRef = useRef(null);
  const imgA = useRef(new Image());
  const imgB = useRef(new Image());
  const pointer = useRef({ x: 0, y: 0 });
  const size = useRef({ width: 0, height: 0 });

  const currentRadius = useRef(0);
  const targetRadius = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    imgA.current.src = RevealedImage;
    imgB.current.src = BaseImage;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const updateSize = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      size.current = { width: rect.width, height: rect.height };
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

      // Draw image B (default)
      ctx.globalCompositeOperation = "source-over";
      ctx.drawImage(imgB.current, 0, 0, width, height);

      if (currentRadius.current > 1) {
        const tempCanvas = document.createElement("canvas");
        tempCanvas.width = width;
        tempCanvas.height = height;
        const tempCtx = tempCanvas.getContext("2d");

        // Draw image A onto temp canvas
        tempCtx.drawImage(imgA.current, 0, 0, width, height);

        // Create radial mask
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
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };

    const stopLoop = () => {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    };

    const handleMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      pointer.current.x = e.clientX - rect.left;
      pointer.current.y = e.clientY - rect.top;
    };

    const handleEnter = () => {
      targetRadius.current = radius;
      startLoop();
    };

    const handleLeave = () => {
      targetRadius.current = 0;
    };

    const onImagesLoaded = () => {
      updateSize();
      draw.lastTime = performance.now();
      startLoop();
    };

    imgA.current.onload = imgB.current.onload = onImagesLoaded;

    window.addEventListener("resize", updateSize);
    canvas.addEventListener("mousemove", handleMove);
    canvas.addEventListener("mouseenter", handleEnter);
    canvas.addEventListener("mouseleave", handleLeave);

    return () => {
      stopLoop();
      window.removeEventListener("resize", updateSize);
      canvas.removeEventListener("mousemove", handleMove);
      canvas.removeEventListener("mouseenter", handleEnter);
      canvas.removeEventListener("mouseleave", handleLeave);
    };
  }, [BaseImage, RevealedImage, radius, transitionDuration]);

  return <canvas ref={canvasRef} className={styles.canvas} />;
};

FeatherRevealImage.propTypes = {
  imageA: PropTypes.string.isRequired,
  imageB: PropTypes.string.isRequired,
  radius: PropTypes.number,
  transitionDuration: PropTypes.number,
};

export default FeatherRevealImage;