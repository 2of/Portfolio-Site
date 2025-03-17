import React from "react";
import styles from "./thumbnail.module.scss";
import getIcon from "../utils/Iconifier";

export const Thumbnail = ({ data, fullLinkCallBack, asFS = true }) => {
    // Define the inline style for the background image

    const handleClick = () => {

    }
    const containerStyle = data.bgimage
        ? { backgroundImage: `url(${data.bgimage})`, backgroundSize: "cover", backgroundPosition: "center" }
        : {};

    return (
        <div className={`${!asFS ? styles.smallContainer : styles.fs} ${!asFS ? "flatStyleShadow" : ""}`} style={containerStyle} 
        onClick={fullLinkCallBack}>
            {/* Cover div that fades out on hover */}
            <div className={styles.cover}></div>

            {/* <div className={styles.popOver}>

                GO
            </div> */}

            {/* <div className={styles.icon}>{getIcon("star")}</div> */}
            <p className={styles.toprighticon}>{getIcon("star")}</p>
            <h2 className={styles.title}>{data.title}</h2>
            <p className={styles.subtitle}>{data.subtitle}</p>
            {data.tools &&

                <ul className={styles.PillContainer}>
                    {data.tools.map((p, i) => (

                        <li className={styles.pill} key={i}>
                            {p}
                        </li>
                    ))}

                </ul>}
            <div className={styles.linkContainer}>
                <span className={styles.link} onClick={fullLinkCallBack}>
                    Open Article
                </span>
            </div>
        </div>
    );
};