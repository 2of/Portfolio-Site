import React, { useRef, useEffect } from "react";
import styles from "./styles/FlowChart.module.scss";

const Flowchart = ({ data, width = 400, height = 600 }) => {
  const canvasRef = useRef(null);
  const positions = useRef({});
  const velocities = useRef({});
  const windPhase = useRef(0);

  const SPRING_LENGTH = 40;
  const SPRING_STRENGTH = 0.02;
  const REPULSION_STRENGTH = 800;
  const DAMPING = 0.9;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const nodes = data.nodes;
    const links = data.links;

    const centerX = width / 2;
    const offsetY = 80;

    // Initialize positions and velocities
    nodes.forEach((node, i) => {
      positions.current[node.id] = {
        x: centerX,
        y: offsetY + i * SPRING_LENGTH,
      };
      velocities.current[node.id] = { x: 0, y: 0 };
    });

    function step() {
      windPhase.current += 0.02;

      nodes.forEach((a, index) => {
        let acc = { x: 0, y: 0 };

        // Gentle sway
        const sway = Math.sin(windPhase.current + index * 0.5) * 0.3;
        acc.x += sway;

        // Soft horizontal centering
        const dxCenter = centerX - positions.current[a.id].x;
        acc.x += dxCenter * 0.005;

        // Repulsion
        nodes.forEach((b) => {
          if (a.id === b.id) return;
          const dx = positions.current[a.id].x - positions.current[b.id].x;
          const dy = positions.current[a.id].y - positions.current[b.id].y;
          const distSq = dx * dx + dy * dy || 0.01;
          const force = REPULSION_STRENGTH / distSq;
          acc.x += force * dx;
          acc.y += force * dy;
        });

        // Spring links
        links.forEach((link) => {
          if (link.source === a.id || link.target === a.id) {
            const otherId = link.source === a.id ? link.target : link.source;
            const dx = positions.current[otherId].x - positions.current[a.id].x;
            const dy = positions.current[otherId].y - positions.current[a.id].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            const displacement = dist - SPRING_LENGTH;
            const force = SPRING_STRENGTH * displacement;
            acc.x += (force * dx) / dist;
            acc.y += (force * dy) / dist;
          }
        });

        // Apply velocity
        velocities.current[a.id].x = (velocities.current[a.id].x + acc.x) * DAMPING;
        velocities.current[a.id].y = (velocities.current[a.id].y + acc.y) * DAMPING;

        positions.current[a.id].x += velocities.current[a.id].x;
        positions.current[a.id].y += velocities.current[a.id].y;
      });

      draw();
      requestAnimationFrame(step);
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.strokeStyle = "#ccc";
      ctx.lineWidth = 1.5;

      // Draw links
      links.forEach((link) => {
        const a = positions.current[link.source];
        const b = positions.current[link.target];
        ctx.beginPath();
        ctx.moveTo(a.x, a.y);
        ctx.lineTo(b.x, b.y);
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node) => {
        const { x, y } = positions.current[node.id];
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, Math.PI * 2);
        ctx.fillStyle = "#0077ff";
        ctx.fill();
        ctx.strokeStyle = "#333";
        ctx.stroke();
        ctx.fillStyle = "#fff";
        ctx.font = "10px sans-serif";
        ctx.textAlign = "center";
        ctx.fillText(node.label, x, y - 14);
      });
    }

    step();
  }, [data, width, height]);

  return (
    <div className={styles.flowchartWrapper}>
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        className={styles.canvas}
      />
    </div>
  );
};

export default Flowchart;