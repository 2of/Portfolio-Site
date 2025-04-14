// components/DynamicNav.jsx

import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import routes from "../../routes/routes";
import styles from "./mobileNav.module.scss";
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeTile } from "../../components/darkmodeTile";
// import CollapsedButton from "../../components/CollapsedButton"; // Import the collapsed button



const CollapsedButton = ({ isCollapsed, onClick, showTooltip, hideTooltip, inner, expandLabel="" }) => {
    const [showTest, setShowTest] = useState(true); // starts visible

    useEffect(() => {
        // First timeout to shrink it after initial display
        const initialTimeout = setTimeout(() => {
            setShowTest(false);
        }, 3000); // Show for 3s initially

        // Loop to repeat visibility every 5s
        const interval = setInterval(() => {
            setShowTest(true);
            const timeout = setTimeout(() => {
                setShowTest(false);
            }, 5000); // Show again for 3s

            // Clean up timeout when component unmounts or interval fires again
            return () => clearTimeout(timeout);
        }, 18000); // Cycle every 8s (3s visible, 5s hidden)

        return () => {
            clearTimeout(initialTimeout);
            clearInterval(interval);
        };
    }, []);

    return (
        <div
            className={`${styles.collapsedTrigger} ${isCollapsed ? styles.visible : styles.hidden}`}
            onClick={onClick}
            onMouseMove={(e) => showTooltip("Menu", e)}
            onMouseLeave={hideTooltip}
        >
            {inner}
            <p className={`${styles.explainerText} ${showTest ? styles.visibleText : ""}`}>{expandLabel}</p>
        </div>
    );
};


export const DynamicNav = ({ isSmall, direction = "horizontal" }) => {
    const screenSize = useScreenSize();
    const {
        getCurrentNavReplacementButton,
        navReplacementButtonStack,
        setDisableForPopupEnhanced,
        pushNavReplacementButton,
        popNavReplacementButton,

    } = useGlobalContext();
    const { showTooltip, hideTooltip } = useTooltip();
    const navigate = useNavigate();
    const location = useLocation();
    let animTime = 500;
    const [state, setState] = useState("mini");
    const [isTemporarilyExpanded, setIsTemporarilyExpanded] = useState(false);
    const [isAnimatingIn, setIsAnimatingIn] = useState(false);
    const [isAnimatingOut, setIsAnimatingOut] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [testMode, setTestMode] = useState(false);
    const navRef = useRef(null);


    useEffect(() => {
        const currentButton = getCurrentNavReplacementButton();
        if (screenSize === "sm") {
            setState("mini");
        } else {
            setState(currentButton?.label ? "float_extra_button" : "float");
        }
    }, [screenSize, navReplacementButtonStack, getCurrentNavReplacementButton]);

    useEffect(() => {
        setIsTemporarilyExpanded(false);
    }, [isSmall]);

    const handleLinkClick = (path) => {
        triggerCollapseAnimation()
        navigate(path);
    };

    const handleNavTouch = (e) => {
        if ((isSmall || testMode) && !isTemporarilyExpanded && !isAnimating) {
            e.preventDefault();
            triggerExpandAnimation();
            pushNavReplacementButton({
                callback: () => alert("test"),
                label: getIcon("close"),
              });
        }
    };
    const menuOpenHandle = () => { 
        console.log(getCurrentNavReplacementButton())
        triggerExpandAnimation()
        pushNavReplacementButton({
            callback: triggerCollapseAnimation,
            label: getIcon("close"),
          });
    }
    const triggerExpandAnimation = () => {
        setIsAnimatingIn(true);
        setIsVisible(true);
        setIsTemporarilyExpanded(true);
        setDisableForPopupEnhanced(true, () => triggerCollapseAnimation());
        setTimeout(() => setIsAnimatingIn(false), animTime);
    };

    const triggerCollapseAnimation = () => {
        setIsAnimatingOut(true);
        popNavReplacementButton()
        //   setIsTemporarilyExpanded(false);
        //   setDisableForPopupEnhanced(false);
        setTimeout(() => {
            setIsAnimatingOut(false);
            setIsTemporarilyExpanded(false);
            setDisableForPopupEnhanced(false);
            setIsVisible(false); // Hide it only after animation completes
        }, animTime); // match CSS animation time
    };

    const miniNavItems = () => (
        <ul className={`${styles.navList} ${direction === "vertical" ? styles.vertical : ""}`}>
            {routes.map((route, i) => (
                <li key={i} className={`${styles.navItem} flatStyleShadow_NO_INTERACT`}>
                    <div
                        onClick={() => handleLinkClick(route.path)}
                        className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""}`}
                        onMouseMove={(e) => showTooltip(route.label, e)}
                        onMouseLeave={hideTooltip}
                    >
                        <p>{getIcon(route.label)}</p>
                        <p>{route.label}</p>
                    </div>
                </li>
            ))}
            <li className={`${styles.navItem} flatStyleShadow_NO_INTERACT`}>

                <DarkModeTile />
            </li>

        </ul>
    );

    const isCollapsed = (isSmall || screenSize == "sm") && !isTemporarilyExpanded;





    const MiniBar = () => {

        
    }
    return (
        <>


    <CollapsedButton
                isCollapsed={isCollapsed}
                expandLabel={!getCurrentNavReplacementButton().label  ? "Menu" : getCurrentNavReplacementButton().labeltext || "Close"}
                onClick={!getCurrentNavReplacementButton().label  ? menuOpenHandle : getCurrentNavReplacementButton().callback}
                showTooltip={showTooltip}
                hideTooltip={hideTooltip}
                inner=
                {
                    getCurrentNavReplacementButton().label ?

                    <span className={styles.menuIcon}>{ getCurrentNavReplacementButton().label }</span> :
                        <span className={styles.menuIcon}>{getIcon('menu')}</span>  

                        
                 

                }

            />
 

            
            


            {(state === "mini" || state === "buttonOnly_mini") && isVisible && (
                <div
                    ref={navRef}
                    className={`${styles.miniNav} 
              ${isCollapsed ? styles.collapsed : styles.expanded} 
              ${direction === "vertical" ? styles.vertical : ""} 
              ${isAnimatingIn ? styles.animatingIn : ""}
            ${isAnimatingOut ? styles.animatingOut : ""}
            `}
                    onTouchStart={handleNavTouch}
                    onClick={isCollapsed ? triggerExpandAnimation : undefined}
                >
                    {!isCollapsed && (
                        <>
                            <div className={styles.headerText}>
                                <h2>Thanks for checking out my things</h2>
                                <p>The junk page is really just a testing spot. Feel free to flick me a pm</p>


                            </div>
                            {miniNavItems()}
                        </>
                    )}
                </div>
            )}
        </>
    );
};