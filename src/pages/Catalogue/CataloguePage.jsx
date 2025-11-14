import React, { useState, useEffect } from "react";
import styles from "./Pagestyle.module.scss";
import text from "../../../public/assets/text/texts.json";
import {
  ScrollableVerticalView,
  Section,
} from "../../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView";
import { useProjects } from "../../contexts/ContentContext";
import { getProjURL } from "../../utils/getURL";
import { useScreenSize } from "../../contexts/ScreenSizeProvider";
import { useModal } from "../../contexts/ModalContext";
import { getRecentRepos } from "../../utils/githubFetch";
import {
  CatalogueGithubSection,
  CatalogueHeroSection,
} from "./CatalogueSections";
import { RichTabShowCaseView } from "../../components/Containers/RichTabShowcaseView";
import { RichTabData } from "../../assets/TextAssets/ShowCaseTabRich";
import getIcon from "../../utils/Iconifier";
import LargeThumbCard from "../../components/Cards/CardLarge";
import Loader from "../../components/UI/StandardLib/Loader.jsx";
import {
  CatalogueLargeTextHeader,
  CatalogueMainHeaderMobile,
  CatalogueRegularTextHeader,
  CatalogueStandardHeaderMobile,
} from "./CatalogueHeaders";
import { TitleCard } from "../../components/Cards/TitleCard";
import {
  CatalogueCardCompact,
  CatalogueCardLarge,
} from "../../components/Cards/CatalogueCards";
import { Divider } from "../../components/UI/Divider";
import { PagedScrollContainer } from "../../components/Containers/Scroll/ScrollableViews/TikTokView";
import { BouncyArrows } from "../../components/UI/DiscreteComponents/bouncyArrows.jsx";
import { Thumbnail } from "../../components/UI/thumbnail.jsx";
import { Article } from "../../components/Article/Article";

