import React from "react";
import styles from "./Footer.module.scss";

export const FooterCell = ({ sz }) => {
  return (
    <div className={styles.footerMessage}>
      <p>
        Hi, this is my website, <a href="https://thingies.dev">thingies.dev</a>,{" "}
        <a href="https://github.com/2of" target="_blank" rel="noopener noreferrer">github.com/2of</a>.
        Feel free to flick me a PM.
      </p>
       <p>
        If I had things to put in the footer, they'd go here!
      </p>
    </div>
  );
};