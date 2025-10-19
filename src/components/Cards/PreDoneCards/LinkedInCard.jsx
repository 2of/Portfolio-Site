import React from "react";
import styles from "./LinkedinCard.module.scss";
import { FaLinkedin } from "react-icons/fa";
import { StandardButton } from "../../UI/StandardButton";
import getIcon from "../../../utils/Iconifier";

const LinkedinCard = ({ name, title, company, summary, profilePic, bannerPic, url }) => {
  return (
    <div className={styles.linkedinCard}>
      
      {/* Banner */}
      <div
        className={styles.banner}
        style={{ backgroundImage: `url(${bannerPic})` }}
      />

      <div className={styles.psuedoButtons}>
        <div className={styles.buttonsmall}></div>
        <div className={styles.buttonlong}></div>
        <div className={styles.buttonlong}></div>


      </div>
     <div className={styles.icon}>
          <FaLinkedin />
        </div>
      {/* Profile photo + icon */}
      <div className={styles.header}>
        <div className={styles.photoContainer}>
          <img src={profilePic} alt={`${name}'s profile`} className={styles.photo} />
        </div>

   
      </div>

      {/* Name / title / company */}
      <div className={styles.info}>
        <h2>{name}</h2>
        <p className={styles.title}>Current Role: {title}</p>
        {company && <p className={styles.company}>{company}</p>}
        {summary && <p className={styles.summary}>{summary}</p>}
      
          <div className={styles.filler}/>
      </div>


      {/* Footer */}
      <div className={styles.footer}>
        {/* <span className={styles.linkText}>View on LinkedIn</span> */}

         <StandardButton
                  label="View on LinkedIn"
                  tooltip="Open Linkedin Profile"
                  type="rounded_label"
                  icon={getIcon("linkedin")}
                  link={url}
                />


      </div>
    </div>
  );
};

export default LinkedinCard;