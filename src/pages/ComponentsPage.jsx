import React, { useState } from "react";
import { useProjects } from "../contexts/ContentContext";
import styles from "./styles/ComponentPage.module.scss";
import { RadialMenu } from "../components/UI/RadialMenu.jsx";
import { DarkModeTile } from "../components/UI/darkmodeTile.jsx";
import { useGlobalContext } from "../contexts/GlobalContext";
import TextOnPath from "../components/Misc/TextPath";
import FlowChartComponent from "../components/Misc/FlowChart";
import WigglyLine from "../components/Misc/WigglyLine";
import image from "../assets/images/default.png";
import image2 from "../assets/images/default_other.jpeg";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";
import ProgressBar from "../components/UI/StandardLib/ProgressBar.jsx";

import ImageHandle from "../components/Handlers/ImageHandle";
import Loader from "../components/UI/StandardLib/Loader.jsx";
import { StandardDropdown } from "../components/UI/StandardLib/StandardDropDown.jsx";
import { StandardTextField } from "../components/UI/StandardLib/StandardTextField.jsx";
import { StandardCollapsableRow } from "../components/UI/StandardLib/CollapsableSection.jsx";
import getIcon from "../utils/Iconifier";
import { useAlertMenu } from "../contexts/AlertMenuContext";
import { AnimatedHeader } from "../components/UI/TypeWriterHeader";
import GlassPushOverlay from "../components/UI/InteractionContainers/GlassContainer.jsx";
import FeatherRevealImage from "../components/Misc/FeatherImageMouseTracked";
import {
  useIsMenuFloatingDesktop,
  useIsNavHidden,
  useRoute,
} from "../contexts/RouteContext";
import { StandardSlider } from "../components/UI/StandardLib/StandardSlider.jsx";
import FeatherTwoLayer from "../components/Misc/FeatherTwoLayer";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";
import StandardToggle from "../components/UI/StandardLib/StandardToggle.jsx";
import { useModal } from "../contexts/ModalContext";
import { Article } from "../components/Article/Article";
import { meta } from "@eslint/js";
import { useNavStack } from "../contexts/NavStackContext";
import ResponsiveGradient from "../components/Background/ResponsiveGradient";
import {
  ScrollableVerticalView,
  Section,
} from "../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView";
import { Divider } from "../components/UI/Divider";
import {StandardTab} from "../components/UI/StandardTab.jsx";

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

  const DividerSection = () => {
    return (
      <Section
        sticky={true}
        Header={() => (
          <GenericHeader
            text={
              "Divider is a simple component that adds a horizontal line to the layout"
            }
          />
        )}
      >
        <div className={styles.chunk}>
          // Default - Pure gradient fade (no center element)
          <Divider variant="default" spacing="medium" />
          // Dashed - Clean dashed line only
          <Divider variant="dashed" spacing="small" />
          // Dotted - Micro dots with tiny center dot
          <Divider variant="dotted" spacing="medium" />
          // Gradient - Smooth color fade (no center)
          <Divider variant="gradient" spacing="large" />
          // Ornamental - Subtle diamonds + dot cluster
          <Divider variant="ornamental" spacing="medium" />
          // Thick - Bold single line
          <Divider variant="thick" spacing="small" />
          // Minimal - Ultra-subtle line
          <Divider variant="minimal" spacing="medium" />
          // Double - Parallel lines (no center)
          <Divider variant="double" spacing="large" />
          // Wave - Flowing dash pattern
          <Divider variant="wave" spacing="medium" />
          // Center - Clean lines with single vertical accent bar
          <Divider variant="center" spacing="medium" />
          // With animation (works with any variant)
          <Divider variant="gradient" animated spacing="large" />
          <Divider variant="ornamental" animated spacing="medium" />
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
    );
  };

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

