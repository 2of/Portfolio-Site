import React, { useEffect, useState } from "react";
import ColumnWithSections from "../components/Column/ColumnWithSections";
import styles from "./Catalogue.module.scss";
import { Modal } from "../components/Modal";
import { useGlobalContext } from "../contexts/GlobalContext";
import { getRecentRepos } from "../utils/githubFetch";
import { useProjects } from "../contexts/ContentContext";
import { Thumbnail } from "../components/thumbnail";
import decor1 from "../assets/svgs/undraw_color-palette_5vtb.svg";
import useScreenSize from "../utils/screensize";
import getIcon from "../utils/Iconifier";
import { BouncyArrows } from "../components/UI_Extrasa/bouncyArrows";
import decor2 from "../assets/svgs/DrawKit_Vector_Illustrations_Video park.svg";
import { Article } from "../components/Article/Article";
export const CataloguePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const { floatingNavisOnRight, setFloatingNavisOnRight } = useGlobalContext();
  const { getArticle, getArticleMetaData, getListOfArticles, getAllMetaData } =
    useProjects();
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
        // console.log(repos);
      }
      setIsLoading(false);
    });
  }, []);

  // const handleOpenModal2 = (project) => {
  //     const fullProject = getArticle(project.name, "large");
  //     console.log("full project ", fullProject)
  //     setFloatingNavisOnRight(true);
  //     setSelectedProject(
  //         fullProject || { ...project, extratext: "Unable to find full text, showing descriptor" }
  //     );
  //     setIsModalOpen(true);
  // };

  const handleOpenModal = (project) => {
    setIsModalOpen(true);
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFloatingNavisOnRight(false);
    setSelectedProject(null);
  };

  const getModalButtons = (project) =>
    [
      project.link && { name: project.link.text, link: project.link.url },
      { name: "View Details", onClick: () => alert("View Details Clicked") },
      { name: "Visit Website", link: "https://example.com" },
    ].filter(Boolean);

  const shortProjects = getAllMetaData();

  return (
    <div
      className={`${screenSize === "sm" ? styles.sm : styles.lg} ${
        screenSize !== "sm" ? "GenericPageContainer" : ""
      }`}
    >
      <section className={`${styles.sm_fp} `}>
        <div className={styles.textSection}>
          <h1 className={styles.title}>Main Showcase</h1>
          {screenSize === "sm" ? (
            <p className={styles.subtitle}>
              Scroll down for <span className={styles.highlight}>projects</span>{" "}
              and <span className={styles.highlight}>what not</span>.
            </p>
          ) : (
            <p className={styles.subtitle}>
              Small writeups for highlighted projects. Scroll further to see a
              raw list <span className={styles.highlight}></span>
              <img className={styles.headerImage} src={decor1} alt="decor" />
            </p>
          )}

          {screenSize === "sm" && <BouncyArrows />}
        </div>

        {screenSize === "sm" && (
          <>
            <img className={styles.smHeaderImage} src={decor2} alt="decor" />
          </>
        )}
        {screenSize !== "sm" && <div className={styles.divider} />}
      </section>

      <div className={styles.ProjectContainer}>
        {shortProjects
          .filter((project) => project.showcase)
          .map((project, id) => (
            <div key={id} className={`${styles.ProjectCell} ${styles.sm_fp}`}>
              <Thumbnail
                data={project}
                fullLinkCallBack={() => handleOpenModal(project)}
                twoColumns={id === 0}
                fullLink={true}
                type={screenSize === "sm" ? "mobile_fullscreen" : "large_thumb"}
                index={id}
              />
              {/* test */}
              {/* {project.showcase ? "yes" : "no"} */}
            </div>
          ))}
      </div>

      {selectedProject && (
        <Modal
          component={
            <Article
              // data={getArticle(selectedProject.name, "large")}
              // twoColumns={true}
              // fullLink={false}
              metadata={getArticleMetaData(selectedProject.name)}
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
      <section className={`${styles.sm_25} ${styles.smallheader}`}>
        <h1 className={styles.textSection}>Most Recent Github Commits</h1>
        <p className={styles.subtitle}>
          Is this here to fill space? Well... yeah it is, it's just the last 6
          or so from the rest API
        </p>
        {screenSize !== "sm" && <div className={styles.divider} />}

        {screenSize === "sm" && <BouncyArrows />}
      </section>
      {githubProjects && (
        <div className={styles.ProjectContainerDense}>
          {githubProjects.map((proj, id) => (
            <div key={id} className={`${styles.ProjectCell} ${styles.sm_25}`}>
              <Thumbnail
                size="small"
                randomcolor={true}
                data={{
                  title: proj.name,
                  subtitle: proj.description,
                  url: proj.url,
                }}
                fullLinkCallBack={() => navigate.to(project.url)}
                //   asFS={screenSize === "sm"}
                type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
              />
            </div>
          ))}

          <Thumbnail
            size="small"
            randomcolor={true}
            data={{
              title: "See All Repos",
              subtitle: "github.com/2of",
              url: "www.github.com/2of",
            }}
            fullLinkCallBack={() => navigate.to(project.url)}
            //   asFS={screenSize === "sm"}
            type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
          />
        </div>
      )}
      {/* <h2>See more</h2> */}
      <section className={`${styles.sm_25} ${styles.smallheader}`}>
        <h1 className={styles.textSection}>Notable University Work....</h1>
        <p className={styles.subtitle}>
          This is predominatly course work, however where I have expanded on
          course material is outlined
        </p>
        {screenSize !== "sm" && <div className={styles.divider} />}

        {screenSize === "sm" && <BouncyArrows />}
      </section>

      {/* {screenSize !== "sm" && <div className={styles.divider} />} */}

      <div className={styles.ProjectContainer}>
        {shortProjects
          .filter((project) => project.uniWorkShowcase)
          .map((project, id) => (
            <div key={id} className={`${styles.ProjectCell} ${styles.sm_half}`}>
              <Thumbnail
                data={project}
                fullLinkCallBack={() => handleOpenModal(project)}
                type={screenSize === "sm" ? "mobile_compact" : "large_thumb"}
              />
              {/* test */}
              {/* {project.showcase ? "yes" : "no"} */}
            </div>
          ))}
      </div>

      <section className={`${styles.sm_25} ${styles.smallheader}`}>
        <h1 className={styles.textSection}>Miscellaneous</h1>
        <p className={styles.subtitle}>
          This is predominatly course work, however where I have expanded on
          course material is outlined
        </p>
        {screenSize !== "sm" && <div className={styles.divider} />}

        {screenSize === "sm" && <BouncyArrows />}
      </section>

      {/* {screenSize !== "sm" && <div className={styles.divider} />} */}

      <div className={styles.ProjectContainer}>
        {shortProjects
          .filter((project) => project.name === "schemaOverview")
          .map((project, id) => (
            <div key={id} className={`${styles.ProjectCell} ${styles.sm_half}`}>
              <Thumbnail
                data={project}
                fullLinkCallBack={() => handleOpenModal(project)}
                twoColumns={id === 0}
                fullLink={true}
                asFS={screenSize === "sm"}
                type={screenSize === "sm" ? "mobile_compact" : "large_thumb"}
                //   asFS={false}
              />
              {/* test */}
              {/* {project.showcase ? "yes" : "no"} */}
            </div>
          ))}
      </div>
    </div>
  );
};
