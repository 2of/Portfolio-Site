import React, { useRef, useEffect, useState } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingNav from "./floatingNav";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Disclaimer } from "../../components/disclaimer";
import { DynamicNav } from "./MobileNav";
import useScreenSize from "../../utils/screensize";

const MainLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const { disableForPopup, disablePopupClickOffCallback } = useGlobalContext();
  const screenSize = useScreenSize();

  const normalizedKey = location.pathname === "/" ? "root" : location.pathname;

  const handleMainClick = () => {
    if (disableForPopup && disablePopupClickOffCallback) {
      disablePopupClickOffCallback();
    }
  };

  const [blurEffect, setBlurEffect] = useState(disableForPopup);

  useEffect(() => {
    setBlurEffect(disableForPopup);
  }, [disableForPopup]);

  const blurStyle = {
    filter: blurEffect ? "brightness(0.1) blur(24px)" : "none",
    pointerEvents: blurEffect ? "none" : "auto",
    overflow: "hidden",
    transition: "filter 0.3s ease-out, pointer-events 0s linear 0.3s",
  };

  return (
    <div className={styles.mainLayout}>
      <Disclaimer title={"🚧 🚧"} text={"Work in Progress"} />

      <main className={styles.mainContent} onClick={handleMainClick}>
      <TransitionGroup component={null}>
          <CSSTransition
            nodeRef={nodeRef}
            key={normalizedKey} // Use normalized key
            timeout={300}
            classNames={{
              enter: styles.pageTransitionEnter,
              enterActive: styles.pageTransitionEnterActive,
              exit: styles.pageTransitionExit,
              exitActive: styles.pageTransitionExitActive,
            }}
            appear={true} // Apply transition on initial mount
          >

{screenSize !== "sm" ? 



            <div ref={nodeRef} className={disableForPopup ? styles.disable : ""} 
            
            
       >
              <Outlet />
            </div>


: 

<div ref={nodeRef} className={disableForPopup ? styles.disable : ""} 
            
            
style={blurStyle}>
  <Outlet />
</div>

}


          </CSSTransition>
        </TransitionGroup>
      </main>

      {screenSize !== "sm" ? <FloatingNav /> : <DynamicNav />}
    
    </div>
  );
};

export default MainLayout;