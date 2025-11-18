import React, { useState, useEffect, Component } from "react";
import { useProjects } from "../contexts/ContentContext";
import ProgressBar from "../components/UI/StandardLib/ProgressBar.jsx";
import styles from "./styles/SettingsPage.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { StandardButton } from "../components/UI/StandardLib/StandardButton.jsx";
import StandardToggle from "../components/UI/StandardLib/StandardToggle.jsx";
import { useNavigate } from "react-router-dom";
import getIcon from "../utils/Iconifier";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";
import RowView from "../components/UI/RowView";
import DarkModeToggle from "../components/UI/darkmodeToggleSmallInline.jsx";
import useScreenSize from "../utils/screensize";
import { Navigate } from "react-router-dom";
import { ScrollableVerticalView } from "../components/Containers/Scroll/ScrollableViews/ScrollableVerticalView";
import GlassPushOverlay from "../components/UI/InteractionContainers/GlassContainer.jsx";
import { CenteredContainer } from "../components/Containers/Scroll/CenteredContainer";

// settingsConfig.js
const settingsConfig = [
  { type: "label", label: "Miscellaneous Settings" },

  {
    type: "toggle",
    label: "Dark Mode Again",
    component: "DarkModeWrapper",
  },
  {
    type: "toggle",
    label: "Reduce Motion (coming soon)",
    disabled: true,
  },
  {
    type: "toggle",
    label: "Enable BG Animation",
    prop: "animatebg",
    toggle: "toggleAnimateBg",
    firsticon: "tick",
    secondicon: "cross",
  },
  { type: "label", label: "Random Things Area" },

  {
    type: "toggle",
    label: "Ridiculous Article Mode",
    prop: "themeoverride",
    toggle: "toggleThemeOverride",
    firsticon: "joke",
    secondicon: "smile",
  },
  {
    type: "toggle",
    label: "Enable all the development stuff",
    prop: "isDev",
    toggle: "ToggleIsDev",
    firsticon: "projects",
    secondicon: "yeti",
  },

  { type: "label", label: "Links" },

  {
    type: "button",
    label: "Article to JSON Editor",
    buttonLabel: "Go",
    icon: "editor",
    route: "/editor",
  },
  {
    type: "button",
    label: "Open Legacy Site",
    buttonLabel: "Open Site",
    icon: "editor",
    external: "https://2of.github.io/site/",
  },
  {
    type: "button",
    label: "See Junk Page",
    buttonLabel: "Go",
    icon: "sun",
    route: "/junk",
  },

  {
    type: "button",
    label: "Directory",
    buttonLabel: "Open Directory",
    icon: "dir",
    route: "/dir",
  },
];

export const SettingsPage = () => {
  const {
    prefersCol,
    togglePrefersColumnView,
    openShareSheet,
    themeoverride,
    toggleThemeOverride,
    isDev,
    ToggleIsDev,
    animatebg,
    toggleAnimateBg,
  } = useGlobalContext();

  const navigate = useNavigate();
  const screenSize = useScreenSize();
  const mobile = screenSize === "sm";

  const renderComponent = (row) => {
    switch (row.type) {
      case "toggle":
        if (row.component === "DarkModeWrapper")
          //kinda being lazy here...
          return <DarkModeWrapper type="box" />;
        if (row.disabled) return <StandardToggle type="box" disabled />;
        return (
          <StandardToggle
            type="box"
            callback={() => eval(row.toggle)}
            checked={eval(row.prop)}
            firsticon={getIcon(row.firsticon)}
            secondicon={getIcon(row.secondicon)}
          />
        );
      case "button":
        return (
          <StandardButton
            label={row.buttonLabel}
            type="basic_small"
            icon={getIcon(row.icon)}
            callback={() => {
              if (row.route) navigate(row.route);
              if (row.external) window.open(row.external, "_blank");
            }}
          />
        );
      default:
        return null;
    }
  };

  const mappedRows = settingsConfig.map((row) => ({
    label: row.label,
    paragraph: row.paragraph,
    disable: row.disabled,
    component: renderComponent(row),
  }));

  return (
    <>
      {screenSize === "sm" ? (
        <>
          <ScrollableVerticalView alignCenter={screenSize !== "sm"}>
            <RowView mobile={mobile} rows={mappedRows} />
          </ScrollableVerticalView>
          <div className={styles.spacer} />
        </>
      ) : (
        <CenteredContainer>
          <div className={styles.content}>
            {" "}
            <RowView mobile={mobile} rows={mappedRows} />
          </div>
        </CenteredContainer>
      )}
    </>

    // </ScrollableVerticalView>
  );
};
