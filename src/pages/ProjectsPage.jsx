import React, { useState, useEffect } from 'react';
import styles from './ProjectsPage.module.scss';
import projects from '../assets/projects.json';
import { DefaultProjPage } from './defaultProjPage';
import defaultImage from '../assets/Images/default.png';

export const ProjectsPage = () => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false); // Track closing state

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true); // Open the modal
  };

  const handleCloseModal = () => {
    setIsClosing(true); // Start the closing animation
    setTimeout(() => {
      setIsModalOpen(false); // Close the modal
      setSelectedProject(null); // Reset the selected project
      setIsClosing(false); // Reset the closing state
    }, 300); // Match the duration of the modal's transition
  };

  const handleImageError = (e) => {
    e.target.src = defaultImage; // Use the default image if the project image fails to load
  };

  return (
    <div className={`${styles.projectsPage} ${isModalOpen ? styles.modalOpen : ''}`}>
      <h1 className={styles.title}>Projects</h1>
      <p className={styles.subtitle}>
        Explore my work with <span className={styles.highlight}>Python</span> and{' '}
        <span className={styles.highlight}>bold ideas</span>.
      </p>
      <div className={styles.grid}>
        {projects.map((project) => {
          let projectImage;
          try {
            projectImage = new URL(`../assets/Images/${project.image}`, import.meta.url).href;
          } catch (error) {
            projectImage = defaultImage;
          }

          return (
            <div
              key={project.id}
              className={styles.card}
              onClick={() => handleProjectClick(project)}
            >
              <img
                src={projectImage}
                alt={project.Title}
                className={styles.cardImage}
                onError={handleImageError}
              />
              <h2 className={styles.cardTitle}>{project.Title}</h2>
              <p className={styles.cardSubtitle}>{project.Subtitle}</p>
              <div className={styles.cardTechnologies}>
                {project.Technologies.map((tech, index) => (
                  <span key={index} className={styles.technologyBadge}>
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {isModalOpen && (
        <div
          className={`${styles.modal} ${isClosing ? styles.closing : styles.open}`} // Apply open or closing class
        >
          <div className={styles.modalContent}>
            <DefaultProjPage project={selectedProject} onClose={handleCloseModal} />
          </div>
        </div>
      )}
    </div>
  );
};