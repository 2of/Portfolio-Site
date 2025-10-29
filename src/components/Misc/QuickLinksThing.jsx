import React, { useState } from "react";
import { useGlobalContext } from "../../contexts/GlobalContext";
import styles from "./styles/QuickLinksThing.module.scss";
import { FaGithub, FaLinkedin, FaEnvelope, FaGlobe } from "react-icons/fa";
import getIcon from "../../utils/Iconifier";

export const QuickLinksThing = () => {

    //todo is add links as prop...
  const { getLink } = useGlobalContext();
  const [expanded, setExpanded] = useState(false);


  // 
  const links = [
    { name: "github", icon: getIcon("github"), label: "GitHub" },
    { name: "linkedin", icon: getIcon("linkedin"), label: "LinkedIn" }, // Changed 'resume' to 'linkedin' for clarity
    { name: "resume", icon: getIcon("resume"), label: "Resume" },
    // { name: "website", icon: <FaGlobe />, label: "Website" },
  ];

  const makeHref = (name) => {
    const href = getLink(name);
    // make email clickable if needed
    if (name === "email" && href && !href.startsWith("mailto:")) {
      return `mailto:${href}`;
    }
    return href;
  };

  const handleMouseLeave = (e) => {
    setExpanded(false);
    
    // 👇️ THE FIX: Check if a child link is currently focused and blur it.
    const focusedElement = document.activeElement;
    if (e.currentTarget.contains(focusedElement) && focusedElement.tagName === 'A') {
      focusedElement.blur();
    }
  };

  return (
    <div
      className={`${styles.quickLinksThing} ${expanded ? styles.expanded : ""}`}
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={handleMouseLeave} // Use the new handler
      role="toolbar"
      aria-label="Quick links"
    >
      {links.map((link, i) => (
        <a
          key={link.name}
          href={makeHref(link.name)}
          className={styles.link}
          target={link.name === "email" ? "_self" : "_blank"}
          rel={link.name === "email" ? undefined : "noopener noreferrer"}
          aria-label={link.label}
        >
          <span className={styles.icon} aria-hidden>
            {link.icon}
          </span>
          <span className={styles.label}>{link.label}</span>
        </a>
      ))}
    </div>
  );
};