import React, {useState, useEffect, Fragment} from "react";
import useScreenSize from "../utils/screensize.js";
import {
    ScrollableVerticalView,
    Section,
} from "../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView.jsx";
import { CatalogueLargeTextHeader, CatalogueRegularTextHeader } from "./Catalogue/CatalogueHeaders.jsx";
import { useGlobalContext } from "../contexts/GlobalContext.jsx";
import { useProjects } from "../contexts/ContentContext.jsx";
import { StandardChips } from "../components/UI/Chips.jsx";
import styles from "./styles/ModernAbout.module.scss";
import { ImageFrameWithArrow } from "../components/UI/DiscreteComponents/ImageFrameWithArrow.jsx";
import ProfileImage from "../assets/userimage.jpeg"
import ProgressBar from "../components/UI/StandardLib/ProgressBar.jsx";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";
import getIcon from "../utils/Iconifier.jsx";
import someimage from "../assets/Images/default_big.jpg"
import Parallax2 from "../assets/HomeParallaxResources/6.png"
    ""
import {
    ImageWithStaggeredComponents
} from "../components/UI/DiscreteComponents/PictureWIthComponentsStaggeredAroundCircle.jsx";
import QualificationTile from "../components/UI/DiscreteComponents/QualificationTile.jsx";
import CareerTile from "../components/UI/DiscreteComponents/CareerTile.jsx";
import { Divider } from "../components/UI/Divider.jsx";
import { PagedScrollContainer } from "../components/Containers/Scroll/ScrollableViews/TikTokView.jsx";
import {  AboutSection } from "../components/Sections/AboutSection.jsx";
import {MultiTagsContainer} from "../components/Misc/MultiTagsContainer.jsx";
import SkillsCard from "../components/Cards/PreDoneCards/SkillsCard.jsx";
import {AboutCardWithImageMobile} from "../components/Cards/PreDoneCards/AboutCardWithImageMobile.jsx";
import {MobileCareerQualscard} from "../components/Cards/PreDoneCards/MobileCareerQualscard.jsx";
import {useNavStack} from "../contexts/NavStackContext.jsx";
export const ModernAbout = () => {
    const { getLink } = useGlobalContext(); // if unused, consider removing
    const { getPageData } = useProjects();

    const [about, setAbout] = useState(null);
    const screenSize = useScreenSize();
    const [scrollToNextMobileSection,setscrollToNextMobileSection] = useState(0)
    const [scrollToPrevMobileSection,setscrollToPrevMobileSection] = useState(0)

    const {
        navstack,
        pushNav,
        popNav,
        clearStack,
        removeButton,
        addButton,
        extraButtons,
        extraButtonsContains,
    } = useNavStack();


    const triggerNext = () => {
        setscrollToNextMobileSection(prev => prev + 1);
        console.log("SCROLL");
    };

    const triggerPrev = () => {
        setscrollToPrevMobileSection(prev => prev + 1);
        console.log("SCROLL");
    };




    useEffect(() => {
        console.log("ModernAbout useEffect triggered. screenSize:", screenSize);
        if (screenSize === "sm") {
            console.log("Adding ScrollyNav button");
            addButton({
                id: "upnav",
                callback: triggerPrev,
                label: "up",
                icon: getIcon("up"),
            });
        }

        return () => {
            removeButton({ id: "upnav" });
        };
    }, [screenSize, addButton, removeButton]);

    useEffect(() => {
        console.log("ModernAbout useEffect triggered. screenSize:", screenSize);
        if (screenSize === "sm") {
            console.log("Adding ScrollyNav button");
            addButton({
                id: "downnav",
                callback: triggerNext,
                label: "down",
                icon: getIcon("down"),
            });
        }

        return () => {
            removeButton({ id: "downnav" });
        };
    }, [screenSize, addButton, removeButton]);

    useEffect(() => {
        const load = async () => {
            const data = await getPageData({ pagename: "about" });
            setAbout(data);
        };
        load();
    }, [getPageData]);

    if (!about) return <p>Loading...</p>;

    const sectionHeaderClass = `${styles._sectionHeader}${screenSize === "sm" ? ` ${styles.mobile}` : ""
        }`;

    const { title, subtitle, description, qualifications, career, fullskills, ...sections } = about;

    const MobileView = () => {
        const data = Object.fromEntries(
            Object.entries(sections).filter(
                ([_, content]) =>
                    content &&
                    (content.title ||
                        content.subtitle ||
                        content.paragraph1 ||
                        content.paragraph2 ||
                        content.lastline ||
                        (Array.isArray(content.data) && content.data.length > 0))
            )
        );

        const dataEntries = Object.entries(data); // convert object back to array for map

        return (
            <PagedScrollContainer staggerStart borders totalSections={3 + dataEntries.length} conductnext={scrollToNextMobileSection} conductprev={scrollToPrevMobileSection}>

                <div sectionHeight="full" key="standard-header-1">

                    {/*<h1>test</h1>*/}
                    <AboutCardWithImageMobile
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        areatitle={about.areatitle}
                    />
                </div>

                <div sectionHeight="full" key="standard-header-2" bgImage={Parallax2}>
                    {/*<h1>test2</h1>*/}
                    <MobileCareerQualscard career={career} quals={qualifications} />
                </div>

                <div sectionHeight="full" key="standard-header-3" >
                    <SkillsCard fullskills={fullskills} />
                </div>

                {/* Render filtered info sections */}
                {dataEntries.map(([sectionKey, content], i) => (
                    <div sectionHeight="full" key={`infoChunk-${sectionKey}-${i}`}>
                        <div className={styles.infoChunk}>
                            {content.subtitle && <h3>{content.subtitle}</h3>}
                            {content.paragraph1 && <p>{content.paragraph1}</p>}
                            {content.paragraph2 && <p>{content.paragraph2}</p>}
                            {Array.isArray(content.data) && content.data.length > 0 && (
                                <div className={styles.dataContainer}>
                                    <StandardChips
                                        items={content.data.map((d, i) => ({
                                            id: i,
                                            label: d.title || d.label || "Untitled",
                                        }))}
                                        variant="outlined"
                                        size="small"
                                        onChipClick={(chip) => console.log("Clicked:", chip.label)}
                                    />
                                </div>
                            )}
                            {content.lastline && <p>{content.lastline}</p>}
                        </div>
                    </div>
                ))}

            </PagedScrollContainer>
        );
    };



    const DesktopView = () => (
        <ScrollableVerticalView trackScrollPercent >


            <Section >

                <div className={styles.sectionHeaderClass}>


                    <AboutSection
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        areatitle={about.areatitle}
                    />
                </div>
            </Section>
            <Section
                color="l1"
            // Header={() => (
            //     <CatalogueLargeTextHeader text1="about " highlight="me " text2="...?" />
            // )}
            >


                <h2>Quals</h2>
                <div className={styles.longflex}>


                    {qualifications.map((qual, i) => (

                        <>
                            <QualificationTile
                                title={qual.title}
                                field={qual.field}
                                gpatag={qual.gpatag}
                                institution={qual.where}
                                year={qual.year}



                            />

                            {i != qualifications.length - 1 && (

                                <div className={styles.heightfull}>
                                    {getIcon("plus")}

                                </div>

                            )}


                        </>

                    ))}



                </div>

                <h2>Career so far...</h2>
                <div className={styles.tilegrid}>


                    {career.map((c, i) => (


                        <>



                            <CareerTile
                                position={c.position}
                                company={c.company}
                                duration={c.duration}
                                location={c.location}
                                doing={c.doing}
                                techStack={c.coreskills}


                            />

                            {/*{i != career.length - 1 && (*/}

                            {/*    <div className={styles.heightfull}>*/}
                            {/*        {getIcon("left")}*/}

                            {/*    </div>*/}

                            {/*)}*/}

                        </>

                    ))}

                </div>


                <h2>Things I can do</h2>

                <MultiTagsContainer fullskills={fullskills} />

            </Section>


            {Object.entries(sections)
                .filter(
                    ([_, content]) =>
                        content &&
                        (content.title ||
                            content.subtitle ||
                            content.paragraph1 ||
                            content.paragraph2 ||
                            content.lastline ||
                            (Array.isArray(content.data) && content.data.length > 0))
                )
                .map(([sectionKey, content]) => (
                    <Section
                        sticky
                        key={sectionKey}
                        Header={() =>
                            content.title ? (
                                // <CatalogueRegularTextHeader text1={content.title}> </CatalogueRegularTextHeader>
                                <span className={styles.SimpleHeaderDesktop}>{content.title}</span>


                            ) : null
                        }
                    >
                        <div className={styles.infoChunk}>
                            {content.subtitle && <h3>{content.subtitle}</h3>}
                            {content.paragraph1 && <p>{content.paragraph1}</p>}
                            {content.paragraph2 && <p>{content.paragraph2}</p>}
                            {Array.isArray(content.data) && content.data.length > 0 && (
                                <div className={styles.dataContainer}>
                                    <StandardChips
                                        items={content.data.map((d, i) => ({
                                            id: i,
                                            label: d.title || d.label || "Untitled",
                                        }))}
                                        variant="outlined"
                                        size="small"
                                        onChipClick={(chip) => console.log("Clicked:", chip.label)}
                                    />
                                </div>
                            )}
                            {content.lastline && <p>{content.lastline}</p>}
                        </div>
                    </Section>
                ))}
        </ScrollableVerticalView>
    );

    // --- Render ---
    return <>{screenSize === "sm" ? MobileView() : DesktopView()}</>;
};
