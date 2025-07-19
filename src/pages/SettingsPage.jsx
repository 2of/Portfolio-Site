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
export const SettingsPage = () => {
  const {
    prefersCol,
    togglePrefersColumnView,
    openShareSheet,
    themeoverride,
    toggleThemeOverride,
    isDev,
    ToggleIsDev
  } = useGlobalContext();
  const { getAboutData } = useProjects();
  const [about, setAbout] = useState(null);

  const screenSize = useScreenSize();
  const mobile = screenSize === "sm";
  const navigate = useNavigate();
  return (
    <div className="GenericPageContainer centered">
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
              label: " That's all",
              paragraph:
                "Well thanks for having a look around. This is my little hand done website",
            },
          ]}
        />
      </section>
    </div>
  );
};
