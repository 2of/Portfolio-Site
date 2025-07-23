import React, { useState } from "react";
import getIcon from "../../../utils/Iconifier";
import NavMenuIconMobile from "../../Nav/MobileIcon"; // or wherever your file is
import MobileNavMenu from "../../Nav/MobileNavMenu";
import DesktopNav from "../../Nav/DesktopNav";

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

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Playground</h1>


    <DesktopNav/>
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
        <button onClick={openMenu} disabled={isVisible} style={{ marginRight: 10 }}>
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
      </section>
    </div>
  );
};