export const CataloguePage_UP = () => {
  const { getAllMetaData, getMetadata } = useProjects();
  const shortProjects = getAllMetaData();
  const screenSize = useScreenSize();
  const { modalState, showModal, hideModal, modalVisible } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  const showcaseProjects = getMetadata({ which: "feat" });
  const uniProjects = getMetadata({ which: "uni" });
  const miscProjects = shortProjects.filter((p) => p.misccategory);

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

  const handleModalOpen = (metadata) => {
    showModal({
      size: "large",
      floatnav: true,
      content: <Article metadata={metadata} />,
    });
  };

  const renderMobileCard = (project, id, mobile) => {
      const bgImage = project.details?.thumbbg;
    
        return (
          <div key={id} bgImage={bgImage} className={`${styles.ProjectCell} `}>
            <Thumbnail
              data={project}
              fullLinkCallBack={() => handleModalOpen(project)}
              twoColumns={id === 0}
              fullLink={true}
              type={screenSize === "sm" ? "mobile_fullscreen" : "large_thumb"}
              index={id}
            />
          </div>
        );}

  const renderCard = (
    project,
    id,
    { compact = false, EntireCardClickable = false } = {},
  ) => {
    const bgImage = project.details?.thumbbg;

    return (
      <>
        {compact ? (
          <div
            key={id}
            bgImage={bgImage}
            className={`${styles.ProjectCell} ${project.large && styles.doublewide}`}
          >
            <CatalogueCardCompact
              data={project.details}
              icon={getIcon("test")}
              isdouble={project.large || false}
              to={
                project.details.externalLink ||
                project.details.internalLink ||
                getProjURL(project.name)
              }
              swapsides={id % 2 === 0}
              EntireCardClickable={EntireCardClickable}
              compact={compact}
              isExternal={project.externalLink || false}
            />
          </div>
        ) : (
          <div
            key={id}
            bgImage={bgImage}
            className={`${styles.ProjectCell} ${styles.twobytwo}`}
          >
            <CatalogueCardLarge
              data={project.details}
              icon={getIcon("test")}
              isdouble={project.large || false}
              to={
                project.details.externalLink ||
                project.details.internalLink ||
                getProjURL(project.name)
              }
              swapsides={id % 2 === 0}
              EntireCardClickable={EntireCardClickable}
              compact={compact}
              isExternal={project.externalLink || false}
            />
          </div>
        )}
      </>
    );
  };

  const MobileView = () => {

  return ( 

    
<PagedScrollContainer staggerStart borders>

    <div sectionHeight="half" key="standard-header-1">
        <CatalogueMainHeaderMobile />
        {/*<h1>test</h1>*/}
    </div>
      {showcaseProjects.map((project, i) => (
        <div key={`showcase-${i}`} bgImage={project.details?.bgimage}>
          {renderMobileCard(project, i)}
        </div>
      ))}
      <div sectionHeight="half" key="standard-header-1">
        <CatalogueStandardHeaderMobile
          title="Notable Uni Work"
          subtitle={"It's pretty well documented"}
          customComponent={<BouncyArrows direction="down" />}
          showArrows
        />
      </div>
      {/* <StandardHeaderMobile title="Title"/> */}
      {uniProjects.map((project, i) => (
        <div key={`uni-${i}`} bgImage={project.details?.bgimage}>
          {renderMobileCard(project, i)}
        </div>
      ))}
    </PagedScrollContainer>)
  };

  const DesktopView = () => {
    return (
      <ScrollableVerticalView trackScrollPercent staggerStart >
        <Section>{/* <Divider variant="double" />*/}</Section>
          {/*<Section>*/}
          {/*    <Divider variant="double" />*/}
          {/*</Section>*/}

          {/*/!*<Section >*!/*/}
          {/*    <CatalogueHeroSection text={text} />*/}
          {/*</Section>*/}

          {/*<Section>*/}
          {/*    <Divider variant="double" />*/}
          {/*</Section>*/}

          <Section
          color=""
          // sticky={true}
          Header={() => (
            <CatalogueLargeTextHeader text1="featured" highlight="projects" />
          )}
        >
          <RichTabShowCaseView data={RichTabData} />
        </Section>




        <Section>
          <Divider variant="double" />
        </Section>

        <Section
          color=""
      
          Header={() => (
            <CatalogueRegularTextHeader
              text1="a few more "
              highlight="interesting"
              text2="projects"
            />
          )}
        >
          <div className={styles.LargeThumbGrid}>
            {showcaseProjects.slice(0, 3).map(renderCard)}
            <div className={`${styles.ProjectCell} ${styles.twobytwo}`}>
              <TitleCard title={"Showcase Projects"} subtitle={"Mostly web"} />
            </div>

            {showcaseProjects.slice(3).map(renderCard)}
          </div>
        </Section>

        <Section>
          
          <Divider variant="double" />
        </Section>

        <Section
          color=""
          Header={() => (
            <CatalogueRegularTextHeader text1="uni" highlight="projects" />
          )}
        >
          <div className={styles.LargeThumbGrid}>
            {uniProjects.map((project, id) =>
              renderCard(project, id, {
                compact: true,
                EntireCardClickable: true,
              }),
            )}
          </div>
        </Section>

        <Section
          
          color="l1"
          Header={() => (
            <CatalogueRegularTextHeader
              text1="most recent"
              highlight="github"
              text2="commits"
            />
          )}
        >
          {isLoading ? (
            <Loader />
          ) : (
            <CatalogueGithubSection
              projects={githubProjects}
              screenSize={screenSize}
              styles_ref={styles}
            />
          )}
        </Section>

        <Section
          sticky
          Header={() => (
            <CatalogueRegularTextHeader
              text1="and then there was "
              highlight="miscellaneous"
            />
          )}
        >
          <div className={styles.LargeThumbGrid}>
            {/* {miscProjects.map(renderCard)}*/}

            {miscProjects.map((project, id) =>
              renderCard(project, id, {
                compact: true,
                EntireCardClickable: false,
              }),
            )}
          </div>
        </Section>

        <Section>
          <Divider variant="double" />
        </Section>
      </ScrollableVerticalView>
    );
  };

  return <>{screenSize === "sm" ? MobileView() : DesktopView()}</>;
};
