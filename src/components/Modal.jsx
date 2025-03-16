import React, { useEffect, useState } from "react";
import styles from './Modal.module.scss'; // Ensure you have the corresponding SCSS module
import { useGlobalContext } from "../contexts/GlobalContext";
import { TooltipProvider, useTooltip } from "../contexts/tooltip";
import useScreenSize from "../utils/screensize";
import { FaExpandAlt, FaCompressAlt, FaTimesCircle } from 'react-icons/fa';
import getIcon from "../utils/Iconifier";
export const Modal = ({ component, onClose, size = "small", title, buttons = [], isOpen }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { setNavReplacementButtonFunc, setHopNav } = useGlobalContext();
    const { showTooltip, hideTooltip } = useTooltip();
    const screenSize = useScreenSize();
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handlefs = () => {
        setIsFullScreen(prevState => !prevState);
    }
    useEffect(() => {
        if (isOpen) {
            // Trigger the opening animation after the modal is added to the DOM
            setTimeout(() => setIsVisible(true), 10);
            if (size == "large") setHopNav(true);
            console.log(size)
        } else {
            // Trigger the closing animation before removing the modal from the DOM
            setIsVisible(false);
        }
    }, [isOpen]);

    // Handle the closing animation and delay the onClose callback
    const handleClose = () => {
        setIsVisible(false);
        setNavReplacementButtonFunc({
            callback: null,
            label: "",
        });
        setTimeout(onClose, 500); // Wait for the animation to complete before calling onClose
    };

    // Handle clicking outside the modal to close it
    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            // Only close if the click is on the overlay (not the modal content)
            handleClose();
        }
    };
    const myCallbackFunction = () => {
        handleClose()
    };

    const testthing = () => {

    }

    useEffect(() => {
        const myCallbackFunction = () => {
            console.log("Custom action executed!");
        };

        setNavReplacementButtonFunc({
            callback: handleClose,
            label: getIcon("close")
        });
    }, []); // Empty dependency array ensures it runs only once on mount
    // Don't render the modal if it's not open and not visible
    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`${styles.modalOverlay} 
            ${isVisible ? styles.visible : ""} 
            ${screenSize === "lg" ? styles.lg : screenSize === "md" ? styles.md : styles.sm}`}
            onClick={handleOverlayClick} // Handle clicks on the overlay
        >


            <div
                className={`${styles.modalContent} ${size === "large" ? styles.large : styles.small} ${isFullScreen ? styles.full : ""} `}
                onClick={(e) => e.stopPropagation()} // Prevent clicks inside the modal from closing it
            >
                <div className={styles.buttonPalette}>

                    <button className={styles.modalNav}
                        onMouseMove={(e) => showTooltip("Fullscreen", e)}
                        onMouseLeave={hideTooltip}
                        onClick={handlefs}>{!isFullScreen ? <FaExpandAlt /> : <FaCompressAlt />}</button>
                    <button className={styles.modalNav}
                        onMouseMove={(e) => showTooltip("Closies", e)}
                        onMouseLeave={hideTooltip}
                        onClick={handleClose}><FaTimesCircle /></button>
                </div>

                {/* Modal Header */}
                {/* {title && (
                    <div className={styles.modalHeader}>
                        <h2>{title}</h2>
                    </div>
                )} */}

                {/* Modal Body */}
                <div className={styles.modalBody}>{component}</div>


                {/* Modal Footer */}
                <div className={styles.modalFooter}>
                    {/* Render additional buttons */}
                    {/* {buttons.map((button, index) =>
                        button.link ? (
                            <a key={index} href={button.link} className={styles.button}>
                                {button.name}
                            </a>
                        ) : (
                            <button key={index} onClick={button.onClick} className={styles.button}>
                                {button.name}
                            </button>
                        )
                    )} */}



                </div>
            </div>
        </div>
    );
};