import React, { useState } from "react";
import { useProjects } from "../contexts/ContentContext";
import styles from "./styles/ComponentPage.module.scss";
import { RadialMenu } from "../components/RadialMenu";
import { DarkModeTile } from "../components/darkmodeTile";
import { useGlobalContext } from "../contexts/GlobalContext";
import TextOnPath from "../components/Misc/TextPath";
import FlowChartComponent from "../components/Misc/FlowChart";
import WigglyLine from "../components/Misc/WigglyLine";
import image from "../assets/images/default.png";
import image2 from "../assets/images/default_other.jpeg";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";
import ProgressBar from "../components/UI/ProgressBar";

import ImageHandle from "../components/Handlers/ImageHandle";
import Loader from "../components/Loader";
import { StandardDropdown } from "../components/UI/StandardDropDown";
import { StandardTextField } from "../components/UI/StandardTextField";
import { StandardCollapsableRow } from "../components/UI/CollapsableSection";
import getIcon from "../utils/Iconifier";
import { useAlertMenu } from "../contexts/AlertMenuContext";
import { AnimatedHeader } from "../components/UI/TypeWriterHeader";
import GlassPushOverlay from "../components/UI/GlassContainer";
import FeatherRevealImage from "../components/Misc/FeatherImageMouseTracked";
import {
  useIsMenuFloatingDesktop,
  useIsNavHidden,
  useRoute,
} from "../contexts/RouteContext";
import { StandardSlider } from "../components/UI/StandardSlider";
import FeatherTwoLayer from "../components/Misc/FeatherTwoLayer";
import { StandardButton } from "../components/UI/StandardButton";
import { useModal } from "../contexts/ModalContext";
import { Article } from "../components/Article/Article";
import { meta } from "@eslint/js";
import { useNavStack } from "../contexts/NavStackContext";
import ResponsiveGradient from "../components/Background/ResponsiveGradient";
import {
  ScrollableVerticalView,
  Section,
} from "../components/Scroll/ScrollableViews/ScrollableVerticalView";

