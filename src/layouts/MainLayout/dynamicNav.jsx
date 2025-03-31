import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import routes from "../../routes/routes";
import styles from "./dynamicNav.module.scss";
import DarkModeToggle from "../../components/darkmodeToggleSmallInline";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { TooltipProvider, useTooltip } from "../../contexts/tooltip";

export const DynamicNav = () => {
    const screenSize = useScreenSize();
    const {
        getCurrentNavReplacementButton,
        navReplacementButtonStack,
    } = useGlobalContext();


    const { showTooltip, hideTooltip } = useTooltip();
    const navigate = useNavigate();
    const location = useLocation();

    const [state, setState] = useState("mini"); // Possible values: "mini", "float", "buttonOnly_mini" "float_extra_button"
    const [isExpand, setIsExpand] = useState(false);

    // Update state based on screen size
    useEffect(() => {
        const currentButton = getCurrentNavReplacementButton();


        if (screenSize === "sm") {
            setState(currentButton?.label ? "buttonOnly_mini" : "mini");
            return
        }
        setState(currentButton?.label ? "float_extra_button" : "float");
    }, [screenSize, navReplacementButtonStack, getCurrentNavReplacementButton]);

    // Handle navigation click
    const handleLinkClick = (path) => {
        navigate(path);
    };


    const miniNavItems = () => {
        return (
            <ul className={styles.navList}>
                {routes.map((route, i) => (
                    <li key={i} className={styles.navItem}>
                        <div
                            onClick={() => handleLinkClick(route.path)}
                            className={`${styles.link} ${location.pathname === route.path ? styles.activeLink : ""
                                }`}
                            onMouseMove={(e) => showTooltip(route.label, e)}
                            onMouseLeave={hideTooltip}
                        >
                            <p>{getIcon(route.label)}</p>
                            <p>{route.label}</p>
                        </div>
                    </li>
                ))}
                <li className={styles.navItem}>
                    <DarkModeToggle />
                </li>
            </ul>
        );
    }



    return (
        // <div className={styles.navContainer}>
        <>
            {(state === "mini" || state === "buttonOnly_mini") && (
                <div className={styles.miniNav}>
                    {miniNavItems()}
                </div>

            )}
        </>
    );
};