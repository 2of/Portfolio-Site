import React, { useState, useEffect, Fragment } from "react";
import styles from "./Pagestyle.module.scss";
import text from "../../../public/assets/text/texts.json";
import { ScrollableVerticalView, Section } from "../../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView";
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
import { useRichTabData } from "../../assets/TextAssets/ShowCaseTabRich";
import getIcon from "../../utils/Iconifier";
import LargeThumbCard from "../../components/Cards/CardLarge";
import Loader from "../../components/UI/StandardLib/Loader";
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
import { BouncyArrows } from "../../components/UI/DiscreteComponents/bouncyArrows";
import { Thumbnail } from "../../components/UI/thumbnail";
import { Article } from "../../components/Article/Article";
import { StandardButton } from "../../components/UI/StandardLib/StandardButton.jsx";
import { useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../contexts/GlobalContext.jsx";
import { ModernButton } from "../../components/UI/StandardLib/Buttons/Button.jsx";

export const CataloguePage_UP = () => {
  const { getAllMetaData, getMetadata, getSectionMetaData } = useProjects();
  const shortProjects = getAllMetaData();
  const screenSize = useScreenSize();
  const { modalState, showModal, hideModal, modalVisible } = useModal();
  const [isLoading, setIsLoading] = useState(true);
  const [githubProjects, setGithubProjects] = useState([]);
  const showcaseProjects = getSectionMetaData({ which: "feat" });
  const uniProjects = getMetadata({ which: "uni" });
  const miscProjects = shortProjects.filter((p) => p.misccategory);








  const navigate = useNavigate();
  const richTabData = useRichTabData();


  const MobileProjSection1 = getSectionMetaData("featured");
  const block2 = getSectionMetaData("block2");
  const block1 = getSectionMetaData("block1");
  console.log("BLOCK!", block1);
  const uniprojects = getSectionMetaData("uniProjects");
  const tools = getSectionMetaData("tools");


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
    );
  }

  const renderCard = (
    project,
    id,
    { compact = false, EntireCardClickable = false, variant = "normal" } = {},
  ) => {
    const bgImage = project.details?.thumbbg;

    // Map variant to style class
    let variantClass = "";
    if (variant === "wide") variantClass = styles.wide;
    if (variant === "tall") variantClass = styles.tall;
    if (variant === "big") variantClass = styles.big;
    if (variant === "twobytwo") variantClass = styles.twobytwo; // Keep legacy if needed

    // If project.large is explicitly set in data, force big/wide behavior if not overridden
    if (project.large && variant === "normal") {
      variantClass = styles.wide; // Default to wide for "large" projects if no specific variant passed
    }

    // Determine which card component to use
    // Use Compact if explicitly requested OR if it's a normal (1x1) cell
    const useCompact = compact || variant === "normal";
    const {getLink} = useGlobalContext();
    return (
      <div
        key={id}
        bgImage={bgImage}
        className={`${styles.ProjectCell} ${variantClass}`}
      >
        {useCompact ? (
          <CatalogueCardCompact
            data={project.details}
            icon={getIcon("test")}
            isdouble={variant === "wide" || variant === "big"}
            to={
              project.details.externalLink ||
              project.details.internalLink ||
              getProjURL(project.name)
            }
            swapsides={id % 2 === 0}
            EntireCardClickable={EntireCardClickable}
            compact={compact}
            isExternal={project.externalLink || project.details.external  || false}
          />
        ) : (
          <CatalogueCardLarge
            data={project.details}
            icon={getIcon("test")}
            isdouble={variant === "wide" || variant === "big"}
            to={
              // project.details.externalLink ||
              // project.details.internalLink ||
              getLink(project.details.linkref) || 
              // getProjURL(project.name)
              "https://www.google.com"
              
            }
            swapsides={id % 2 === 0}
            EntireCardClickable={EntireCardClickable}
            compact={compact}
            isExternal={project.externalLink ||  project.details.external  ||  false}
          />
        )}
      </div>
    );
  };

  const MobileView = () => {

    return (


      <PagedScrollContainer staggerStart borders>


        <div sectionHeight="full" key="standard-header-1">


          {/*<h2>test</h2>*/}
          <CatalogueMainHeaderMobile />
          {/*</div>*/}

        </div>
        {MobileProjSection1.map((project, i) => (
          <div key={`showcase-${i}`} bgImage={project.details?.bgimage}>
            {renderMobileCard(project, i)}
          </div>
        ))}
        <div sectionHeight="half" key="standard-header-1">
          <CatalogueStandardHeaderMobile
            title="Some other projects..."
            subtitle={"It's pretty well documented"}
            customComponent={<BouncyArrows direction="down" />}
            showArrows
          />
        </div>
        {/* <StandardHeaderMobile title="Title"/> */}
        {block1.map((project, i) => (
          <div sectionHeight="half" key={`uni-${i}`} bgImage={project.details?.bgimage}>
            {renderMobileCard(project, i)}
          </div>
        ))}

        <div sectionHeight="quarter" key="standard-header-1">
          <CatalogueStandardHeaderMobile
            title="Notable Uni Work"
            subtitle={"It's pretty well documented"}
            customComponent={<BouncyArrows direction="down" />}
            showArrows
          />
        </div>
        {/* <StandardHeaderMobile title="Title"/> */}
        {uniprojects.map((project, i) => (
          <div sectionHeight="half" key={`uni-${i}`} bgImage={project.details?.bgimage}>
            {renderMobileCard(project, i)}
          </div>
        ))}


      </PagedScrollContainer>)
  };

  const DesktopView = () => {
    return (
      <ScrollableVerticalView trackScrollPercent staggerStart>
        <Section>{/* <Divider variant="double" />*/}</Section>

        <Section
          color=""
          // sticky={true}
          Header={() => (
            <CatalogueLargeTextHeader text1="featured" highlight="projects" />
          )}
        >
          <RichTabShowCaseView data={richTabData} />
        </Section>
        <Section>

              <Divider variant="Thick" />
          </Section>
        <Section
        
        
        
          Header={() => (
            <CatalogueRegularTextHeader
              text1="an"
              highlight="important"
              text2="note"
            />
          )}
          
          >

            <>
                <div className={styles.articleTools}>
                    <h4 className={styles.heading}>
                        fyi I am in the process of filling out the following sections
                    </h4>

                    <div className={styles.intro}>
                        <p>
                            so the contents of the following are all a WIP, a summary of how the
                            articles are defined and created is available
                        </p>
                    </div>


                    <div className={styles.buttonRow}>
                        <ModernButton
                            className={styles.button}
                            label="Open Article Format Page"
                  variant="dev"
                            icon={getIcon("article")}
                            callback={() => navigate("/proj/portfoliosite")}
                        />

                        <ModernButton
                            className={styles.button}
                            label="Sample of the Structure for Articles"
               variant="dev"
                            icon={getIcon("article")}
                            callback={() =>
                                window.open(
                                    "https://github.com/2of/Portfolio-Site/blob/main/public/Writeups/GEO/text.json",
                                    "_blank"
                                )
                            }
                        />

                        <ModernButton
                            className={styles.button}
                            label="The real (LIVE) Metadata"
                     variant="dev"
                            icon={getIcon("article")}
                            callback={() =>
                                window.open(
                                    "https://github.com/2of/Portfolio-Site/tree/main/public/metadata",
                                    "_blank"
                                )
                            }
                        />

                        <ModernButton
                            className={styles.button}
                            label="Open the Rich Editor"
                            variant="dev"
                            icon={getIcon("editor")}
                            callback={() => navigate("/editor")}
                        />
                    </div>

                    <div className={styles.notes}>
                        <p>Wait this is *entirely* on the front end?</p>
                        <p>
                            .... well sorta... github pages is host-enough. There IS support for
                            loading in external articles following my format
                        </p>
                    </div>
                </div>

            </>


        </Section>
        <Section>

          <Divider variant="Thick" />
        </Section>
        {/*<Section >*/}
        {/*  <CatalogueHeroSection text={text} />*/}
        {/*</Section>*/}

        {/*<Section>*/}
        {/*  <Divider variant="double" />*/}
        {/*</Section>*/}

        <Section
          // color="l1"

          Header={() => (
            <CatalogueRegularTextHeader
              text1="a few more "
              highlight="interesting"
              text2="projects"
            />
          )}
        >
          <div className={styles.LargeThumbGrid}>
            {/* {block1.slice(0, 3).map((p, i) => renderCard(p, i, { variant: i === 0 ? "big" : "normal" }))} */}
            {/* // empty here */}
            

            {block1.map((p, i) => {
              // Create a pattern: Big, Normal, Normal, Wide, Normal...
              // This is just a simple e              let variant = "normal";
              // return (<h1>test {p.showcase && "yrdy"}</h1>)
      let variant = "normal";

if (p.showcase) variant = "big";
else if (p.large) variant = "wide";
// else if (i % 3 === 0) variant = "tall";

return renderCard(p, i + 3, { variant });

            })}


            {block2.slice(3).map((p, i) => renderCard(p, i + 100, { variant: "normal" }))}
          </div>
        </Section>

        <Section>

          <Divider variant="double" />
        </Section>
        <Section
          color=""
          Header={() => (
            <CatalogueRegularTextHeader text1="custom tools" highlight="and"  text2="what not
            "/>
          )}
        >
          <div className={styles.RegularCellGrid}>
            {tools.map((project, id) =>
              renderCard(project, id, {
                compact: true,
                EntireCardClickable: true,
              }),
            )}
          </div>
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
