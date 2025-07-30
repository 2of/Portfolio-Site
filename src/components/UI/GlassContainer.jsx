import React, { useRef, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./styles/GlassContainer.module.scss";

const GlassPushOverlay = ({ children }) => {
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

    const rotateX = percentY * -10;
    const rotateY = percentX * 10;

    containerRef.current.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;

    // Move the glass effect under the cursor
    const container = containerRef.current;
    const rect = container.getBoundingClientRect();
    const glassX = pointer.current.x * rect.width;
    const glassY = pointer.current.y * rect.height;

    glassRef.current.style.opacity = 1;
    glassRef.current.style.transform = `translate(${glassX}px, ${glassY}px) translate(-50%, -50%)`;

    if (isActive.current) {
      raf.current = requestAnimationFrame(animate);
    }
  };

  const handleMouseEnter = (e) => {
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
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    pointer.current = { x, y };
  };

  const handleMouseLeave = () => {
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

GlassPushOverlay.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GlassPushOverlay;