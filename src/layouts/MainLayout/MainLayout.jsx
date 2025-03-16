import React, { useRef } from "react";
import styles from "./MainLayout.module.scss";
import { Outlet, useLocation } from "react-router-dom";
import { TransitionGroup, CSSTransition } from "react-transition-group";
import FloatingNav from "./floatingNav";
import { useGlobalContext } from "../../contexts/GlobalContext";
const MainLayout = () => {
  const location = useLocation();
  const nodeRef = useRef(null);
const {    disableForPopup, setDisableForPopUp} = useGlobalContext() 
  return (
    <div className={styles.mainLayout}>
      <main className={styles.mainContent}>

        {/* <Outlet/> */}
        <TransitionGroup component={null}>
          {/* Apply transition only to the outlet content */}
          <CSSTransition
            nodeRef={nodeRef}
            key={location.pathname}
            timeout={300}
            classNames={{
              enter: styles.pageTransitionEnter,
              enterActive: styles.pageTransitionEnterActive,
              exit: styles.pageTransitionExit,
              exitActive: styles.pageTransitionExitActive,
            }}
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