export const ComponentPage = () => {
  const { getArticle, getListOfArticles, getArticleMetaData } = useProjects();
  const { modalState, showModal, hideModal, modalVisible } = useModal();
  const { alertState, showAlert, hideAlert, alertVisible } = useAlertMenu();
  const { getSkills } = useProjects();
  const skills = getSkills();
  const location = useRoute();
  const shouldHideNav = useIsMenuFloatingDesktop();
  const [currentPath, setCurrentPath] = useState([]);
  const [currpathPoint, setCurrPathPoint] = useState(0);



  const pathname = useRoute();
  const { pushNav, addButton, navstack, popNav, extraButtons } = useNavStack();
  const {
    openShareSheet,
    shareSheetVisible,
    shareSheetData,
    showScrollIndicator,
    hideScrollIndicator,
    scrollIndicatorStatus,
  } = useGlobalContext();
  const handleAddNav = () => {
    pushNav({
      id: "profile",
      title: "Profile",
      label: "👤",
      bottom: true,
      callback: () => alert("Profile clicked!"),
    });
  };

  const triggerModal = () => {
    showModal({
      title: "test",
      size: "small",
    });
  };

  const triggerAlert = () => {
    showAlert({
      title: "Hello!",
      message: "This is a test alert.",
    });
  };
  const handleArticleModal = () => {
    showModal({
      // title: "blah blah",
      size: "large",
      floatnav: true,
      content: (
        <Article
          metadata={getArticleMetaData("geo")}
          // style="modern"
          // topDivideDouble={true}
          // twoColumns={true}
          // AsArticle={true}
        />
      ),
    });
  };


  const handleReplaceMainButton = () => {
    addButton({
      id: "help",
      label: "❓",

      callback: () => alert("Help clicked!"),
    });
  };
  const GenericHeader = ({ text }) => {
    return (
      <div className={styles.HeaderContainer}>
        <h2>{text || "default header"}</h2>
      </div>
    );
  };
  const IntroSection = () => {
    return (
      <Section
        sticky={true}
        sticky
        Header={() => <GenericHeader text={"Welcome 🔨👷🏻‍♂️"} />}
      >
        <p>
          This is the 'miscellaneous' page full of random components and tests
          (woohoo!)
        </p>
        <p>It's just here for fun :)</p>
      </Section>
    );
  };

  const NavSection = () => {
    return (
      <Section
        sticky={true}
        // color="dark"
        sticky
        Header={() => (
          <GenericHeader
            text={
              "Nav stack defines navigation button behaviour in the mobile view"
            }
          />
        )}
      >
        <div className={`${styles.chunk}`}>
          <StandardButton
            type="subtle"
            callback={handleReplaceMainButton}
            label="Add Button to replace the menu button"
          />
          <p>Thee are {extraButtons.length} elements in extra stack s</p>
          <StandardButton
            type="subtle"
            callback={handleAddNav}
            label="Add Nav Item to the stack"
          />
          <p>Thee are {navstack.length} elements in main stack s</p>
          <StandardButton
            type="subtle"
            callback={popNav}
            label="pop Nav Item"
          />
        </div>
      </Section>
    );
  };

  const AlertSection = () => {
    return (
      <Section
        sticky={true}
        Header={() => (
          <GenericHeader
            text={
              "Alerts are a unique Modal, they add some extra behaviours to the main layout"
            }
          />
        )}
      >
        <div className={styles.chunk}>
          <p>Open: {alertState.open ? "Yes" : "No"}</p>
          <p>Title: {alertState.title || "(none)"}</p>
          <p>Message: {alertState.message || "(none)"}</p>
          <p>Buttons: {alertState.buttons.length}</p>
          <StandardButton
            type="subtle"
            label="Show an Alert"
            callback={triggerAlert}
          />
          {alertVisible ? "YES " : "no"}alertVisible
        </div>
      </Section>
    );
  };
  const CollapsableSection = () => { 
    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => <GenericHeader text={"Collapsables"} />}
      >
      <div className={styles.chunk}>
        <h3>Collapsable Sections</h3>
        <StandardCollapsableRow title="Basic Section" defaultOpen={false}>
          <div style={{ padding: "1rem", background: "#f8f8f8" }}>
            This is the content of a basic collapsable section
          </div>
        </StandardCollapsableRow>

        <StandardCollapsableRow
          key={1}
          title={"Advanced Section"}
          buttons={[
            { label: "delete", callback: () => console.log("Delete") },
            { label: "arrowUp", callback: () => console.log("Move up") },
            { label: getIcon("smile"), callback: () => console.log("Smile") },
          ]}
        >
          <div style={{ padding: "1rem", background: "#f8f8f8" }}>
            This section has action buttons
          </div>
        </StandardCollapsableRow>
      </div>


      </Section>
    )
  }

  const ModalSection = () => {
    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => <GenericHeader text={"Welcome 🔨👷🏻‍♂️"} />}
      >
        <div className={`${styles.chunk}`}>
          OPEN THE MODAL:
          <StandardButton
            type="subtle"
            callback={triggerModal}
            label="Open Generic Modal with no child content"
          />
          <p>Open: {modalState.open ? "Yes" : "No"}</p>
          <p>Open: {modalVisible ? "Yes" : "No"}</p>
          <StandardButton
            type="subtle"
            label="Open modal with embed"
            callback={handleArticleModal}
          />
        </div>
      </Section>
    );
  };

  const ImageInteractionsSection = () => {
    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => (
          <GenericHeader
            text={
              "Share Sheets are defined by passing in a default URl / site etc but will fallback to path"
            }
          />
        )}
      >
        <div className={styles.chunk}>
          feathered image
          <FeatherRevealImage
            BaseImage="/Writeups/ChessELOEstimator/thumb.png"
            RevealedImage="/Writeups/ChessELOEstimator/thumbColour.png"
            radius={120}
          />
          tracked 'dot' overlay
          <div
            style={{ width: "80%", height: "20rem", border: "1px solid black" }}
          >
            <FeatherTwoLayer
              baseLayerClass={styles.diamondPattern}
              coverLayerContent="radial-gradient(circle, #5b2c5bff, #00ffff)"
              alwaysListen={true}
            />{" "}
          </div>
        </div>
      </Section>
    );
  };

  const SliderSection = () => {

      const [sliderVal, setsliderVal] = useState(20);


    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => <GenericHeader text={"Welcome 🔨👷🏻‍♂️"} />}
      >
        <div className={styles.chunk}>
          <h2> SLiders! </h2>

          <StandardSlider
            value={sliderVal}
            onChange={setsliderVal}
            variant="thick"
            style={{ backgroundColor: "lightblue" }} // inline override
            className="myCustomSlider" // SCSS override
          />

          <br />    
          steps defined manually

          <StandardSlider
            min={0}
            max={100}
            value={sliderVal}
            onChange={setsliderVal}
            steps={[0, 20, 40, 60, 80, 100]} // slider will snap to these
          />
    steps defined automatically w/ prop autoCalcStepsEvery = n

          <StandardSlider
            min={0}
            max={100}
            value={sliderVal}
            onChange={setsliderVal}
  autoCalcStepsevery={2}
          />
                    <br />

                    n = 1
          <StandardSlider
            min={0}
            max={100}
            value={sliderVal}
            onChange={setsliderVal}
            autoCalcStepsevery={1}
          />
          <br />
          Thick variant
          <StandardSlider
            value={sliderVal}
            variant="thick"
            onChange={setsliderVal}
          />
          <br />
          <StandardSlider value={sliderVal} onChange={setsliderVal} />
          <br />
        </div>

      
      </Section>
    );
  };


  const TextInputSection = () => { 
  const [text, setText] = useState("Hello World");
    return ( 

      <Section
        sticky={true}
        // color="dark"

        Header={() => (
          <GenericHeader
            text={
              "Text Fields..."
            }
          />
        )}>
  <div className={styles.chunk}>
     There are a few variants of text fields  'type = default'
          <StandardTextField
            name="bio"
            label="Bio (Default)"
            value={text}
            onChange={setText}
            placeholder="Tell us a little about yourself..."
            type="default"
          />

          you can define multiline and rows n ' type = flat'
          <StandardTextField
            name="bio"
            label="Bio (Multiline Flat)"
            value={text}
            onChange={setText}
            multiline
            rows={5}
            placeholder="Tell us a little about yourself..."
            type="flat"
          />

          type = header
          <StandardTextField
            name="title"
            label="extra optional prop for text here"
            value={text}
            onChange={setText}
            placeholder="Big H1-style field"
            type="header"
          />
        </div>
            
        </Section>
    )


  }


  const DropDownSection = () => { 


      const [selected, setSelected] = useState("apple");

   return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => <GenericHeader text={"Dropdowns"} />}
      >
      <div className={styles.chunk}>
          <h4>Dropdown</h4>
          <StandardDropdown
            label="Select a fruit"
            name="fruits"
            selectedValue={selected}
            onChange={setSelected}
            options={[
              { value: "apple", label: "Apple" },
              { value: "banana", label: "Banana" },
              { value: "mystery", label: "???" },
            ]}
            variant="icon"
          />
        </div>


      </Section>
   )

  }

  const DataDisplaySection = () =>{ 

    const [val,setval] = useState(50)
    const [upper, setupper ] = useState(100)

    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => <GenericHeader text={"Progress bars are used for data display etc"} />}
      >
              <div className={styles.chunk}>


          <h4>Progress Bars</h4>
         <p> define as animated? showval? showbounds? </p>
         <br/>
          <ProgressBar
            style="linear"
            animated
            val={val}
            lowerBound={0}
            upperBound={upper}
            showVal
            // showBounds
          />
              <ProgressBar
            style="linear"
            animated
            val={val}
            lowerBound={0}
            upperBound={upper}
            // showVal
            showBounds
          />

          There's also round styles
          <ProgressBar
            style="round"
            animated
            val={val}
            lowerBound={0}
            upperBound={upper}
            showVal
            showBounds
          />
          <ProgressBar
            style="linear"
            animated
            val={6833}
            lowerBound={50}
            upperBound={10033}
            showVal
            showBounds
          />
