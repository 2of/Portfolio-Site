import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles/GlassContainer.module.scss";
const GlassPushOverlay = ({
  children,
  spiciness = 0.5, // 0 to 1, the intensity of the deform 
  showHover = true, // whether the effect shows on hover
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
      <div ref={glassRef} className={styles.glassEffect} />
      {children}
    </div>
  );
};
export default GlassPushOverlay;