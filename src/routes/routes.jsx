import { AboutPage } from "../pages/AboutPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { JunkPage } from "../pages/JunkPage";
import { NewProjectPage } from "../pages/NewProjectsPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import ScrollyTesterPage from "../testComponents/scrollyTesterPage";

const routes = [
    {
      path: "/",
      label: "home",
      element: <HomePage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },

    {
      path: "/junk",
      label: "junk",
      element:<JunkPage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
    {
      path: "/Projects",
      label: "projects",
      element:<NewProjectPage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
    {
      path: "/about",
      label: "about",
      element: <AboutPage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
    
  ];
  
  export default routes;
  