// components/DynamicNav.jsx
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import routes from "../../routes/routes";
import styles from "./mobileNav.module.scss";
import DarkModeToggle from "../../components/UI/darkmodeToggleSmallInline.jsx";
import { useGlobalContext } from "../../contexts/GlobalContext";
import useScreenSize from "../../utils/screensize";
import getIcon from "../../utils/Iconifier";
import { useTooltip } from "../../contexts/tooltip";
import { DarkModeTile } from "../../components/UI/darkmodeTile.jsx";
import WigglyLine from "../../components/Misc/WigglyLine";
import { ZuneTextBG } from "../../components/Background/ZuneText";

const CollapsedButton = ({
  isCollapsed,
  onClick,
  showTooltip,
  hideTooltip,
  inner,
  expandLabel = "",
}) => {
  const [showTest, setShowTest] = useState(true);
  const touchTimeout = useRef(null);

  const handleClick = (e) => {
    e.preventDefault();
    onClick();
  };

  useEffect(() => {
    const initialTimeout = setTimeout(() => {
      setShowTest(false);
    }, 3000);

    const interval = setInterval(() => {
      setShowTest(true);
      const timeout = setTimeout(() => {
        setShowTest(false);
      }, 5000);
      return () => clearTimeout(timeout);
    }, 18000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`${styles.collapsedTrigger} flatStyleShadow_NO_INTERACT ${
        isCollapsed ? styles.visible : styles.hidden
      }`}
      onClick={handleClick}
      onTouchStart={handleClick}
      onTouchEnd={(e) => e.preventDefault()}
      onMouseMove={(e) => showTooltip("Menu", e)}
      onMouseLeave={hideTooltip}
    >
      {inner}
      <p
        className={`${styles.explainerText} ${
          showTest ? styles.visibleText : ""
        }`}
      >
        {expandLabel}
      </p>
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
  const animTime = 650;
  const [state, setState] = useState("mini");
  const [isTemporarilyExpanded, setIsTemporarilyExpanded] = useState(false);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navRef = useRef(null);
  const lastCallbackRef = useRef(null);
  const isTransitioningRef = useRef(false);
  const touchStartRef = useRef(null);

  useEffect(() => {
    const currentButton = getCurrentNavReplacementButton();
    if (screenSize === "sm") {
      setState("mini");
    } else {
      setState(currentButton?.label ? "float_extra_button" : "float");
    }
  }, [screenSize, navReplacementButtonStack, getCurrentNavReplacementButton]);

  useEffect(() => {
    const current = getCurrentNavReplacementButton();
    if (current?.callback) {
      lastCallbackRef.current = current.callback;
    }
  }, [getCurrentNavReplacementButton, navReplacementButtonStack]);

  useEffect(() => {
    setIsTemporarilyExpanded(false);
  }, [isSmall]);

  const handleLinkClick = (path) => {
    if (isTransitioningRef.current) return;
    triggerCollapseAnimation();
    navigate(path);
  };

  const menuOpenHandle = (e) => {
    if (e) e.preventDefault();
    triggerExpandAnimation();
    pushNavReplacementButton({
      callback: triggerCollapseAnimation,
      label: getIcon("close"),
    });
  };

  const triggerExpandAnimation = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;
    
    setIsAnimatingIn(true);
    setIsVisible(true);
    setIsTemporarilyExpanded(true);
    setDisableForPopupEnhanced(true, () => triggerCollapseAnimation());
    
    setTimeout(() => {
      setIsAnimatingIn(false);
      isTransitioningRef.current = false;
    }, animTime);
  };

  const triggerCollapseAnimation = () => {
    if (isTransitioningRef.current) return;
    isTransitioningRef.current = true;

    setIsAnimatingOut(true);
    popNavReplacementButton();

    setTimeout(() => {
      setIsAnimatingOut(false);
      setIsTemporarilyExpanded(false);
      setDisableForPopupEnhanced(false);
      setIsVisible(false);
      isTransitioningRef.current = false;
    }, animTime);
  };

  const miniNavItems = () => (
    <ul
      className={`${styles.navList} ${
        direction === "vertical" ? styles.vertical : ""
      }`}
    >
      {routes.map((route, i) => {
        if (route.hide) return null;

        return (
          <li key={i} className={`${styles.navItem} flatStyleShadow_NO_INTERACT`}>
            <div
              onClick={(e) => {
                e.preventDefault();
                handleLinkClick(route.path);
              }}
              onTouchStart={(e) => {
                e.preventDefault();
                touchStartRef.current = e.timeStamp;
              }}
              onTouchEnd={(e) => {
                if (touchStartRef.current && e.timeStamp - touchStartRef.current < 500) {
                  e.preventDefault();
                  handleLinkClick(route.path);
                }
                touchStartRef.current = null;
              }}
              className={`${styles.link} ${
                location.pathname === route.path ? styles.activeLink : ""
              }`}
              onMouseMove={(e) => showTooltip(route.label, e)}
              onMouseLeave={hideTooltip}
            >
              <p>{getIcon(route.label)}</p>
              <p>&nbsp;</p>
              <p>{route.label}</p>
            </div>
          </li>
        );
      })}
      <li className={`${styles.navItem} flatStyleShadow_NO_INTERACT`}>
        <DarkModeTile />
      </li>
    </ul>
  );

  const isCollapsed = (isSmall || screenSize === "sm") && !isTemporarilyExpanded;

  return (
    <>
      <CollapsedButton
        isCollapsed={isCollapsed}
        expandLabel={
          !getCurrentNavReplacementButton().label
            ? "Menu"
            : getCurrentNavReplacementButton().labeltext || "Close"
        }
        onClick={
          !getCurrentNavReplacementButton().label
            ? menuOpenHandle
            : () => {
                if (lastCallbackRef.current) {
                  lastCallbackRef.current();
                }
              }
        }
        showTooltip={showTooltip}
        hideTooltip={hideTooltip}
        inner={
          getCurrentNavReplacementButton().label ? (
            <span className={styles.menuIcon}>
              {getCurrentNavReplacementButton().label}
            </span>
          ) : (
            <span className={styles.menuIcon}>{getIcon("menu")}</span>
          )
        }
      />

      {(state === "mini" || state === "buttonOnly_mini") && (
        <div
          className={`${styles.bgCover} ${
            !isVisible || isAnimatingOut ? styles.hide : styles.show
          }`}
          onClick={triggerCollapseAnimation}
          onTouchStart={triggerCollapseAnimation}
        />


      )}
      
      {(state === "mini" || state === "buttonOnly_mini") && isVisible && (
        <div
          ref={navRef}
          className={`${styles.miniNav} 
              ${isCollapsed ? styles.collapsed : styles.expanded} 
              ${direction === "vertical" ? styles.vertical : ""} 
              ${isAnimatingIn ? styles.animatingIn : ""}
              ${isAnimatingOut ? styles.animatingOut : ""}
          `}
          onClick={(e) => e.stopPropagation()}
          onTouchStart={(e) => e.stopPropagation()}
        >
          {!isCollapsed && (
            <>
              <div className={`${styles.headerText}
                ${isAnimatingIn ? styles.animatingIn : ""}
                ${isAnimatingOut ? styles.animatingOut : ""}
              `}>
                <h2>Thanks for checking out my things</h2>
                <p>
                  The junk page is really just a testing spot. Feel free to
                  flick me a pm
                </p>
                <div className={styles.dividerContainer}>
                  <WigglyLine />
                </div>
              </div>
              {miniNavItems()}
            </>
          )}
        </div>
      )}
    </>
  );
};