<p>Use the slider to change the prog bars</p>
            Value:
                  <StandardSlider
                 min={0}
            max={100}
            value={val}
            onChange={setval}
//   autoCalcStepsevery={2}
          />
          Upper bound:
   <StandardSlider
                 min={0}
            max={400}
            value={upper}
            onChange={setupper}
//   autoCalcStepsevery={2}
          />



        </div>
    </Section>
)
  }
  const ShareSection = () => {
    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => (
          <GenericHeader
            text={
              "Share Sheets are defined by passing in a default URl / site etc but will fallback to path"
            }
          />
        )}
      >
        <div className={styles.chunk}>
          <h3>Share Sheet</h3>
          <button
            onClick={() =>
              openShareSheet(
                "https://example.com",
                "twitter",
                "Testing description",
                "Test title"
              )
            }
          >
            Share This
          </button>
          <p>Share Sheet is {shareSheetVisible ? "Open" : "Closed"}</p>
          <p>URL: {shareSheetData.URL}</p>
          <p>Description: {shareSheetData.initialDescription}</p>
          <p>Title: {shareSheetData.title}</p>
          <button onClick={() => console.log(shareSheetData)}>
            Log Share Sheet Data
          </button>
        </div>
      </Section>
    );
  };

  const RadialMenuSection = () => {
    return ( 

 <Section
        sticky={true}
        // color="dark"

        Header={() => (
          <GenericHeader
            text={
              "Radial Mens are fun?"
            }
          />
        )}
      >
  <div className={`${styles.chunk} ${styles.centered}`}>
        <h3>Radial Menu</h3>
        <RadialMenu
          data={skills}
          isRoot={true}
          currentPath={currentPath}
          setCurrentPath={setCurrentPath}
          initialRadius={150}
        />
        <p>
          The above is rendered using recursive component rendering from the
          following JSON
        </p>
        <pre>
          <code>{JSON.stringify(skills, null, 2)}</code>
        </pre>
      </div>


</Section>

    )
  };

  const GlassSection = () => {};

  return (
    <ScrollableVerticalView trackScrollPercent>
      <IntroSection />
      {/* <IntroSection/> */}
      <NavSection />
      <ModalSection />
      <AlertSection />
      <ShareSection />
      <SliderSection />
      <TextInputSection/>
      <ImageInteractionsSection />
      <CollapsableSection/>
      <DataDisplaySection/>
      <DropDownSection/>
      <RadialMenuSection/>
    </ScrollableVerticalView>
  );
};
