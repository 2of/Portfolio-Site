import React, { createContext, useState, useContext, useEffect } from "react";
import useScreenSize from "../utils/screensize";

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
    const [tooltip, setTooltip] = useState({
        content: null,
        isVisible: false,
        position: { x: 0, y: 0 },
    });

    const [shouldRender, setShouldRender] = useState(false); // Keeps tooltip mounted
    const screenSize = useScreenSize();

    const showTooltip = (content, event) => {
        const tooltipWidth = 150;
        const tooltipHeight = 50;

        let x = event.clientX - 40;
        let y = event.clientY + 20;

        if (x + tooltipWidth > window.innerWidth) {
            x = window.innerWidth - tooltipWidth + 40;
        }

        if (y + tooltipHeight > window.innerHeight) {
            y = event.clientY - tooltipHeight - 10;
        }

        setTooltip({ content, isVisible: true, position: { x, y } });
        setShouldRender(true);
    };

    const hideTooltip = () => {
        setTooltip((prev) => ({ ...prev, isVisible: false }));
        setTimeout(() => setShouldRender(false), 200); // Delay to allow exit animation
    };

    return (
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
            {children}
            {shouldRender && screenSize !== "sm" && (
                <div
                className="flatStyleShadow"
                    style={{
                        position: "fixed",
                        left: tooltip.position.x,
                        top: tooltip.position.y,
                        // backgroundColor: "rgba(0, 0, 0, 0.8)",
                        // color: "#fff",
                        padding: "10px 15px",
                        // borderRadius: "12px",
                        // fontSize: "14px",
                        pointerEvents: "none",
                        zIndex: 1000,
                        // whiteSpace: "nowrap",
                        transition: "opacity 0.2s ease, transform 0.2s ease",
                        opacity: tooltip.isVisible ? 1 : 0,
                        transform: tooltip.isVisible ? "scale(1)" : "scale(0.95)",
                    }}
                >
                    {tooltip.content}
                </div>
            )}
        </TooltipContext.Provider>
    );
};

// Custom hook to use the Tooltip Context
export const useTooltip = () => {
    const context = useContext(TooltipContext);
    if (!context) {
        throw new Error("useTooltip must be used within a TooltipProvider");
    }
    return context;
};