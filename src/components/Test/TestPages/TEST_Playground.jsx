import React, { useState } from "react";
import getIcon from "../../../utils/Iconifier";
import { NavMenuIconMobile } from "../../Nav/MobileIcon"; // or wherever your file is
import MobileNavMenu from "../../Nav/MobileNavMenu";
import DesktopNav from "../../Nav/DesktopNav";
import { RichTabShowCaseView } from "../../Containers/RichTabShowcaseView";
import LinkedinCard from "../../Cards/PreDoneCards/LinkedInCard";
import GithubCard from "../../Cards/PreDoneCards/GithubCard";
// import { RichTabData } from "../../../assets/TextAssets/ShowCaseTabRich";
import { useProjects } from "../../../contexts/ContentContext";
import { ModernButton } from "../../UI/StandardLib/Buttons/Button";
// Move testVariants outside the component to memoize the functions/icons
const testVariants = [
  {
    label: "Menu",
    icon: getIcon("menu"),
    bgColor: "#f0f0f0",
    callback: () => console.log("menu"),
  },
  {
    label: "Close",
    icon: getIcon("close"),
    bgColor: "#ffe0e0",
    callback: () => console.log("close"),
  },
  {
    label: "Settings",
    icon: getIcon("settings"),
    bgColor: "#e0f7fa",
    callback: () => console.log("settings"),
  },
  {
    label: "User",
    icon: getIcon("user"),
    bgColor: "#e0ffe0",
    callback: () => console.log("user"),
  },
];

