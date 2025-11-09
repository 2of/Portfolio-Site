import React, { useState, useEffect } from "react";
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
import ProfileImage from "../../public/assets/images/default.png"
import ProgressBar from "../components/UI/StandardLib/ProgressBar.jsx";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";
import getIcon from "../utils/Iconifier.jsx";
import {
    ImageWithStaggeredComponents
} from "../components/UI/DiscreteComponents/PictureWIthComponentsStaggeredAroundCircle.jsx";
import QualificationTile from "../components/UI/DiscreteComponents/QualificationTile.jsx";
import CareerTile from "../components/UI/DiscreteComponents/CareerTile.jsx";
import { Divider } from "../components/UI/Divider.jsx";
import { PagedScrollContainer } from "../components/Containers/Scroll/ScrollableViews/TikTokView.jsx";
import { AboutCardWithImage } from "../components/Cards/PreDoneCards/AboutCardWithImage.jsx";
import MultiTagsContainer from "../components/Misc/MultiTagsContainer.jsx";
import SkillsCard from "../components/Cards/PreDoneCards/SkillsCard.jsx";
export const ModernAbout = () => {
    const { getLink } = useGlobalContext(); // if unused, consider removing
    const { getPageData } = useProjects();

    const [about, setAbout] = useState(null);
    const screenSize = useScreenSize();






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


    const MobileView = () => (

        <PagedScrollContainer staggerStart borders>
            <div sectionHeight="full" key="standard-header-1">

                <AboutCardWithImage
                    title={title}
                    subtitle={subtitle}
                    description={description}
                    areatitle={about.areatitle}
                />
            </div>

            <div sectionHeight="full" key="standard-header-1">
        

          <SkillsCard fullskills={fullskills} />
            </div>


        </PagedScrollContainer>
    );




    const DesktopView = () => (
        <ScrollableVerticalView trackScrollPercent >


            <Section color="gradient" sticky>

                <div className={styles.sectionHeaderClass}>


                    <AboutCardWithImage
                        title={title}
                        subtitle={subtitle}
                        description={description}
                        areatitle={about.areatitle}
                    />
                </div>
            </Section>
            <Section
                color="l2"
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
    return screenSize === "sm" ? <MobileView /> : <DesktopView />;
};
