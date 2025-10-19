import React from "react";
import styles from "./AboutCard.module.scss";
import { StandardButton } from "../../UI/StandardButton";
import { FaExternalLinkAlt } from "react-icons/fa";
import TrackedGradientBG from "../../Background/TrackedGradientBg";
import { useModal } from "../../../contexts/ModalContext";

const AboutCard = ({
  name = "Hi, I forgot to pass in my props",
  subtitle = "And I didnt know what ot write for placeholders",
  about = "Hi Mum!",
  qualifications = [],
  heroImage,
  cvLink = "https://yourcvlink.com",
  tags1,
  tags1title,
}) => {
  const { showModal } = useModal();

  const openModalForDescr = ({ content }) => {
    showModal({
      title: "overflowtext",
      content: content,
      size: "medium",
    });
  };
  return (
    <div className={styles.aboutCard}>
      <div
        className={styles.hero}
        // style={{ backgroundImage: `url(${heroImage})` }}
      >
        {/* <TrackedGradientBG />*/}
        <div className={styles.overlay}>
          <div className={styles.textBlock}>
            <h2 className={styles.name}>{name}</h2>
            <p className={styles.subtitle}>{subtitle}</p>
            {qualifications?.length > 0 && (
              <div className={styles.qualifications}>
                {qualifications.map((q, i) => (
                  <span key={i} className={styles.qualTag}>
                    {q}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className={styles.body}>
        <div className={styles.spacer} />
        <p
          className={styles.about}
          onClick={() =>
            openModalForDescr({
              content: (
                <>
                  <p style={{ fontSize: "1rem" }}>Full Text:</p>{" "}
                  <p style={{ fontSize: "1.5rem" }}>{about}</p>{" "}
                </>
              ),
            })
          }
        >
          {about}
        </p>
        <div className={styles.spacer} />
        {tags1title && <h4>{tags1title} </h4>}
        {tags1 && (
          <div className={styles.tags}>
            {tags1.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className={styles.footer}>
        <StandardButton
          label="View CV"
          tooltip="Open my CV"
          type="rounded_label"
          icon={<FaExternalLinkAlt />}
          link={cvLink}
        />
      </div>
    </div>
  );
};

export default AboutCard;
