import React, { useEffect, useState } from "react";
import styles from '../styles/Modal.module.scss';
import { useGlobalContext } from "../../../contexts/GlobalContext.jsx";
import { useTooltip } from "../../../contexts/tooltip.jsx";
import useScreenSize from "../../../utils/screensize.js";
import { FaExpandAlt, FaCompressAlt, FaTimesCircle } from 'react-icons/fa';
import getIcon from "../../../utils/Iconifier.jsx";

export const Modal = ({ component, onClose, size = "small", title, buttons = [], isOpen }) => {
    const [isVisible, setIsVisible] = useState(false);
    const { pushNavReplacementButton, popNavReplacementButton, setHopNav } = useGlobalContext();
    const { showTooltip, hideTooltip } = useTooltip();
    const screenSize = useScreenSize();
    const [isFullScreen, setIsFullScreen] = useState(false);

    const handlefs = () => {
        setIsFullScreen(prevState => !prevState);
    };

    useEffect(() => {
        if (isOpen) {
            setTimeout(() => setIsVisible(true), 10);
            if (size === "large") setHopNav(true);
        } else {
            setIsVisible(false);
        }
    }, [isOpen]);

    const handleClose = () => {
        setIsVisible(false);
        popNavReplacementButton();
        setTimeout(onClose, 500);
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            handleClose();
        }
    };

    useEffect(() => {
        pushNavReplacementButton({
            callback: handleClose,
            label: "Close",
        });
    }, []);

    if (!isOpen && !isVisible) return null;

    return (
        <div
            className={`${styles.modalOverlay} 
            ${isVisible ? styles.visible : ""} 
            ${screenSize === "lg" ? styles.lg : screenSize === "md" ? styles.md : styles.sm}`}
            onClick={handleOverlayClick}
        >
            <div
                className={`${styles.modalContent} ${size === "large" ? styles.large : styles.small} ${isFullScreen ? styles.full : ""}`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className={`${styles.buttonPalette} standardMouseOverBounce`}>
              
                    <button
                        className={styles.modalNav}
                        onMouseMove={(e) => showTooltip("Fullscreen", e)}
                        onMouseLeave={hideTooltip}
                        onClick={handlefs}
                    >
                        {!isFullScreen ? <FaExpandAlt /> : <FaCompressAlt />}
                    </button>
                    <button
                        className={styles.modalNav}
                        onMouseMove={(e) => showTooltip("Closies", e)}
                        onMouseLeave={hideTooltip}
                        onClick={handleClose}
                    >
                        <FaTimesCircle />
                    </button>

                   
                </div>

                <div className={styles.modalBody}>{component}</div>
            </div>
        </div>
    );
};