import React, { useRef } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingNav from "./floatingNav";
import { useGlobalContext } from "../../contexts/GlobalContext";
import { Disclaimer } from "../../components/disclaimer";

const MainLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
  const { disableForPopup } = useGlobalContext();

  // Normalize the key for the root route
  const normalizedKey = location.pathname === "/" ? "root" : location.pathname;

  return (
    <div className={styles.mainLayout}>
             <Disclaimer
        title={"🚧 🚧"}
        text={"Work in Progress"}>

          
        </Disclaimer>
      <main className={styles.mainContent}>
 
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
            <div ref={nodeRef} className={disableForPopup ? styles.disable : ""}>
              <Outlet />
            </div>
          </CSSTransition>
        </TransitionGroup>

        <FloatingNav />
      </main>
    </div>
  );
};

export default MainLayout;