const TabSection = () => {
        const tabs = {
            Overview: () => (
                <div>
                    <h3>Overview</h3>
                    <p>
                        Tabs group related content into smaller, more focused views.
                        This tab gives a general summary of your content or app section.
                    </p>
                </div>
            ),
            Details: () => (
                <div>
                    <h3>Details</h3>
                    <p>
                        Use this space for specifics — settings, fine-tuning, or extra information
                        that doesn’t belong in the main view.
                    </p>
                </div>
            ),
            Settings: () => (
                <div>
                    <h3>Settings</h3>
                    <p>
                        This tab could host configurable preferences, toggles, or personalization
                        options for the user.
                    </p>
                </div>
            ),
        };

        return (
            <Section
                sticky={true}
                Header={() => (
                    <GenericHeader text="Tabs are used as follows:" />
                )}
            >
                <StandardTab
                    tabs={tabs}
                    variant="mobile"
                    tabPosition="bottom"
                />
                <StandardTab
                    tabs={tabs}
                    variant="outline"
                    tabPosition="bottom"
                />
                <StandardTab
                    tabs={tabs}
                    variant="minimal"
                    tabPosition="top"
                />
            </Section>
        );
    };

  const ToggleShowcaseSection = () => {
    const toggleVariants = [
      {
        type: "box",
        name: "Legacy Box",
        description: "Original block toggle with wiggle animation.",
      },
      {
        type: "pill",
        name: "Legacy Pill",
        description: "Compact pill switch used around the app.",
      },
      {
        type: "largepill",
        name: "Legacy Large Pill",
        description: "Extra padding + sliding knob treatment.",
      },
      {
        type: "modern",
        name: "Modern",
        description: "Default themed toggle with gradients + depth.",
      },
      {
        type: "modern_unfilled",
        name: "Modern Unfilled",
        description: "Outline-only track with floating knob.",
      },
      {
        type: "minimal",
        name: "Minimal",
        description: "Hairline track + floating knob for tight UI.",
      },
      {
        type: "outline",
        name: "Outline",
        description: "Dashed border + pill knob for high contrast.",
      },
      {
        type: "glass",
        name: "Glass",
        description: "Frosted glass track with blur + lighting.",
      },
      {
        type: "neon",
        name: "Neon",
        description: "Dark track with animated glow pulse.",
      },
      {
        type: "basic_small",
        name: "Basic Small",
        description: "Matches the basic_small StandardButton aesthetic.",
      },
      {
        type: "utility",
        name: "Utility",
        description: "Compact utilitarian switch for dense layouts.",
      },
      {
        type: "soft",
        name: "Soft",
        description: "Rounded, pillowy styling with subtle shadows.",
      },
    ];

    const [variantValues, setVariantValues] = useState(() =>
      toggleVariants.reduce((acc, variant) => {
        acc[variant.type] = variant.type === "box";
        return acc;
      }, {})
    );

    const handleToggleChange =
      (type) =>
      (nextValue = false) => {
        setVariantValues((prev) => ({
          ...prev,
          [type]: Boolean(nextValue),
        }));
      };

    return (
      <Section
        sticky={true}
        Header={() => (
          <GenericHeader text={"StandardToggle Variants & Legacy Styles"} />
        )}
      >
        <div className={styles.chunk}>
          <p>
            Every StandardToggle variant, including all legacy styles, rendered
            side-by-side. Click any toggle to flip its local state and preview
            the animation and hover behaviours.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            {toggleVariants.map(({ type, name, description }) => (
              <div
                key={type}
                style={{
                  border: "1px solid var(--border-color)",
                  borderRadius: "12px",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.85rem",
                  background: "var(--bg-l1)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.25rem",
                  }}
                >
                  <h4 style={{ margin: 0 }}>{name}</h4>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--secondary-text)",
                      fontSize: "0.85rem",
                      lineHeight: 1.4,
                    }}
                  >
                    {description}
                  </p>
                </div>
                <StandardToggle
                  type={type}
                  checked={Boolean(variantValues[type])}
                  callback={handleToggleChange(type)}
                  firsticon="🌙"
                  secondicon="☀️"
                  ariaLabel={`${name} toggle`}
                />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.8rem",
                    color: "var(--secondary-text)",
                  }}
                >
                  <span>State:</span>
                  <strong
                    style={{
                      textTransform: "uppercase",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {variantValues[type] ? "On" : "Off"}
                  </strong>
                </div>
              </div>
            ))}
          </div>
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

  const SliderShowcaseSection = () => {
    const sliderVariants = [
      {
        type: "dot",
        name: "Dot Track (Legacy)",
        description: "The original thin slider, refreshed with better touch targets.",
        min: 0,
        max: 100,
      },
      {
        type: "thick",
        name: "Thick",
        description: "Chunky progress bar aesthetic for dashboards.",
        min: 0,
        max: 100,
      },
      {
        type: "soft",
        name: "Soft",
        description: "Rounded pastel track with gentle shadowing.",
        min: 0,
        max: 100,
      },
      {
        type: "segmented",
        name: "Segmented",
        description: "Snaps to named steps; ideal for tiered controls.",
        min: 0,
        max: 5,
        steps: [0, 1, 2, 3, 4, 5],
      },
      {
        type: "glass",
        name: "Glass",
        description: "Frosted glass slider with a luminous knob.",
        min: 0,
        max: 100,
      },
      {
        type: "minimal",
        name: "Minimal",
        description: "Ultra-thin track with a micro value chip.",
        min: 0,
        max: 100,
      },
      {
        type: "basic_small",
        name: "Basic Small",
        description: "Slider styled to match the basic_small button + toggle.",
        min: 0,
        max: 120,
      },
      {
        type: "progress",
        name: "Progress (Display only)",
        description: "Read-only streaming state, no thumb bubble.",
        min: 0,
        max: 100,
        interactive: false,
        showValueBubble: false,
      },
    ];

    const [sliderValues, setSliderValues] = useState(() =>
      sliderVariants.reduce((acc, variant) => {
        const midpoint = (variant.min + variant.max) / 2;
        acc[variant.type] =
          variant.type === "progress" ? variant.max * 0.65 : Math.round(midpoint);
        return acc;
      }, {}),
    );

    const handleSliderChange = (type) => (nextValue) => {
      setSliderValues((prev) => ({
        ...prev,
        [type]: nextValue,
      }));
    };

    return (
      <Section
        sticky={true}
        Header={() => (
          <GenericHeader text={"StandardSlider Variants & Touch-Friendly Styles"} />
        )}
      >
        <div className={styles.chunk}>
          <p>
            Enhanced slider variants with improved touch targets, step snapping,
            and theming parity with the rest of the UI library. Tap or drag any
            slider to feel the new track physics and value chip.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.5rem",
              width: "100%",
            }}
          >
            {sliderVariants.map(
              ({
                type,
                name,
                description,
                min,
                max,
                steps,
                interactive = true,
                showValueBubble = true,
              }) => (
                <div
                  key={type}
                  style={{
                    border: "1px solid var(--border-color)",
                    borderRadius: "12px",
                    padding: "1.25rem",
                    background: "var(--bg-l1)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "0.85rem",
                  }}
                >
                  <div>
                    <h4 style={{ margin: 0 }}>{name}</h4>
                    <p
                      style={{
                        margin: "0.35rem 0 0",
                        color: "var(--secondary-text)",
                        fontSize: "0.85rem",
                        lineHeight: 1.45,
                      }}
                    >
                      {description}
                    </p>
                  </div>
                  <StandardSlider
                    min={min}
                    max={max}
                    variant={type}
                    value={sliderValues[type]}
                    onChange={handleSliderChange(type)}
                    steps={steps}
                    interactive={interactive}
                    showValueBubble={showValueBubble}
                    aria-label={`${name} slider`}
                  />
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      fontSize: "0.8rem",
                      color: "var(--secondary-text)",
                    }}
                  >
                    <span>
                      Range: {min} – {max}
                    </span>
                    <strong
                      style={{
                        letterSpacing: "0.05em",
                        fontVariantNumeric: "tabular-nums",
                      }}
                    >
                      {Math.round(sliderValues[type])}
                    </strong>
                  </div>
                </div>
              ),
            )}
          </div>
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

        Header={() => <GenericHeader text={"Text Fields..."} />}
      >
        <div className={styles.chunk}>
          There are a few variants of text fields 'type = default'
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
    );
  };

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
    );
  };

  const DataDisplaySection = () => {
    const [val, setval] = useState(50);
    const [upper, setupper] = useState(100);

    return (
      <Section
        sticky={true}
        // color="dark"

        Header={() => (
          <GenericHeader text={"Progress bars are used for data display etc"} />
        )}
      >
        <div className={styles.chunk}>
          <h4>Progress Bars</h4>
          <p> define as animated? showval? showbounds? </p>
          <br />
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
    );
  };
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
                "Test title",
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

        Header={() => <GenericHeader text={"Radial Mens are fun?"} />}
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
    );
  };

  const GlassSection = () => {};

  return (
    <ScrollableVerticalView trackScrollPercent>
      <IntroSection />
      {/* <IntroSection/> */}
      <NavSection />
      <ModalSection />
        <TabSection/>
      <ToggleShowcaseSection />
      <DividerSection />
      <AlertSection />
      <ShareSection />
      <SliderShowcaseSection />
      <TextInputSection />
      <ImageInteractionsSection />
      <CollapsableSection />
      <DataDisplaySection />
      <DropDownSection />
      <RadialMenuSection />
    </ScrollableVerticalView>
  );
};
