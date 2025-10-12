import React, { useRef, useEffect } from "react";

export const NudgeContainer = ({ children, intensity = 3, speed = 0.1 }) => {
  const containerRef = useRef();
  const offsetRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });
  const animationRef = useRef();

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;  // -1 to 1
    targetRef.current = { x: x * intensity, y: y * intensity };
  };

  const handleMouseLeave = () => {
    targetRef.current = { x: 0, y: 0 };
  };

  const animate = () => {
    // linear interpolation for smooth movement
    offsetRef.current.x += (targetRef.current.x - offsetRef.current.x) * speed;
    offsetRef.current.y += (targetRef.current.y - offsetRef.current.y) * speed;

    if (containerRef.current) {
      containerRef.current.style.transform = `translate(${offsetRef.current.x}px, ${offsetRef.current.y}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationRef.current);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{ display: "inline-block", willChange: "transform" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};