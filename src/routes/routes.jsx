import { ChessPage } from "../pages/ChessRatingPage";
import { HomePage } from "../pages/Home/HomePage";
import { JunkPage } from "../pages/JunkPage";
import { CataloguePage } from "../pages/Catalogue";
import { ProjectPage } from "../pages/ProjectPage";
import { AboutPage } from "../pages/AboutPage";
import { SettingsPage } from "../pages/SettingsPage";
import { PlaygroundPage } from "../components/Test/TestPages/TEST_Playground";

import { EditorPage } from "../components/Editor/EditorPage";
// import { TEST_ScrollViewGeneric } from "../components/Test/TestPages/ScrollViewGeneric1";
// import { TEST_cataloguePage } from "../components/Test/TestPages/TEST_Catalogue";
// import { TEST_AboutPage } from "../components/Test/TestPages/TEST_About";


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
    icon: "Catalogue",    mobileMenuBg: true,
    bg: "shapes",
  },
  {
    path: "/junk",
    label: "junk",
    hide: true,
    element: <JunkPage />,
    icon: "junk",    mobileMenuBg: true,


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
    
    hide: true, // Hidden from nav menus
  },
    {
    path: "/about",
    label: "About",
    element: <AboutPage />,
    icon: "about",
    hide: false, // Hidden from nav menus
        bg: "shapes"
  },
   {
    path: "/settings",
    label: "Preferences",
    element: <SettingsPage />,
    icon: "settings",
    hide: false, // Hidden from nav menus
    bg: "shapes",
  },    {
    path: "/editor",
    label: "editor",
    element: <EditorPage />,
    icon: "smile",
    hide: true, // Hidden from nav menus
    bg: "bg",
  },  





];

export default routes;