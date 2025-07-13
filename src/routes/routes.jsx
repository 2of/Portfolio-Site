import { ChessPage } from "../pages/ChessRatingPage";
import { HomePage } from "../pages/Home/HomePage";
import { JunkPage } from "../pages/JunkPage";
import { CataloguePage } from "../pages/Catalogue";
import { ProjectPage } from "../pages/ProjectPage";
import { AboutPage } from "../pages/AboutPage";

const routes = [
  {
    path: "/",
    label: "home",
    icon: "home",
    element: <HomePage />,
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: true,
  },
  {
    path: "/proj",
    label: "projects",
    element: <CataloguePage />,
    icon: "Catalogue",
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: false,
  },
  {
    path: "/junk",
    label: "junk",
    element: <JunkPage />,
    icon: "junk",
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: false,
  },
  {
    path: "/chess",
    label: "elo estimator",
    element: <ChessPage />,
    icon: "chess",
    fullscreen_fullNav: false,
    mobile_fullNav: false,
        hide: true, 
    transparentnav: false,
  },
  {
    path: "/proj/:projectId",
    label: "project details",
    element: <ProjectPage />,
    icon: "Catalogue",
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: true,
    hide: true, // Hidden from nav menus
  },
  //   {
  //   path: "/about",
  //   label: "About",
  //   element: <AboutPage />,
  //   icon: "about",
  //   fullscreen_fullNav: false,
  //   mobile_fullNav: false,
  //   transparentnav: true,
  //   hide: false, // Hidden from nav menus
  // },
];

export default routes;