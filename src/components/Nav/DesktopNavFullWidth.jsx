import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import routes from "../../routes/routes";
import styles from "./styles/DesktopNavFullWidth.module.scss";
import DarkModeToggle from "../UI/darkmodeToggleSmallInline.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeWrapper } from "../UI/DarkModeWrapper";
import { Logo } from "./Logo";
import { useIsMenuFloatingDesktop } from "../../contexts/RouteContext";
import { StandardButton } from "../UI/StandardLib/StandardButton.jsx";
import { useNavStack } from "../../contexts/NavStackContext";

export const DesktopNavFullWidth = () => {
    const screenSize = useScreenSize();
    const { getCurrentNavReplacementButton, getLink, openShareSheet } = useGlobalContext();
    const isMenuFloating = useIsMenuFloatingDesktop();
    const location = useLocation();
    const { showTooltip, hideTooltip } = useTooltip();
    const [activePath, setActivePath] = useState(location.pathname);
    const [routeChangeAnimating, setRouteChangeAnimating] = useState(false);
    const { shouldNavBgBeTransparent } = useNavStack();

    const handleShare = useCallback(() => {
        openShareSheet(
            window.location.href,
            "twitter",
            "Noah's Portfolio @ thingies.dev",
            "hello"
        );
    }, [openShareSheet]);

    useEffect(() => {
        if (location.pathname !== activePath) {
            setActivePath(location.pathname);
            setRouteChangeAnimating(true);

            const timer = setTimeout(() => {
                setRouteChangeAnimating(false);
            }, 700);

            return () => clearTimeout(timer);
        }
    }, [location.pathname, activePath]);

    if (screenSize === "sm") return null;

    const visibleRoutes = routes.filter((route) => !route.hideDesktop);
    const pathVisibleInNav = visibleRoutes.some(
        (route) => route.path === location.pathname
    );

    return (
        <nav
            className={`
        ${styles.navContainer}
        ${!isMenuFloating ? styles.fullwidth : styles.float}
        ${getCurrentNavReplacementButton().label ? styles.onlyButton : ""}
      `}
        >
            <ul
                className={`${styles.navList} 
        ${!shouldNavBgBeTransparent() ? styles.transparentbg : styles.fullbg}
        `}
            >
                <li className={`${styles.logoContainer} ${styles.link}`}>
                    <Link
                        to={"/home"}
                        viewTransition
                        className={`${styles.link}`}
                    >
                        <Logo variant="small" />
                    </Link>
                </li>

                {visibleRoutes.map((route, i) => (
                    <li
                        key={i}
                        className={`${styles.navItem} ${
                            routeChangeAnimating && location.pathname === route.path
                                ? styles.wiggleIcon
                                : ""
                        }`}
                    >
                        <Link
                            to={route.path}
                            className={`${styles.link} ${
                                location.pathname === route.path ? styles.activeLink : ""
                            }`}
                        >
                            <p className={styles.routeItem}>
                <span key={route.path + (routeChangeAnimating ? "-anim" : "")}>
                  {getIcon(route.icon ?? "home")}
                    {route.label}
                </span>
                            </p>
                        </Link>
                    </li>
                ))}

                {!pathVisibleInNav && (
                    <li className={`${styles.customFallback}`}>
                        <Link>
                            <p className={styles.routeItem}>
                                --
                                {location.pathname}
                            </p>
                        </Link>
                    </li>
                )}

                <li className={styles.spacer}></li>

                <ul className={styles.SocialButtons}>
                    <li className={` ${styles.rightnav}`}>
                        <StandardButton
                            label="Github"
                            tooltip="Navigate to resume"
                            type="rounded_label"
                            icon={getIcon("github")}
                            link={getLink("github")}
                            nointeractEffects={true}
                        />
                    </li>
                    <li className={` ${styles.rightnav}`}>
                        <StandardButton
                            label="LinkedIn"
                            tooltip="Navigate to LinkedIn"
                            type="rounded_label"
                            highlight={false}
                            icon={getIcon("linkedin")}
                            link={getLink("linkedin")}
                            nointeractEffects={true}
                        />
                    </li>

                    <li className={` ${styles.rightnav}`}>
                        <StandardButton
                            label="share"
                            icon={getIcon("share")}
                            callback={handleShare}
                            type="rounded_label"
                            fillContainer={false}
                            nointeractEffects={true}
                        />
                    </li>
                </ul>
                <li className={`${styles.navItem} ${styles.rightnav}`}>
                    <DarkModeWrapper type="largepill" />
                </li>
            </ul>
        </nav>
    );
};