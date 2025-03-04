import { HomePage } from "../pages/HomePage/HomePage";
import { JunkPage } from "../pages/JunkPage";
import { ProjectsPage } from "../pages/ProjectsPage";
import ScrollyTesterPage from "../testComponents/scrollyTesterPage";

const routes = [
    {
      path: "/",
      label: "Home",
      element: <HomePage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
    {
      path: "/projects",
      label: "projects",
      element: <ProjectsPage/>,
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
      path: "/contact",
      label: "Contact",
      element: <h1>Contact Us</h1>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
    {
      path: "/services",
      label: "Services",
      element: <h1>Our Services</h1>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
    {
      path: "/test",
      label: "test",
      element:<ScrollyTesterPage/>,
      fullscreen_fullNav: false,
      mobile_fullNav: false,
    },
  ];
  
  export default routes;
  