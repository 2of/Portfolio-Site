import React, { createContext, useState, useContext, useEffect, useRef } from "react";
import useScreenSize from "../utils/screensize";

const TooltipContext = createContext();

export const TooltipProvider = ({ children }) => {
    const [tooltip, setTooltip] = useState({
        content: null,
        isVisible: false,
        position: { x: 0, y: 0 },
    });

    const [shouldRender, setShouldRender] = useState(false);
    const screenSize = useScreenSize();
    const hideTimeoutRef = useRef(null); // 🆕 Track timeout

    const showTooltip = (content, event) => {
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
            hideTimeoutRef.current = null;
        }

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
        // 🧹 Clear previous timeout just in case
        if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
        }

        setTooltip((prev) => ({ ...prev, isVisible: false }));

        // Delay unmount for transition (or cancel if buggy)
        hideTimeoutRef.current = setTimeout(() => {
            setShouldRender(false);
            hideTimeoutRef.current = null;
        }, 200);

        // 🔐 Failsafe: forcibly remove tooltip if it's stuck after 500ms
        setTimeout(() => {
            setTooltip({ content: null, isVisible: false, position: { x: 0, y: 0 } });
            setShouldRender(false);
        }, 500);
    };

    useEffect(() => {
        return () => {
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, []);

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
                        padding: "10px 15px",
                        pointerEvents: "none",
                        zIndex: 1000,
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