import React, { useState } from "react";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import styles from "./Carousel.module.scss";
import shortProjects from "../assets/ProjectText/ShortProjectsContent.json";

export const Carousel = () => { 
    const [currentHighlighted, setCurrentHighlight] = useState(0);

    const fwd = () => { 
        setCurrentHighlight((prev) => (prev + 1) % shortProjects.length);
    };

    return (
        <div className="GenericPageContainer">
            <div 
                className={styles.projCaroContainer} 
                style={{ transform: `translateX(-${currentHighlighted * 32}vw)` }} // Shift container
            >
                {shortProjects.map((project, id) => (
                    <div 
                        key={id} 
                        className={`${styles.ProjectCell} ${id === currentHighlighted ? styles.ActiveProject : styles.InactiveProject}`} 
                    >
                        <ColumnWithSections
                            data={project}
                            fullLinkCallBack={() => console.log("Open Modal")}
                            twoColumns={id === 0}
                            fullLink={true}
                            style="NewsPaper"
                        />
                    </div>
                ))}
            </div>
            <button className={styles.fwd} onClick={fwd}>fwd</button>
        </div>
    );
};