import React, { useEffect, useState } from "react";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import styles from './Projects.module.scss';
import { Modal } from "../components/Modal";
import { useGlobalContext } from "../contexts/GlobalContext";
import { getRecentRepos } from "../utils/githubFetch";
import { TooltipProvider, useTooltip } from "../contexts/tooltip";
import { useProjects } from "../contexts/ContentContext";
import { Thumbnail } from "../components/thumbnail";

import useScreenSize from "../utils/screensize";
import getIcon from "../utils/Iconifier";
export const NewProjectPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { floatingNavisOnRight, setFloatingNavisOnRight } = useGlobalContext();
    const { getArticle, getListOfArticles } = useProjects(); // Use the context
    const screenSize = useScreenSize();
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
                console.log(repos);
            }
            setIsLoading(false); // Stop loading after the API call
        });
    }, []);

    const handleOpenModal = (project) => {
        // Use getArticle to fetch the full project details
        const fullProject = getArticle(project.name, "large");
        setFloatingNavisOnRight(true);
        setSelectedProject(fullProject ? fullProject : { ...project, extratext: 'Unable to find full text, showing descriptor' });
        setIsModalOpen(true);
    };

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

    // Get the list of short projects (small size) from the context
    const shortProjects = getListOfArticles();
    console.log(shortProjects)

    return (

        <div className={`${screenSize == "sm" ? styles.sm : styles.lg}
        ${screenSize == "sm" ? "" : "GenericPageContainer"}
        `}>



            <section className={`${styles.sm_fp} `}>
                <h1 className={styles.title}>Projects</h1>
                <p className={styles.subtitle}>
                    Explore my work with <span className={styles.highlight}>Python</span> and{' '}
                    <span className={styles.highlight}>bold ideas</span>.
                </p>

            </section>

            <div className={styles.ProjectContainer}>
                {shortProjects.map((project, id) => (
                    <div key={id} className={`${styles.ProjectCell} ${styles.sm_fp} `}>
                        <Thumbnail
                            data={getArticle(project.name)}
                            fullLinkCallBack={() => handleOpenModal(project)}
                            twoColumns={id === 0}
                            fullLink={true}
                            asFS={screenSize == "sm"}
                        />
                    </div>
                ))}
            </div>

            {/* Render the modal only if selectedProject is defined */}
            {selectedProject && (
                <Modal
                    component={
                        <ColumnWithSections
                            data={getArticle(selectedProject.name, "large")}
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


            <section className={`${styles.sm_half} `}>

                <h1 className={styles.title}>Less Documented Projects...</h1>
                <p className={styles.subtitle}>
                    These are actually just the most recent repos from the github rest api...
                </p>

            </section>

            {/* Handle error and loading states */}
            {githubprojects && (
                <div className={styles.ProjectContainer}>
                    {console.log(githubprojects)}
                    {githubprojects.map((proj, id) => (
                        <div key={id} className={`${styles.ProjectCell} ${styles.sm_fp}`}>
                            <Thumbnail
                                data={{
                                    title: proj.name,
                                    subtitle: proj.description,
                                }}
                                asFS={false}
                            />
                        </div>
                    ))}
               </div>
            )}

            <section className={`${styles.sm_half} `}>

                <h1 className={styles.title}>This is not all...</h1>
                <p className={styles.subtitle}>
                    just find the rest on my github {getIcon("github")} and medium
                </p>

            </section>

        </div>

    );
};