import React, { useState } from "react";
import styles from "./Catalogue.module.scss";

import {
  ScrollableVerticalView,
  Section,
} from "../components/Scroll/ScrollableViews/ScrollableVerticalView";
import { useProjects } from "../contexts/ContentContext";

import { getProjURL } from "../utils/getURL";

import { Thumbnail } from "../components/thumbnail";
// import useScreenSize from "../utils/screensize";
import { useScreenSize } from "../contexts/ScreenSizeProvider";
import { Modal } from "../components/Modal";
import { Article } from "../components/Article/Article";
import { PagedScrollContainer } from "../components/Scroll/ScrollableViews/TikTokView";
import { BouncyArrows } from "../components/UI/bouncyArrows";
import { getRecentRepos } from "../utils/githubFetch";
import { useEffect } from "react";
import Loader from "../components/Loader";
import getIcon from "../utils/Iconifier";
import LargeThumbCard from "../components/Cards/CardLarge";
import { AnimatedHeader } from "../components/UI/TypeWriterHeader";
import GlassPushOverlay from "../components/UI/GlassContainer";
import SmallCard from "../components/Cards/SmallCard";
import text from "../../public/assets/text/texts.json";
import TrackedGradientBG from "../components/Background/TrackedGradientBg";
import { useModal } from "../contexts/ModalContext";
import { TitleCard } from "../components/Cards/TitleCard";
export const CataloguePage = () => {
  const { getAllMetaData, getMetadata } = useProjects();
  const shortProjects = getAllMetaData();
  const screenSize = useScreenSize();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMetadata, setActivemetadata] = useState({});

  const [isLoading, setIsLoading] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);

  const { modalState, showModal, hideModal, modalVisible } = useModal();

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

  const newhandleOpenModal = (metadata) => {
    showModal({
      // title: "blah blah",
      size: "large",
      floatnav: true,

      content: (
        <Article
          metadata={metadata}
          // style="modern"
          // topDivideDouble={true}
          // twoColumns={true}
          // AsArticle={true}
        />
      ),
    });
  };

  const showcaseProjects = getMetadata({ which: "feat" });
  const uniProjects = getMetadata({ which: "uni" });
  const miscProjects = shortProjects.filter((p) => p.misccategory);

  const renderCard = (project, id) => {
    /// render thumb used for legacy (mobile view) currently. Cards for dektstop
    const bgImage = project.details?.thumbbg;
    return (
      <div
        key={id}
        bgImage={bgImage}
        className={`${styles.ProjectCell} ${project.large && styles.doublewide}`}
      >
        {/* <h1>test {screenSize}</h1> */}
        {/* <GlassPushOverlay spiciness={0.5}> */}

      
          <LargeThumbCard
            // title=?
            data={project.details}
            icon={getIcon("test")}
            isdouble={project.large || false}
            to={
              project.details.externalLink ||
              project.details.internalLink ||
              getProjURL(project.name)
            }
            swapsides={id % 2 == 0}
            isExternal={project.externalLink || false}
          />
          {/* test {project.externalLink && "external"} */}
        {/* </GlassPushOverlay> */}
      </div>
    );
  };
  const renderThumb = (project, id, mobile) => {
    const bgImage = project.details?.thumbbg;

    return (
      <div key={id} bgImage={bgImage} className={`${styles.ProjectCell} `}>
        <Thumbnail
          data={project}
          fullLinkCallBack={() => newhandleOpenModal(project)}
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
            <GlassPushOverlay>
              <SmallCard
                type="compact_thumb"
                randomcolor={true}
                data={{
                  title: proj.name,
                  subtitle: proj.description,
                  ext_url: proj.url,
                }}
                to={proj.url}
                isExternal={true}
                // fullLinkCallBack={() => navigate(proj.url)}
                //   asFS={screenSize === "sm"}
                // type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
              />
              {/* test {proj.url} */}
            </GlassPushOverlay>
          </div>
        ))}
        <GlassPushOverlay>
          <SmallCard
            size="small"
            randomcolor={true}
            data={{
              title: "See All Repos",
              subtitle: "github.com/2of",
            }}
            to={"www.github.com/2of"}
            isExternal={true}
            // fullLinkCallBack={() => navigate.to(project.url)}
            //   asFS={screenSize === "sm"}
            type={screenSize === "sm" ? "mobile_compact" : "compact_thumb"}
          />
        </GlassPushOverlay>
      </div>
    );
  };

  const Header1 = () => (

   
    <div className={styles.MainHeader}>
 <GlassPushOverlay spiciness={0} showShine>
      
      <AnimatedHeader
        title={"Featured Projects"}
        icon={getIcon("star")}
        replacementText={"The cool stuff"}
        animate
        subtitle={
          "Small writeups for highlighted projects. Scroll further to see a raw list"
        }
      />

      </GlassPushOverlay>
    </div>
    // </GlassPushOverlay>
  );

  const TextSectionHero = () => {
    return (
      <section className={styles.TextSectionHero}>
        {/* Animated background layers */}
        {/* <div className={styles.bgDecor}>
        <div className={styles.gradientLayer} />
        <div className={`${styles.shape} ${styles.shape1}`} />
        <div className={`${styles.shape} ${styles.shape2}`} />
        <div className={`${styles.shape} ${styles.shape3}`} />
        <div className={`${styles.shape} ${styles.shape4}`} />
      </div> */}

        {/* <TrackedGradientBG interactive={true} /> */}

        {/* Foreground text */}
        <div className={styles.inner}>
          <h1 className={styles.title}>{text.projHeader.projTitle}</h1>
          <div className={styles.subtitleGroup}>
            <p className={styles.subtitle}>{text.projHeader.projS1}</p>
            <p className={styles.subtitle}>{text.projHeader.projS2}</p>
          </div>
        </div>
      </section>
    );
  };

  const StandardHeaderDesktop = ({ title, subtitle, icon }) => (
    <div className={styles.StandardHeaderDesktop}>

       <GlassPushOverlay spiciness={0} showShine>
      
      <AnimatedHeader title={title} icon={icon} subtitle={subtitle} />
      {/* <h1 className={styles.title}>
        {icon} {title}
      </h1>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>} */}
    </GlassPushOverlay>
    
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
    <PagedScrollContainer staggerStart borders>
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
    <ScrollableVerticalView trackScrollPercent>
      <Section color="gradient">
        <TextSectionHero />
      </Section>

      {/* title={"new"} subtitle={"test"}/> */}
      <Section color="dark"
     
        > 
        <div className={styles.LargeThumbGrid}>
          <div className={`${styles.doublewide} ${styles.ProjectCell}`}>
            <TitleCard title={"Showcase Projects"} subtitle={"Mostly web"}/>
        </div>
        
          {showcaseProjects.slice(0, 4).map(renderCard)}
        <div className={`${styles.doublewide} ${styles.fillwide} ${styles.ProjectCell}`}>
            <TitleCard title={"It's a bit all over the place"} subtitle={"Feel free to have a look"}/>
        </div>

          {showcaseProjects.slice(4).map(renderCard)}
             {/* <TitleCard title={"fin"} subtitle={""}/> */}
        </div>
      </Section>

    <Section
    color=""
        Header={() => (
          <StandardHeaderDesktop
            title={"Notable Uni Bits"}
            // subtitle={"It's ... mostly well documented"}
            icon={getIcon("school")}
          />
        )}
      >
        <div className={styles.LargeThumbGrid}>
          {uniProjects.map(renderCard)}
        </div>
      </Section>
      <Section
      color="dark"
        Header={() => (
          <StandardHeaderDesktop
            title={"Most Recent Github Commits"}
            // subtitle={"It's ... mostly well documented"}
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
            // subtitle={"It's ... also somewhat well documented"}
            icon={getIcon("tools")}
          />
        )}
      >
        <div className={styles.LargeThumbGrid}>
          {miscProjects.map(renderCard)}
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
