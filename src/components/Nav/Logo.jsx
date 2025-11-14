import React, { useState, useRef, useEffect } from "react";
import { useAppTheme } from "../../contexts/ThemeContext.jsx";

export const Logo = ({ variant = "large", alwaysTrack = false }) => {
    const isLarge = variant === "large";
    const containerRef = useRef(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const [clicked, setClicked] = useState(false);
    const [trails, setTrails] = useState([]);
    const { getColor } = useAppTheme();

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        // For always tracking: listen on the whole window
        const target = alwaysTrack ? window : container;

        const handleMouseMove = (e) => {
            const rect = container.getBoundingClientRect();

            // When alwaysTrack is true:
            // if mouse not inside the element, we still use center as origin
            const inside =
                e.clientX >= rect.left &&
                e.clientX <= rect.right &&
                e.clientY >= rect.top &&
                e.clientY <= rect.bottom;

            let localX = e.clientX - rect.left - rect.width / 2;
            let localY = e.clientY - rect.top - rect.height / 2;

            // If mouse is outside but alwaysTrack = true, still track but clamp gently
            if (!inside && alwaysTrack) {
                // Track normally, but don't create weird huge numbers
                localX = localX / 1.2;
                localY = localY / 1.2;
            }

            setMousePos({ x: localX, y: localY });

            if (isHovering || alwaysTrack) {
                const newTrail = {
                    id: Date.now() + Math.random(),
                    x: e.clientX - rect.left,
                    y: e.clientY - rect.top,
                };
                setTrails((prev) => [...prev.slice(-8), newTrail]);
            }
        };

        const handleMouseEnter = () => setIsHovering(true);
        const handleMouseLeave = () => {
            setIsHovering(false);

            if (!alwaysTrack) {
                setMousePos({ x: 0, y: 0 });
                setTrails([]);
            }
        };

        // Attach listeners
        target.addEventListener("mousemove", handleMouseMove);
        if (!alwaysTrack) {
            container.addEventListener("mouseenter", handleMouseEnter);
            container.addEventListener("mouseleave", handleMouseLeave);
        }

        return () => {
            target.removeEventListener("mousemove", handleMouseMove);
            if (!alwaysTrack) {
                container.removeEventListener("mouseenter", handleMouseEnter);
                container.removeEventListener("mouseleave", handleMouseLeave);
            }
        };
    }, [isHovering, alwaysTrack]);

    const handleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 600);
    };

    const mainText = "thingies.dev";
    const subText = "noah's website";

    const getLetterTransform = (index, totalLetters) => {
        const tracking = alwaysTrack || isHovering;

        if (!tracking) return { x: 0, y: 0, scale: 1, rotate: 0 };

        const letterWidth = isLarge ? 20 : 14;
        const letterX = (index - totalLetters / 2) * letterWidth;
        const dx = mousePos.x - letterX;
        const dy = mousePos.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = 200;

        if (distance < maxDistance) {
            const force = Math.pow(1 - distance / maxDistance, -0.5);
            const pullX = (dx / distance) * force * 4;
            const pullY = (dy / distance) * force * 4;
            const scale = 1 + force * 0.15;
            const rotate = (dx / distance) * force * 5;
            return { x: pullX, y: pullY, scale, rotate };
        }

        return { x: 0, y: 0, scale: 1, rotate: 0 };
    };

    const tracking = alwaysTrack || isHovering;

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <div
                ref={containerRef}
                onClick={handleClick}
                style={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    cursor: "pointer",
                    userSelect: "none",
                    padding: "1rem",
                    transition: "transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    transformStyle: "preserve-3d",
                    transform: clicked ? "scale(0.95)" : "scale(1)",
                }}
            >
                {/* Main text */}
                <div
                    style={{
                        fontSize: isLarge ? "1.5rem" : "1rem",
                        fontWeight: "bold",
                        display: "flex",
                        position: "relative",
                        letterSpacing: tracking ? "0.05em" : "0",
                        transition: "letter-spacing 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                    }}
                >
                    {mainText.split("").map((char, i) => {
                        const transform = getLetterTransform(i, mainText.length);
                        return (
                            <span
                                key={i}
                                style={{
                                    display: "inline-block",
                                    transition: "all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1)",
                                    transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.scale})`,
                                    color: tracking
                                        ? getColor("--accent-color")
                                        : getColor("--text-color"),
                                    textShadow: tracking
                                        ? `0 0 20px rgba(102, 126, 234, ${transform.scale * 0.3})`
                                        : "none",
                                    filter: `brightness(${1 + transform.scale * 0.2})`,
                                }}
                            >
                                {char}
                            </span>
                        );
                    })}
                </div>

                {/* Subtitle */}
                <div
                    style={{
                        fontSize: isLarge ? "0.75rem" : "0.65rem",
                        color: tracking ? getColor("--accent-color") : getColor("--text-color"),
                        marginTop: "0.25rem",
                        transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                        transform: `translateX(${mousePos.x * 0.08}px) translateY(${
                            mousePos.y * 0.05
                        }px)`,
                        letterSpacing: tracking ? "0.08em" : "0",
                    }}
                >
                    {subText}
                </div>
            </div>
        </div>
    );
};
