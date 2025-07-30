// routes/routes.js
import PageWrapper from "../layouts/PageWrapper";

import { ChessPage } from "../pages/ChessRatingPage";
import { HomePage } from "../pages/Home/HomePage";
import { JunkPage } from "../pages/JunkPage";
import { CataloguePage } from "../pages/Catalogue";
import { ProjectPage } from "../pages/ProjectPage";
import { AboutPage } from "../pages/AboutPage";
import { SettingsPage } from "../pages/SettingsPage";
import { PlaygroundPage } from "../components/Test/TestPages/TEST_Playground";
import { EditorPage } from "../components/Editor/EditorPage";

const routes = [
  {
    path: "/",
    label: "home",
    icon: "home",
    element: <HomePage />,
    mobileMenuBg: true,
    bg: "shapes",
  },
  {
    path: "/proj",
    label: "projects",
    element: <CataloguePage />,
    icon: "Catalogue",
    mobileMenuBg: true,
    bg: "bg",
  },
  {
    path: "/junk",
    label: "junk",
    hide: true,
    element: <JunkPage />,
    icon: "junk",
    mobileMenuBg: true,
  },
  {
    path: "/chess",
    label: "elo estimator",
    element: <ChessPage />,
    icon: "chess",
    hide: true,
    mobileMenuBg: true,
  },
  {
    path: "/proj/:projectId",
    label: "project details",
    element: <ProjectPage />,
    icon: "Catalogue",
    hide: true,
  },
  {
    path: "/about",
    label: "About",
    element: <AboutPage />,
    icon: "about",
    hide: false,
    bg: "bg",
  },
  {
    path: "/settings",
    label: "Preferences",
    element: <SettingsPage />,
    icon: "settings",
    hide: false,
    bg: "shapes",
  },
  {
    path: "/editor",
    label: "editor",
    element: <EditorPage />,
    icon: "smile",
    hide: true,
    bg: "bg",
  },
];


export default routes;