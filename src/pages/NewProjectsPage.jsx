import React, { useEffect, useState } from "react";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import styles from "./Projects.module.scss";
import { Modal } from "../components/Modal";
import { useGlobalContext } from "../contexts/GlobalContext";
import { getRecentRepos } from "../utils/githubFetch";
import { useProjects } from "../contexts/ContentContext";
import { Thumbnail } from "../components/thumbnail";
import decor1 from "../assets/svgs/undraw_color-palette_5vtb.svg";
import useScreenSize from "../utils/screensize";
import getIcon from "../utils/Iconifier";
import { BouncyArrows } from "../components/UI_Extrasa/bouncyArrows";
import decor2 from "../assets/svgs/DrawKit_Vector_Illustrations_Video park.svg"
export const NewProjectPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProject, setSelectedProject] = useState(null);
    const { floatingNavisOnRight, setFloatingNavisOnRight } = useGlobalContext();
    const { getArticle, getListOfArticles } = useProjects();
    const screenSize = useScreenSize();
    const [githubProjects, setGithubProjects] = useState([]);
    const [githubError, setGithubError] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        getRecentRepos("2of").then((repos) => {
            if (repos.error) {
                setGithubError(repos.error);
                setGithubProjects([]);
            } else {
                setGithubProjects(repos);
                console.log(repos);
            }
            setIsLoading(false);
        });
    }, []);

    const handleOpenModal = (project) => {
        const fullProject = getArticle(project.name, "large");
        setFloatingNavisOnRight(true);
        setSelectedProject(
            fullProject || { ...project, extratext: "Unable to find full text, showing descriptor" }
        );
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setFloatingNavisOnRight(false);
        setSelectedProject(null);
    };

    const getModalButtons = (project) => [
        project.link && { name: project.link.text, link: project.link.url },
        { name: "View Details", onClick: () => alert("View Details Clicked") },
        { name: "Visit Website", link: "https://example.com" },
    ].filter(Boolean);

    const shortProjects = getListOfArticles();

    return (
        <div className={`${screenSize === "sm" ? styles.sm : styles.lg} ${screenSize !== "sm" ? "GenericPageContainer" : ""}`}>
            <section className={`${styles.sm_fp} `}>

                <div className={styles.textSection}>

        
                <h1 className={styles.title}>Projects</h1>
                {screenSize === "sm" ? (
                    <p className={styles.subtitle}>
                        Scroll down for <span className={styles.highlight}>projects</span> and{' '}
                        <span className={styles.highlight}>what not</span>.
                    </p>
                ) : (
                    <p className={styles.subtitle}>
                        Explore my work with <span className={styles.highlight}>Python</span> and{' '}
                        <span className={styles.highlight}>bold things</span>.
                        <img className={styles.headerImage} src={decor1} alt="decor" />
                    </p>
                )}


{screenSize === "sm" &&  
                 
           

                 <BouncyArrows />
                 
            }


</div>

                {screenSize === "sm" &&  (
                 
                <>
                
                <img className={styles.smHeaderImage} src={decor2} alt="decor" />
      
                
                </>)}
                {screenSize !== "sm" && <div className={styles.divider} />}

           
            </section>

            <div className={styles.ProjectContainer}>
                {shortProjects.map((project, id) => (
                    <div key={id} className={`${styles.ProjectCell} ${styles.sm_fp}`}>
                        <Thumbnail
                            data={getArticle(project.name)}
                            fullLinkCallBack={() => handleOpenModal(project)}
                            twoColumns={id === 0}
                            fullLink={true}
                            asFS={screenSize === "sm"}
                        />
                    </div>
                ))}
            </div>

            {selectedProject && (
                <Modal
                    component={
                        <ColumnWithSections
                            data={getArticle(selectedProject.name, "large")}
                            twoColumns={true}
                            fullLink={false}
                            AsArticle={true}
                            extratext={selectedProject.extratext}
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

            <section className={styles.sm_half}>
                <h1 className={styles.title}>Less Documented Projects...</h1>
                <p className={styles.subtitle}>These are actually just the most recent repos from the GitHub REST API...</p>
                {screenSize !== "sm" && <div className={styles.divider} />}
            </section>

            {githubProjects && (
                <div className={styles.ProjectContainer}>
                    {githubProjects.map((proj, id) => (
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

            <section className={styles.sm_half}>
                <h1 className={styles.title}>This is not all...</h1>
                <p className={styles.subtitle}>
                    Just find the rest on my GitHub {getIcon("github")} and Medium.
                </p>
                {screenSize !== "sm" && <div className={styles.divider} />}
            </section>
        </div>
    );
};
