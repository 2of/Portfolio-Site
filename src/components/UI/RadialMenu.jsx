import React, { useState, useEffect } from "react";
import styles from "./styles/RadialMenu.module.scss";
import getIcon from "../../utils/Iconifier.jsx";
const Menu = ({ data, position = { x: 0, y: 0 }, radius = 200, path = [], depth = 0, currentPath, setCurrentPath }) => {
    if (!data || !Array.isArray(data.skills)) return null;

    const [isOpen, setIsOpen] = useState(false);
    const isFocused = JSON.stringify(path) === JSON.stringify(currentPath);

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
        setCurrentPath((prevPath) => {
            if (!isOpen) {
                return [...prevPath, data.name];
            } else {
                const index = prevPath.indexOf(data.name);
                if (index !== -1) {
                    return prevPath.slice(0, index);
                }
                return prevPath;
            }
        });
    };

    const generateCirclePoints = (cx, cy, radius, n) => {
        return Array.from({ length: n }, (_, i) => {
            const angle = (i / n) * 2 * Math.PI;
            return {
                x: cx + radius * Math.cos(angle),
                y: cy + radius * Math.sin(angle),
            };
        });
    };

    const [currentRadius, setCurrentRadius] = useState(radius);

    useEffect(() => {
        setCurrentRadius(isFocused ? 3 : radius);
    }, [currentPath, radius]);

    const points = generateCirclePoints(0, 0, currentRadius, data.skills.length);

    const calculateZIndex = (depth) => {
        return 100 + depth * 10; // Base z-index of 100, incremented by 10 for each depth level
    };

    return (
        <div className={styles.radialContainer} style={{ left: `${position.x}px`, top: `${position.y}px` }}>
            <div
                className={`${styles.radialButton} ${isFocused || isOpen ? styles.focused : styles.unfocused} ${styles.expandButton}`}
                onClick={toggleMenu}
                style={{ zIndex: calculateZIndex(depth) }} // Dynamic z-index based on depth
            >
                <p className={`${isOpen ? styles.flip : styles.icon}`}>{getIcon("down")}</p>
                <p>{data.name}</p>
            </div>

            {isOpen && (
                data.skills.map((category, index) => {
                    const newPath = [...path, data.name];
                    const isLeafFocused = JSON.stringify(newPath) === JSON.stringify(currentPath);
                    const childPosition = points[index];

                    const angle = Math.atan2(childPosition.y, childPosition.x);
                    const length = Math.sqrt(childPosition.x ** 2 + childPosition.y ** 2);

                    return (
                        <React.Fragment key={index}>
                            <div
                                className={styles.connectorLine}
                                style={{
                                    position: "absolute",
                                    left: "50%",
                                    top: "50%",
                                    width: `${length}px`,
                                    transform: `rotate(${angle}rad) translateY(-50%)`,
                                    transformOrigin: "0 0",
                                    zIndex: 0, // Ensure lines are behind buttons and nodes
                                }}
                            />
                            {typeof category === "string" ? (
                                <div
                                    className={styles.childNode_label}
                                    style={{
                                        left: `${childPosition.x}px`,
                                        top: `${childPosition.y}px`,
                                        zIndex: calculateZIndex(depth + 1), // Ensure child node is above the lines
                                    }}
                                >
                                    <div className={`${styles.radialButton} 
                                    ${isLeafFocused ? styles.focused : styles.unfocused} 
                                    ${styles.doubleBorderRound}`}
                                    
                                    style = {{ zIndex: calculateZIndex(depth + 1)}}
                                    >
                                        {category}
                                    </div>
                                </div>
                            ) : (
                                <div className={styles.childNode} style={{ left: `${childPosition.x}px`, top: `${childPosition.y}px`, zIndex: calculateZIndex(depth + 1) }}>
                                    <Menu
                                        data={category}
                                        position={childPosition}
                                        radius={radius}
                                        path={newPath}
                                        currentPath={currentPath}
                                        setCurrentPath={setCurrentPath}
                                        depth={depth + 1}  // Increment depth for child menus
                                    />
                                </div>
                            )}
                        </React.Fragment>
                    );
                })
            )}
        </div>
    );
};
export const RadialMenu = ({ data, initialX = 200, initialY = 200, initialRadius = 200 }) => {
    const [currentPath, setCurrentPath] = useState([]);

    return (
        <div className={styles.radialMenuWrapper}>
            <h3>Current path: {JSON.stringify(currentPath)}</h3>
            <Menu 
                data={data} 
                position={{ x: initialX, y: initialY }} 
                radius={initialRadius}
                currentPath={currentPath} 
                setCurrentPath={setCurrentPath} 
            />
        </div>
    );
};