export const PlaygroundPage = () => {
  const [index, setIndex] = useState(0);
  const [isCollapsed, setIsCollapsed] = useState(true);
  const [isAnimatingIn, setIsAnimatingIn] = useState(false);
  const [isAnimatingOut, setIsAnimatingOut] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [direction, setDirection] = useState("vertical");
  const { getSectionMetaData } = useProjects();

  const testSectionClick = () => {
    // alert("TEST")
    // console.log(getSectionMetaData({ sectionName: "test" }));
    console.log(getSectionMetaData("featured"))



  }
  const next = () => {
    setIndex((prev) => (prev + 1) % testVariants.length);
  };

  const openMenu = () => {
    setIsVisible(true);
    setIsAnimatingIn(true);
    setIsCollapsed(false);
    setIsAnimatingOut(false);
    setTimeout(() => setIsAnimatingIn(false), 650);
  };

  const closeMenu = () => {
    setIsAnimatingOut(true);
    setIsAnimatingIn(false);
    setTimeout(() => {
      setIsAnimatingOut(false);
      setIsVisible(false);
      setIsCollapsed(true);
    }, 650);
  };

  const { label, icon, bgColor, callback } = testVariants[index];

  const DummyCard = ({ text }) => (
    <div
      style={{ padding: "1rem", border: "1px solid #ccc", borderRadius: "8px" }}
    >
      <h3>{text}</h3>
      <p>This is a dummy card for demonstration purposes.</p>
    </div>
  );

  const tabData = [
    {
      name: "AI Assistant",
      tabdata: {
        icon: "school",
        title: " Machine Learning Street Level GeoLocalization Model(s)",
        subtitle: "Master's Project",
        description:
          "GeoLocalization Model (think GeoGuessr Bot) for street level imagery trained using a derived dataset from fine tuned object detection models, OCR, Colour space to a 1.3km accuracy from a 20km random, non uniform, distribution ",
        links: [
          { to: "https://openai.com", label: "Learn More", icon: "link" },
          { to: "#", label: "Try Demo", icon: "play" },
        ],
      },
      richdata: <LinkedinCard text="AI Assistant Overview" />,
    },
    {
      name: "Analytics Dashboard",
      tabdata: {
        icon: "chart",
        title: "Portfolio REACT site",
        subtitle: "Web + Front End",
        description:
          "That's this website, actually, It's written more or less from scratch in React with SCSS",
        links: [
          { to: "#", label: "thingies.dev", icon: "book" },
          { to: "#", label: "Repo", icon: "dashboard" },
        ],
      },
      richdata: <DummyCard text="Analytics Overview" />,
    },
    {
      name: "Third thing",
      tabdata: {
        icon: "chart",
        title: "thrd thingd",
        subtitle: "things",
        description:
          "A powerful dashboard thatovides data insights in real-time.ovides data insights in real-time.ovides data insights in real-time. provides data insights in real-time.",
        links: [
          { to: "#", label: "View Docs", icon: "book" },
          { to: "#", label: "Open Dashboard", icon: "dashboard" },
        ],
      },
      richdata: <DummyCard text="Analytics Overview" />,
    },
  ];

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Playground</h1>

      <h2>Code Variants</h2>
      <ModernButton variant="code" icon={getIcon("apple")} label="code" tooltip="Favorite" />
      <ModernButton variant="code" icon={getIcon("apple")} fixeddarkmode label="code dark" tooltip="Favorite" />
      <ModernButton variant="code_small" icon={getIcon("apple")} fixedwhitemode label="code small" tooltip="Favorite" />

      <h2>New Variants</h2>
      <ModernButton variant="rounded" icon={getIcon("star")} label="Rounded" tooltip="Rounded button" />
      <ModernButton variant="icon_only" icon={getIcon("heart")} tooltip="Icon only" />
      <ModernButton variant="featured" icon={getIcon("rocket")} label="Featured Button" tooltip="Featured" />
      <ModernButton variant="rounded_tag" icon={getIcon("tag")} label="Tag" tooltip="Tag button" />
      <ModernButton variant="modern" icon={getIcon("sparkles")} label="Modern" tooltip="Modern button" />

      <h2>Fixed Modes</h2>
      <ModernButton variant="rounded" icon={getIcon("sun")} label="Light Mode" fixedwhitemode tooltip="Fixed white" />
      <ModernButton variant="rounded_tag" icon={getIcon("moon")} label="Dark Mode" fixeddarkmode tooltip="Fixed dark" />

      <h2>External Links</h2>
      <ModernButton variant="code" icon={getIcon("link")} label="External Code" external tooltip="External link" />
      <ModernButton variant="rounded" icon={getIcon("globe")} label="External Rounded" external tooltip="External link" />
      <ModernButton variant="icon_only" icon={getIcon("external")} external tooltip="External icon" />
      <ModernButton variant="featured" icon={getIcon("star")} label="External Featured" external tooltip="External link" />
      <ModernButton variant="rounded_tag" icon={getIcon("tag")} label="External Tag" external tooltip="External link" />
      <ModernButton variant="modern" icon={getIcon("rocket")} label="External Modern" external tooltip="External link" />

      <h2>DevStyle Variants</h2>
      <ModernButton variant="dev" icon={getIcon("code")} label="Dev Standard" tooltip="Dev Standard" />
      <ModernButton variant="dev_simple" icon={getIcon("terminal")} label="Dev Simple" tooltip="Dev Simple" />
      <ModernButton variant="dev_highlight" icon={getIcon("sparkles")} label="Dev Highlight" tooltip="Dev Highlight" />

      <h2>Other Variants</h2>
      <ModernButton variant="default" icon={getIcon("apple")} label="test" tooltip="Favorite" />
      <ModernButton variant="link" icon={getIcon("apple")} label="test" tooltip="Favorite" />
      <button onClick={() => testSectionClick()}>CLICKY</button>
      {/* <RichTabShowCaseView data={RichTabData} />; */}
      {/* <DesktopNav />
      <section>
        <h2>NavMenuIconMobile Test</h2>
        <NavMenuIconMobile
          label={label}
          icon={icon}
          bgColor={bgColor}
          currentCallback={callback}
        />
        <button
          onClick={next}
          style={{
            marginTop: "1rem",
            padding: "0.5rem 1rem",
            fontSize: "1rem",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        >
          Cycle Variant
        </button>
      </section>
      <section style={{ marginTop: "3rem" }}>
        <h2>MobileNavMenu Test</h2>
        <button
          onClick={openMenu}
          disabled={isVisible}
          style={{ marginRight: 10 }}
        >
          Open Menu
        </button>
        <button onClick={closeMenu} disabled={!isVisible}>
          Close Menu
        </button>

        <MobileNavMenu
          isCollapsed={isCollapsed}
          isAnimatingIn={isAnimatingIn}
          isAnimatingOut={isAnimatingOut}
          isVisible={isVisible}
          direction={direction}
          triggerCollapseAnimation={closeMenu}
        />
      </section>*/}
    </div>
  );
};
