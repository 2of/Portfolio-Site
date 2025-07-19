
import React, { useState } from "react";
import styles from "./Catalogue.module.scss";

import { ScrollableVerticalView,Section } from "../components/Scroll/ScrollableViews/ScrollableVerticalView";
import { useProjects } from "../contexts/ContentContext";



import { Thumbnail } from "../components/thumbnail";
import useScreenSize from "../utils/screensize";
import { Modal } from "../components/Modal";
import { Article } from "../components/Article/Article";
import { PagedScrollContainer } from "../components/Scroll/ScrollableViews/TikTokView";
import { BouncyArrows } from "../components/UI/bouncyArrows";
import { getRecentRepos } from "../utils/githubFetch";
import { useEffect } from "react";
import Loader from "../components/Loader";
import getIcon from "../utils/Iconifier";

export const CataloguePage = () => {
  const { getAllMetaData } = useProjects();
  const shortProjects = getAllMetaData();
  const screenSize = useScreenSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetadata, setActivemetadata] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);

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

  const handleOpenModal = (metadata) => {
    setIsModalOpen(true);
    setActivemetadata(metadata);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setActivemetadata(null);
  };

  const showcaseProjects = shortProjects.filter((p) => p.showcase);
  const uniProjects = shortProjects.filter((p) => p.uniWorkShowcase);
  const miscProjects = shortProjects.filter((p) => p.misccategory);

  const renderThumb = (project, id) => {
    const bgImage = project.details?.thumbbg;

    return (
      <div
        key={id}
        bgImage={bgImage}
        className={`${styles.ProjectCell} ${styles.sm_fp}`}
      >
        <Thumbnail
          data={project}
          fullLinkCallBack={() => handleOpenModal(project)}
          twoColumns={id === 0}
          fullLink={true}
          type={screenSize === "sm" ? "mobile_fullscreen" : "large_thumb"}
          index={id}
        />
      </div>
    );
  };

  const RenderGithubs = (projs) => {
    return (
      <div className={styles.ProjectContainerDense}>
        {githubProjects.map((proj, id) => (
          <div key={id} className={`${styles.ProjectCell} ${styles.sm_25}`}>
            <Thumbnail
              size="small"
              randomcolor={true}
              data={{
                title: proj.name,
                subtitle: proj.description,
                ext_url: proj.url,
              }}
              // fullLinkCallBack={() => navigate(proj.url)}
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
            ext_url: "www.github.com/2of",
          }}
          // fullLinkCallBack={() => navigate.to(project.url)}
          //   asFS={screenSize === "sm"}
          type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
        />
      </div>
    );
  };

  const Header1 = () => (
    <div className={styles.MainHeader}>
      <h1 className={styles.title}> ★ Featured Work</h1>
      <p className={styles.subtitle}>
        Small writeups for highlighted projects. Scroll further to see a raw
        list
        {/* <img className={styles.headerImage} src={decor2} alt="decor" /> */}
      </p>
    </div>
  );

  const StandardHeaderDesktop = ({ title, subtitle, icon }) => (
    <div className={styles.StandardHeaderDesktop}>
      <h1 className={styles.title}>
        {icon} {title}
      </h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );

  const StandardHeaderMobile = ({
    title,
    subtitle,
    customComponent,
    bgImage,
  }) => (
    <div className={styles.StandardHeaderMobileWrapper}>
      {bgImage && (
        <div
          className={styles.headerBg}
          style={{ backgroundImage: `url(${bgImage})` }}
        />
      )}
      <div className={styles.StandardHeaderMobile}>
        <h2 className={styles.title}>{title}</h2>
        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
        {customComponent}
      </div>
    </div>
  );

  const MainHeaderMobile = () => {
    return (
      <div className={styles.MainHeaderMobileWrapper}>
        <div className={styles.ArcSVGWrapper}>
          <svg viewBox="0 0 300 100" className={styles.CurvedTextSVG}>
            <defs>
              <path
                id="curve"
                d="M 10,90 A 140,90 0 0,1 290,90"
                fill="transparent"
              />
            </defs>
            <text width="100%" className={styles.CurvedText}>
              <textPath
                xlinkHref="#curve"
                startOffset="50%"
                textAnchor="middle"
              >
                ★ Featured Work ★
              </textPath>
            </text>
          </svg>
        </div>

        <p className={styles.heroSubtitle}>A selection. Scroll to explore.</p>

        <BouncyArrows numArrows={3} direction="down" speed="normal" />
      </div>
    );
  };
  const renderMobileView = () => (
    <PagedScrollContainer staggerStart>
      <div sectionHeight="half" key="standard-header-1">
        <MainHeaderMobile />
      </div>
      {showcaseProjects.map((project, i) => (
        <div key={`showcase-${i}`} bgImage={project.details?.bgimage}>
          {renderThumb(project, i)}
        </div>
      ))}
      <div sectionHeight="half" key="standard-header-1">
        <StandardHeaderMobile
          title="Notable Uni Work"
          subtitle={"It's pretty well documented"}
          customComponent={<BouncyArrows direction="down" />}
          showArrows
        />
      </div>
      {/* <StandardHeaderMobile title="Title"/> */}
      {uniProjects.map((project, i) => (
        <div key={`uni-${i}`} bgImage={project.details?.bgimage}>
          {renderThumb(project, i)}
        </div>
      ))}
    </PagedScrollContainer>
  );

  const renderDesktopView = () => (
    <ScrollableVerticalView staggerStart>
      <Section Header={() => <Header1 />}>
        <div className={styles.LargeThumbGrid}>
          {showcaseProjects.map(renderThumb)}
        </div>
      </Section>
      <Section
        Header={() => (
          <StandardHeaderDesktop
            title={"Notable Uni Bits"}
            subtitle={"It's ... mostly well documented"}
            icon={getIcon("school")}
          />
        )}
      >
        <div className={styles.LargeThumbGrid}>
          {uniProjects.map(renderThumb)}
        </div>
      </Section>
      <Section
        Header={() => (
          <StandardHeaderDesktop
            title={"Most Recent Github Commits"}
            subtitle={"It's ... mostly well documented"}
            icon={getIcon("Github")}
          />
        )}
      >
        {isLoading ? <Loader /> : <RenderGithubs projs={githubProjects} />}
      </Section>

      <Section
        Header={() => (
          <StandardHeaderDesktop
            title={"Miscellaneous Bits"}
            subtitle={"It's ... also somewhat well documented"}
            icon={getIcon("tools")}
          />
        )}
      >
        <div className={styles.LargeThumbGrid}>
          {miscProjects.map(renderThumb)}
        </div>
      </Section>
    </ScrollableVerticalView>
  );
  return (
    <>
      {isModalOpen && (
        <Modal
          component={<Article metadata={activeMetadata} />}
          onClose={handleCloseModal}
          size="large"
          title="test"
          isOpen={isModalOpen}
        />
      )}
      {screenSize === "sm" ? renderMobileView() : renderDesktopView()}
    </>
  );
};
