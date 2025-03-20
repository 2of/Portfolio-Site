import { AboutPage } from "../pages/AboutPage";
import { Carousel } from "../pages/CarouselPage";
import { HomePage } from "../pages/HomePage/HomePage";
import { HomePage2 } from "../pages/HomePage2";
import { JunkPage } from "../pages/JunkPage";
import { NewProjectPage } from "../pages/NewProjectsPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import ScrollyTesterPage from "../testComponents/scrollyTesterPage";

const routes = [
    // {
    //   path: "/",
    //   label: "home",
    //   element: <HomePage/>,
    //   fullscreen_fullNav: false,
    //   mobile_fullNav: false,
    // },
    {
      path: "/",
      label: "home",
      element: <HomePage2/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
      transparentnav: true
    },

    // {
    //   path: "/junk",
    //   label: "junk",
    //   element:<JunkPage/>,
    //   fullscreen_fullNav: false,
    //   mobile_fullNav: false,
    // },
    {
      path: "/Projects",
      label: "projects",
      element:<NewProjectPage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
      transparentnav: false
    },
    {
      path: "/Junk",
      label: "junk",
      element:<JunkPage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
      transparentnav: false
    },
    // {
    //   path: "/about",
    //   label: "about",
    //   element: <AboutPage/>,
    //   fullscreen_fullNav: false,
    //   mobile_fullNav: false,
    //   transparentnav: false
    // }
    
  ];
  
  export default routes;
  