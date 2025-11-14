import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles/LinksCard.module.scss";
import { FaEnvelope, FaGithub, FaProjectDiagram, FaUser } from "react-icons/fa";
import { StandardButton } from "../../UI/StandardLib/StandardButton.jsx";
import { FaUpwork } from "react-icons/fa6";
import TrackedGradientBG from "../../Background/TrackedGradientBg";
import FeatherTwoLayer from "../../Misc/FeatherTwoLayer";
import { DarkModeTile } from "../../UI/darkmodeTile.jsx";
import art from "../../../assets/Images/HTC_Heritage Library_Flying HighElement 5.png";
export const LinkCard = ({ links2 }) => {
  //   if (!links || links.length === 0) return null;
  const links = [
    { to: "/about", label: "About Me", icon: <FaUser /> },
    { to: "/proj", label: "Projects", icon: <FaUpwork /> },
    {
      to: "https://github.com/noahking",
      label: "GitHub",
      icon: <FaGithub />,
      external: true,
    },
    {
      to: "https://linkedin.com/in/noahking",
      label: "LinkedIn",
      external: true,
    },
  ];

  return (
    <div className={styles.linkCard}>
      {/* <TrackedGradientBG /> */}
      {/* <h2>That's not all...</h2> */}

      {/* <div className={styles.linkItem}>        <DarkModeTile/></div> */}

      <div className={styles.links}>
        {links.map((link, index) => {
          return (
            <div className={styles.linkItem}>
              <StandardButton
                type="featured"
                label={link.label}
                icon={link.icon}
                link={link.to}
                fillContainer
              />
            </div>
          );
        })}
        <div className={styles.linkItem}>
          {" "}
          <DarkModeTile />
        </div>
        <div className={`${styles.linkItem} ${styles.noInteract}`}>
          {" "}
          <img src={art} />
        </div>
      </div>
    </div>
  );
};
