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
import { NewChessPage } from "../pages/NewChess";
import TinderPage from "../pages/TinderPage";
import { DirectoryPage } from "../pages/DirectoryPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LandingPage } from "../pages/Landing";
// import { NewHomePage2 } from "../pages/NewHome/NewHome";
// import { LandingPage } from "../pages/NEWHomePage/LandingPage";

const routes = [
  {
    path: "/",
    label: "home",
    icon: "home",
    hideDesktop: true,
    bg: "dots",

    element: <LandingPage />,
    fullscreenDesktop: true,
    fullscreenMobile: true,
  },
  {
    path: "/projects",
    label: "projects catalogue",
    element: <CataloguePage />,
    icon: "Catalogue",
    bg: "bg",
    fullscreenMobile: true,
  },
  
  {
    path: "/junk",
    label: "Big old test page",
    extratitle: "helloworld",
    hideDesktop: true,
    hideMobile: true,
    element: <JunkPage />,
    // fullscreenDesktop: true,
    // fullscreenMobile: true,
    icon: "junk",
  },

  {
    path: "/proj/:projectId",
    label: "project details",
    element: <ProjectPage />,
    icon: "Catalogue",

    hideDesktop: true,
    hideMobile: true,

    fullscreenMobile: true,
  },
  {
    path: "/about",
    label: "about the author",
    element: <AboutPage />,
    icon: "about",
    hide: false,
    bg: "dots",
  },
    {
    path: "/404",
    label: "404",
    element: <NotFoundPage />,
    icon: "about",
    hide: false,
    bg: "shapes",
    hideDesktop: true,
    hideMobile: true
  },
  {
    path: "/ChessEloEsimator",
    label: "Chess Elo Estimator",
    element: <NewChessPage />,
    icon: "chess",
    hideDesktop: true,
    hideMobile: true,
    bg: "dots",
  },
  {
    path: "/settings",
    label: "preferences + extras",
    element: <SettingsPage />,
    icon: "settings",
    bg: "dots",
  },

  {
    path: "/editor",
    label: "Rich JSON Editor",
    element: <EditorPage />,
    icon: "smile",
    hideDesktop: true,
    hideMobile: true,

    bg: "bg",
  },

  {
    path: "/dir",
    label: "Dirr",
    element: <DirectoryPage />,
    icon: "dir",
    hideDesktop: true,
    hideMobile: true,

    bg: "dots",
  },
  {
    path: "/OLD_CHESS_ESTIMATOR_FRONT_END",
    label: "Depricated Chess",
    element: <ChessPage />,
    icon: "chess",
    hideDesktop: true,
    hideMobile: true,
    bg: "shapes",
  },
  {
    path: "/OLD_HOME_PAGE",
    label: "oldhome",
    element: <HomePage />,
    icon: "home",
    hideDesktop: true,
    hideMobile: true,
    fullscreenDesktop: true,
    fullscreenMobile: true,
    bg: "shapes",
  },
  {
    path: "/playground",
    label: "Playground Test",
    element: <PlaygroundPage />,
    icon: "home",
    hideDesktop: true,
    hideMobile: true,
    fullscreenDesktop: true,
    fullscreenMobile: true,
    bg: "shapes",
  },
];

export default routes;
