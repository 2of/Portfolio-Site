import React, { useState, useEffect, Component } from "react";
import { useProjects } from "../contexts/ContentContext";
import ProgressBar from "../components/UI/ProgressBar";
import styles from "./AboutPage.module.scss";
import { useGlobalContext } from "../contexts/GlobalContext";
import { StandardButton } from "../components/UI/StandardButton";
import StandardToggle from "../components/UI/StandardToggle";
import { useNavigate } from "react-router-dom";
import getIcon from "../utils/Iconifier";
import { DarkModeWrapper } from "../components/UI/DarkModeWrapper";
import RowView from "../components/UI/RowView";
import DarkModeToggle from "../components/darkmodeToggleSmallInline";
import useScreenSize from "../utils/screensize";
import { Navigate } from "react-router-dom";
import { ScrollableVerticalView } from "../components/Scroll/ScrollableViews/ScrollableVerticalView";
export const SettingsPage = () => {
  const {
    prefersCol,
    togglePrefersColumnView,
    openShareSheet,
    themeoverride,
    toggleThemeOverride,
    isDev,
    ToggleIsDev,
    animatebg, setAnimateBg, toggleAnimateBg
    
  } = useGlobalContext();
  const { getAboutData } = useProjects();
  const [about, setAbout] = useState(null);

  const screenSize = useScreenSize();
  const mobile = screenSize === "sm";
  const navigate = useNavigate();
  return (
    <ScrollableVerticalView staggerStart>
      <section>
        <RowView
          mobile = { 
            screenSize === "sm"
          }
          rows={[
            {
              label: " Miscellaneous Settings",
            },

            {
              label: " Dark Mode Again",
              component: <DarkModeWrapper type={!mobile ? "box" : "box"} />,
            },

            {
              disable: true,
              label: " Reduce Motion (coming soon)",
              component: <StandardToggle type={!mobile ? "box" : "box"} />,
            }, {
              label: `Enable BG Animation`,
              component: (
                <StandardToggle
                  type={!mobile ? "box" : "box"}
                  callback={() => toggleAnimateBg}
                  checked={animatebg}
                  firsticon={getIcon("tick")}
                  secondicon={getIcon("cross")}
                />
              ),
            },
{
              label: " Random Things Area",
            },
            {
              label: " See Junk Page",
              component: (
                <StandardButton
                  label="Go"
                  type="article"
                  icon={getIcon("sun")}

                  callback={() => {
                    navigate("/junk");
                  }}
                />
              ),
            },
           
            {
              label: `Ridiculous Article Mode:  ${
                themeoverride ? "on, go open an article" : "off"
              }`,
              component: (
                <StandardToggle
                  type={!mobile ? "box" : "box"}
                  callback={() => toggleThemeOverride}
                  checked={themeoverride}
                  firsticon={getIcon("joke")}
                  secondicon={getIcon("smile")}
                />
              ),
            },
             {
              label: `Enable all the development stuff`,
              component: (
                <StandardToggle
                  type={!mobile ? "box" : "box"}
                  callback={() => ToggleIsDev}
                  checked={isDev}
                  firsticon={getIcon("projects")}
                  secondicon={getIcon("yeti")}
                />
              ),
            },

              {
              label: "Article to JSON Editor",
              component: (
                <StandardButton
                  label="Go"
                  type="article"
                  icon={getIcon("editor")}

                  callback={() => {
                    navigate("/editor");
                  }}
                />
              ),
            },
            {
              label: " That's all",
              paragraph:
                "Well thanks for having a look around. This is my little hand done website",
            },
             {
              label: " Attribution",
              paragraph:
                "SVGS: https://github.com/MariaLetta/mega-doodles-pack Mega Doodles Pack ",
            },
          ]}
        />
      </section>
    </ScrollableVerticalView>
  );
};
