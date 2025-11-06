import React, { useState, useEffect } from "react";
import useScreenSize from "../utils/screensize.js";
import {
    ScrollableVerticalView,
    Section,
} from "../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView.jsx";
import {CatalogueLargeTextHeader, CatalogueRegularTextHeader} from "./Catalogue/CatalogueHeaders.jsx";
import { useGlobalContext } from "../contexts/GlobalContext.jsx";
import { useProjects } from "../contexts/ContentContext.jsx";
import { StandardChips } from "../components/UI/Chips.jsx";
import styles from "./styles/ModernAbout.module.scss";
import {ImageFrameWithArrow} from "../components/UI/DiscreteComponents/ImageFrameWithArrow.jsx";
import ProfileImage from "../../public/assets/images/default.png"
import ProgressBar from "../components/UI/StandardLib/ProgressBar.jsx";
import {StandardButton} from "../components/UI/StandardLib/StandardButton.jsx";
import getIcon from "../utils/Iconifier.jsx";
import {
    ImageWithStaggeredComponents
} from "../components/UI/DiscreteComponents/PictureWIthComponentsStaggeredAroundCircle.jsx";
import QualificationTile from "../components/UI/DiscreteComponents/QualificationTile.jsx";
import CareerTile from "../components/UI/DiscreteComponents/CareerTile.jsx";
import {Divider} from "../components/UI/Divider.jsx";
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

    const sectionHeaderClass = `${styles._sectionHeader}${
        screenSize === "sm" ? ` ${styles.mobile}` : ""
    }`;

    const { title, subtitle, description, ...sections } = about;


    const MobileView = () => <h1>mobile</h1>;


    const DesktopView = () => (
        <ScrollableVerticalView trackScrollPercent >


            <Section color="particles" sticky>

                <div className={styles.sectionHeaderClass}>

                <ImageWithStaggeredComponents image={ProfileImage} radius={40} gap={-10}>
                    <h1 className={styles.title}>{title}</h1>

                    <h2>{subtitle}</h2>
                    <p>{description}</p>

                    <ProgressBar style="linear" animated={true} beginAnimate={true} val={10} />



                    <p>{about.areatitle}..</p>
                    <span className={styles.buttonContainer}>
    <StandardButton label="Résumé" type="modern_unfilled" icon={getIcon("resume")} link={getLink("resume")} external />
    <StandardButton label="Github" type="modern_unfilled" icon={getIcon("github")} link={getLink("github")} external />
    <StandardButton label="LinkedIn" type="modern_unfilled" icon={getIcon("linkedin")} link={getLink("linkedin")} external />

  </span>
                </ImageWithStaggeredComponents>
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
                    <QualificationTile
                        title={"Bachelor Of Science"}
                        field = "Computer Science"
                        gpatag = "Merit"
                        institution={"University of Canterbury"}



                    />
                    <div className={styles.heightfull}>
                        {getIcon("plus")}

                    </div>

                    <QualificationTile
                        title={"Master Of Artificial Intelligence"}
                        field = "Computer Science"
                        gpatag = "Merit"
                        institution={"University of Canterbury"}
                        icon = "school"
                        year={2024}



                    />


                </div>

                <h2>Career so far...</h2>
                <div className={styles.longflex}>
                    <CareerTile/>
                </div>

            </Section>

            <Section>
                <Divider variant="double" />

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
                                <CatalogueRegularTextHeader text1={content.title}> </CatalogueRegularTextHeader>
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
