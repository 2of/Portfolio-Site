import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import styles from "./ShareDialog.module.scss";
import { StandardButton } from "../UI/StandardButton";
import getIcon from "../../utils/Iconifier";
import useScreenSize from "../../utils/screensize";
import { useGlobalContext } from "../../contexts/GlobalContext";

const socialMediaServices = [
  {
    name: "Twitter",
    icon: "twitter",
    baseUrl: "https://twitter.com/share?url=",
    descriptionParam: "&text=",
  },
  {
    name: "Facebook",
    icon: "facebook",
    baseUrl: "https://www.facebook.com/sharer/sharer.php?u=",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    baseUrl: "https://www.linkedin.com/shareArticle?mini=true&url=",
    descriptionParam: "&summary=",
  },
  {
    name: "Reddit",
    icon: "reddit",
    baseUrl: "https://www.reddit.com/submit?url=",
    descriptionParam: "&title=",
  },
  {
    name: "Email",
    icon: "email",
    baseUrl: "mailto:?subject=Check%20this%20out!&body=",
  },
];

const ShareDialog = ({ onClose }) => {
  const screenSize = useScreenSize();
  const { shareSheetData } = useGlobalContext();

  const urlFromContext = shareSheetData?.URL || "";
  const titleFromContext = shareSheetData?.title || "Share something exciting";
  const descriptionFromContext = shareSheetData?.initialDescription || "";

  const [shareUrl, setShareUrl] = useState(urlFromContext);
  const [description, setDescription] = useState(descriptionFromContext);
  const [animatingOut, setAnimatingOut] = useState(false); // New state for animation

  useEffect(() => {
    setShareUrl(urlFromContext);
    setDescription(descriptionFromContext);
  }, [urlFromContext, descriptionFromContext]);

  // Effect to handle animation out
  useEffect(() => {
    let animationTimer;
    if (animatingOut) {
      // Assuming a 300ms animation duration for the fade-out
      animationTimer = setTimeout(() => {
        onClose();
      }, 300); // This duration should match your CSS transition duration
    }
    return () => clearTimeout(animationTimer);
  }, [animatingOut, onClose]);

  if (!shareUrl && !animatingOut) return null; // Only hide if not animating out and no shareUrl

  const handleCloseAnimation = () => {
    setAnimatingOut(true);
  };

  const handleClick = (e) => {
    e.stopPropagation();
  };

  const handleShareClick = (service) => {
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedDescription = encodeURIComponent(description);
    let shareLink = `${service.baseUrl}${encodedUrl}`;

    if (service.descriptionParam && description) {
      shareLink += `${service.descriptionParam}${encodedDescription}`;
    }

    window.open(shareLink, "_blank");
    handleCloseAnimation(); // Call animation out instead of direct close
  };

  const handleCopyLink = () => {
    const textToCopy = description ? `${shareUrl}\n\n${description}` : shareUrl;
    navigator.clipboard.writeText(textToCopy);
    alert("Link and description copied to clipboard!");
    handleCloseAnimation(); // Call animation out instead of direct close
  };

  return ReactDOM.createPortal(
    <div
      className={`${styles.overlay} ${
        animatingOut ? styles.overlayAnimatingOut : ""
      }
    
    ${
        screenSize === "sm" ? styles.hide : ""
      }`}
      onClick={handleCloseAnimation}
    >
      <div
        className={`${styles.dialog} ${
          screenSize === "sm" ? styles.sm : styles.fulldialogue
        } flatStyleShadow_NO_INTERACT ${
          animatingOut ? styles.dialogAnimatingOut : ""
        }`}
        onClick={handleClick}
      >
       
        <h2>{titleFromContext}</h2>

        <div className={styles.inputGroup}>
          <label htmlFor="share-url">Link to Share:</label>
          <input
            id="share-url"
            type="text"
            value={shareUrl}
            onChange={(e) => setShareUrl(e.target.value)}
            className={styles.urlInput}
          />
        </div>

        <div className={styles.inputGroup}>
          <label htmlFor="share-description">Description (Optional):</label>
          <textarea
            id="share-description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className={styles.descriptionInput}
            rows="4"
            placeholder="Add a short description or message..."
          />
        </div>

        <div className={styles.socialIcons}>
          {socialMediaServices.map((service) => (
            <button
              key={service.name}
              className={styles.socialIconButton}
              onClick={() => handleShareClick(service)}
              aria-label={`Share on ${service.name}`}
            >
              {getIcon(service.icon)}
            </button>
          ))}
        </div>

        <div className={styles.actions}>
          <StandardButton
            label="Clipboard"
            callback={handleCopyLink}
            icon={getIcon("copy")}
            type="article"
            tooltip="Clipboard"
          />

          <StandardButton
            label="Close"
            callback={handleCloseAnimation} // Call animation out
            type="article"
            className={styles.closeButton}
          />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ShareDialog;
