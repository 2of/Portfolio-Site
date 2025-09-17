import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles/GlassContainer.module.scss";
const GlassPushOverlay = ({
  children,
  spiciness = 0.5, // 0 to 1, the intensity of the deform
  showHover = true, // whether the effect shows on hover
  randomcolour = false,
}) => {
  const containerRef = useRef(null);
  const glassRef = useRef(null);

  const pointer = useRef({ x: 0.5, y: 0.5 });
  const virtual = useRef({ x: 0.5, y: 0.5 });
  const raf = useRef(null);
  const isActive = useRef(false);

  const animate = () => {
    if (!containerRef.current || !glassRef.current) return;

    virtual.current.x += (pointer.current.x - virtual.current.x) * 0.12;
    virtual.current.y += (pointer.current.y - virtual.current.y) * 0.12;

    const percentX = virtual.current.x - 0.5;
    const percentY = virtual.current.y - 0.5;

    // Apply spiciness multiplier
    const rotateX = percentY * -10 * spiciness;
    const rotateY = percentX * 10 * spiciness;

    containerRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    const rect = containerRef.current.getBoundingClientRect();
    const glassX = pointer.current.x * rect.width;
    const glassY = pointer.current.y * rect.height;

    glassRef.current.style.opacity = 1;
    glassRef.current.style.transform = `translate(${glassX}px, ${glassY}px) translate(-50%, -50%)`;

    if (isActive.current) {
      raf.current = requestAnimationFrame(animate);
    }
  };



const trackedGradient = (variant) => {
  switch (variant) {
    case "red":
      return `radial-gradient(circle at center, rgba(255, 50, 50, 0.4) 0%, rgba(200, 0, 0, 0.15) 70%)`;

    case "standardlight":
      return `radial-gradient(circle at center, rgba(255, 255, 255, 0.3) 0%, rgba(230, 230, 230, 0.1) 80%)`;

    case "light":
      return `radial-gradient(circle at center, rgba(250, 250, 250, 0.35) 0%, rgba(240, 240, 240, 0.1) 75%)`;

    case "shadow":
      return `radial-gradient(circle at center, rgba(0, 0, 0, 0.25) 0%, rgba(0,0,0,0.05) 70%)`;

    case "superpastel":
      const pastelHue1 = Math.floor(Math.random() * 360);
      return `radial-gradient(circle at center, hsla(${pastelHue1}, 70%, 85%, 0.4) 0%, hsla(${pastelHue1}, 70%, 65%, 0.15) 70%)`;

    case "italianPastel":
      return `radial-gradient(circle at center, rgba(255, 200, 200, 0.4) 0%, rgba(255, 180, 180, 0.15) 70%)`;

    case "randomBright":
      const hueRandom = Math.floor(Math.random() * 360);
      return `radial-gradient(circle at center, hsla(${hueRandom}, 90%, 70%, 0.5) 0%, hsla(${hueRandom}, 90%, 50%, 0.2) 70%)`;

    case "randomSoft":
      const hueSoft = Math.floor(Math.random() * 360);
      return `radial-gradient(circle at center, hsla(${hueSoft}, 60%, 85%, 0.35) 0%, hsla(${hueSoft}, 60%, 65%, 0.1) 70%)`;

    case "miami":
      return `radial-gradient(circle at center, #ff6ec7 0%, #ffd86f 60%)`;

    case "sunset":
      return `radial-gradient(circle at center, #ff9a9e 0%, #fad0c4 70%)`;

    case "ocean":
      return `radial-gradient(circle at center, #6dd5ed 0%, #2193b0 70%)`;

    case "forest":
      return `radial-gradient(circle at center, #a8e063 0%, #56ab2f 70%)`;

    case "purpleDream":
      return `radial-gradient(circle at center, #d4a5a5 0%, #684a9b 70%)`;

    case "cosmic":
      return `radial-gradient(circle at center, #ff9a9e 0%, #bc4e9c 60%)`;

    case "electric":
      return `radial-gradient(circle at center, #00f5a0 0%, #00d9f5 70%)`;

    default:
      return `radial-gradient(circle at center, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0.05) 80%)`;
  }
};

  const handleMouseEnter = (e) => {
    if (!showHover) return; // skip effect if disabled
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    pointer.current = { x, y };
    virtual.current = { x: 0.5, y: 0.5 };

    containerRef.current.style.transition = "none";
    isActive.current = true;
    animate();
  };

  const handleMouseMove = (e) => {
    if (!showHover) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    pointer.current = {
      x: (e.clientX - rect.left) / rect.width,
      y: (e.clientY - rect.top) / rect.height,
    };
  };

  const handleMouseLeave = () => {
    if (!containerRef.current) return;
    isActive.current = false;
    cancelAnimationFrame(raf.current);

    const el = containerRef.current;
    el.style.transition = "transform 0.4s ease";
    el.style.transform = `perspective(800px) rotateX(0deg) rotateY(0deg)`;

    if (glassRef.current) {
      glassRef.current.style.opacity = 0;
    }
  };

  useEffect(() => {
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <div
      className={styles.glassOverlay}
      ref={containerRef}
      onMouseEnter={handleMouseEnter}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={glassRef}
        className={styles.glassEffect}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "300px",
          height: "300px",
          pointerEvents: "none",
          borderRadius: "50%",
          background: trackedGradient("randomSoft"),
          mixBlendMode: "screen",
          filter: "blur(40px) saturate(1.5)",
          opacity: 0,
   
          transition: "opacity 0.4s ease, transform 0.08s ease-out",
          transform: "translate(-50%, -50%)",
        }}
      />

      {children}
      {/* {children} */}
    </div>
  );
};
export default GlassPushOverlay;
