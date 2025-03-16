import React, { createContext, useState, useContext } from "react";
import useScreenSize from "../utils/screensize";
// Create the Tooltip Context
const TooltipContext = createContext();

// Tooltip Provider Component
export const TooltipProvider = ({ children }) => {
    const [tooltip, setTooltip] = useState({
        content: null, // Tooltip content (can be a string or JSX)
        isVisible: false, // Tooltip visibility
        position: { x: 0, y: 0 }, // Tooltip position (mouse coordinates)
    });
    const screenSize = useScreenSize();

    // Show the tooltip at the mouse position
    const showTooltip = (content, event) => {
        const tooltipWidth = 150; // Estimated width of the tooltip (adjust as needed)
        const tooltipHeight = 50; // Estimated height of the tooltip

        let x = event.clientX - 40; // Default position to the right of the cursor
        let y = event.clientY + 20; // Default position below the cursor

        // Prevent tooltip from going off the right edge
        if (x + tooltipWidth > window.innerWidth) {
            x = window.innerWidth - tooltipWidth + 40; // Adjust to fit within bounds
        }

        // Prevent tooltip from going off the bottom edge
        if (y + tooltipHeight > window.innerHeight) {
            y = event.clientY - tooltipHeight - 30; // Move above cursor if needed
        }

        setTooltip({
            content,
            isVisible: true,
            position: { x, y },
        });
    };

    // Hide the tooltip
    const hideTooltip = () => {
        setTooltip((prev) => ({ ...prev, isVisible: false }));
    };

    return (
        <TooltipContext.Provider value={{ showTooltip, hideTooltip }}>
            {children}
            {tooltip.isVisible && screenSize !== "sm" && (
                <div
                className="glass"
                    style={{
                        position: "fixed",
                        left: tooltip.position.x,
                        top: tooltip.position.y,
                        // backgroundColor: "rgba(0, 0, 0, 0.8)",
                        // color: "#fff",
                        padding: "10px 15px",
                        borderRadius: "12px",
                        fontSize: "14px",
                        pointerEvents: "none", // Ensure the tooltip doesn't interfere with mouse events
                        zIndex: 1000, // Ensure it's above other elements
                        // boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
                        whiteSpace: "nowrap", // Prevent text from wrapping
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