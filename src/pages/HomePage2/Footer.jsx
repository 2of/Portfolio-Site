import React from "react";
import styles from "./Footer.module.scss"; // Updated SCSS import
import { useGlobalContext } from "../../contexts/GlobalContext";

export const FooterCell = ({ sz, scrollPosition }) => {
    const { getLink } = useGlobalContext();

    return (
        <div className={sz === "sm" ? styles.sm : styles.lg}>
            <p className={styles.disclaimer}>
                🚀 This is just my fun site—feel free to look around! 🕵️‍♂️🔍  
                It's mostly for fun. The whole thing is built from scratch in React ⚛️  
                with pretty minimal extra libraries. 📦✨  
            </p>

            <h3 className={styles.workInProgress}>
                🎭 It's a **work in progress**—some parts (like project writeups) use AI-generated filler content.  
            </h3>

            <p className={styles.consoleInfo}>
                🖥️ I'm actually pumping **a bunch** into the console 📜 just to show how things work.  
                There are **providers for everything**—trust me, it's all in there. 😆🔌  
            </p>

            <p className={styles.sourceCode}>
                🔗 The **source code** is up on **GitHub**! 🏗️👨‍💻  
                You can check it out here:  
                <a 
                    href="https://github.com/2of/Portfolio-site" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className={styles.link} 
                >
                    github.com/2of/Portfolio-site
                </a> 🚀🔗
            </p>
        </div>
    );
};