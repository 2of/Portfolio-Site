import React from "react";
import styles from "./styles/ProjectCard.module.scss";
import getIcon from "../../utils/Iconifier";
import { useModal } from "../../contexts/ModalContext";
import { Article } from "../Article/Article";
import { useProjects } from "../../contexts/ContentContext";
import { Navigate, useNavigate } from "react-router-dom";
import { useNavStack } from "../../contexts/NavStackContext";

const ProjectCard = ({
  image,
  tags = [],
  title,
  subtitle,
  description,
  authorString,
  icon,
  link,
  background = "standardbg",
  id
}) => {
  const { showModal } = useModal();
const { getArticle, getListOfArticles, getArticleMetaData } = useProjects();
const navigate = useNavigate()
  const openModal = (articlename) => {
    showModal({
      // title: "blah blah",
      size: "large",
      floatnav: true,
      content: (
        <Article
          metadata={getArticleMetaData(id)}
          // style="modern"
          // topDivideDouble={true}
          // twoColumns={true}
          // AsArticle={true}
        />
      ),
    });
  };

  const handleclick = () => { 
    if (link) { 
navigate(link);
    } else { 
      openModal();
    }


  }

  const bgStyle =
    background === "standardbg"
      ? styles.standardbg
      : { background: background };

  return (
    <div
      //   href={link}
      //   target="_blank"
      //   rel="noopener noreferrer"
      className={`${styles.card} ${
        background === "standardbg" ? styles.standardbg : ""
      }`}
      style={background !== "standardbg" ? bgStyle : {}}
    >
      {image && (
        <div className={styles.imageWrapper}>
          <img src={image} alt={title} className={styles.image} />
          {tags?.length > 0 && (
            <div className={styles.tags}>
              {tags.map((tag, i) => (
                <span key={i} className={styles.tag}>
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>
      )}

      <div className={styles.content}>
        <div className={styles.header}>
          <div className={styles.titleGroup}>
            <h3 onClick={handleclick}>
              {title}
              {getIcon("right")}
            </h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          {icon && <div className={styles.icon}>{icon}</div>}
        </div>

        {description && <p className={styles.description}>{description}</p>}

        {authorString && <span className={styles.author}>{authorString}</span>}

        {!image && tags?.length > 0 && (
          <div className={styles.tagsNoImage}>
            {tags.map((tag, i) => (
              <span key={i} className={styles.tag}>
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
