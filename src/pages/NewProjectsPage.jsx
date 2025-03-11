import React, { useEffect, useState } from "react";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import styles from './Projects.module.scss';
import shortProjects from '../assets/ProjectText/ShortProjectsContent.json';
import largeProjects from '../assets/ProjectText/FullProjectsContent.json';
import { Modal } from "../components/Modal"; 
import { useGlobalContext } from "../contexts/GlobalContext";
import { getRecentRepos } from "../utils/githubFetch";

export const NewProjectPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { floatingNavisOnRight, setFloatingNavisOnRight } = useGlobalContext();

    const handleOpenModal = (project) => {
        const fullProject = largeProjects.find(p => p.name === project.name);
        setFloatingNavisOnRight(true);
        setSelectedProject(fullProject ? fullProject : { ...project, extratext: 'Unable to find full text, showing descriptor' });
        setIsModalOpen(true);
    };

    // Initialize githubprojects as an empty array
    const [githubprojects, setGithubProjects] = useState([]);
    const [githubError, setGithubError] = useState(null); // New state to handle errors from the API
    const [isLoading, setIsLoading] = useState(true); // Track loading state

    useEffect(() => {
        getRecentRepos("2of").then((repos) => {
            if (repos.error) {
                setGithubError(repos.error); // Set error if one exists
                setGithubProjects([]); // Empty array in case of error
            } else {
                setGithubProjects(repos); // Set repos if success
                console.log(repos)
            }
            setIsLoading(false); // Stop loading after the API call
        });
    }, []);

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFloatingNavisOnRight(false);
        setSelectedProject(null); // Reset selected project when modal closes
    };

    const getModalButtons = (project) => {
        const buttons = [];
        if (project.link) {
            buttons.push({
                name: project.link.text,
                link: project.link.url,
            });
        }

        buttons.push(
            { name: "View Details", onClick: () => alert("View Details Clicked") },
            { name: "Visit Website", link: "https://example.com" }
        );

        return buttons;
    };

    return (
        <div className="GenericPageContainer">
            <h1 className={styles.title}>Projects</h1>
            <p className={styles.subtitle}>
                Explore my work with <span className={styles.highlight}>Python</span> and{' '}
                <span className={styles.highlight}>bold ideas</span>.
            </p>

            <div className={styles.ProjectContainer}>
                {shortProjects.map((project, id) => (
                    <div key={id} className={styles.ProjectCell} onClick={() => handleOpenModal(project)}>
                        <ColumnWithSections
                            data={project}
                            fullLinkCallBack={() => handleOpenModal(project)}
                            twoColumns={id === 0}
                            fullLink={true}
                            style="NewsPaper"
                        />
                    </div>
                ))}
            </div>

            {/* Render the modal only if selectedProject is defined */}
            {selectedProject && (
                <Modal
                    component={
                        <ColumnWithSections
                            data={selectedProject}
                            twoColumns={true}
                            fullLink={false}
                            AsArticle={true}
                            extratext={selectedProject.extratext} // Pass the extratext prop if it exists
                            style="modern"
                        />
                    }
                    onClose={handleCloseModal}
                    size="large" 
                    title={selectedProject.name}
                    buttons={getModalButtons(selectedProject)}
                    isOpen={isModalOpen} 
                />
            )}

            <h1 className={styles.title}>Other bits</h1>
            <p className={styles.subtitle}>
                There isn't enough time in the day to write up every single thing I put time into <span className={styles.highlight}>Python</span> and{' '}
                <span className={styles.highlight}>bold ideas</span>.
            </p>

            {/* Handle error and loading states */}
           
            <div className="ScrollSpacer"></div>
        </div>
    );
};
