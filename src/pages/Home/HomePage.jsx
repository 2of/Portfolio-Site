import React, { useState } from "react";
import useScreenSize from "../../utils/screensize";
import { PagedScrollContainer } from "../../components/Scroll/ScrollableViews/TikTokView";
import { HeroCell } from "./Hero";
import otherart from "../../assets/HomeParallaxResources/1.png"
import { AboutCell } from "./About";
import AboutBG from "../../assets/images/stars.gif"
import { Modal } from "../../components/Modal";
import { FooterCell } from "./Footer";
import { NewAboutCell } from "./NewAbout";
import { useProjects } from "../../contexts/ContentContext";
import { CenteredSmallerScrollElementContainer } from "../../components/Scroll/ScrollableViews/CenteredSmallerScrollElementContainer";
import { Article } from "../../components/Article/Article";
import { Link } from "react-router-dom";
import { LandingPageScrollContainer } from "../../components/Scroll/ScrollableViews/LandingPageScrollContainer";
export const HomePage = () => {
  const screenSize = useScreenSize();
    const { getArticle,getArticleMetaData } = useProjects();
  const mobile = screenSize === "sm";
  const [showModal, setShowModal] = useState(false);
  const handleFeatClick = () => { 
        setShowModal(true);
  }
const mobileView = () => (
  <PagedScrollContainer borders >
    <div sectionHeight="full">
      <HeroCell sz={screenSize} featureButtonCallback={handleFeatClick} />
    </div>

    <div >
      {({ percentVisible }) => (
        <NewAboutCell sz={screenSize} percentVisible={percentVisible} />
      )}
    </div>
    {/* <div bgImage={AboutBG}>
      {({ percentVisible }) => (
        <AboutCell sz={screenSize} percentVisible={percentVisible} />
      )}
    </div> */}

    <div sectionHeight="half">
      <FooterCell sz={screenSize} />
    </div>
  </PagedScrollContainer>
);
  const desktopView = () => (
    <CenteredSmallerScrollElementContainer
    
>
      <HeroCell sz={screenSize}             featureButtonCallback={handleFeatClick}/>
      <NewAboutCell sz={screenSize} />
      <FooterCell sz={screenSize} />
    </CenteredSmallerScrollElementContainer>
  );

  return (
    <>
      {showModal && (
        <Modal
          component={<Article metadata={getArticleMetaData("geo")} />}
          onClose={() => setShowModal(false)}
          size="large"
          title={"Project Features"}
          isOpen={showModal}
        />

        
      )}


      {mobile ? mobileView() : desktopView()}
    </>
  );
};
