import { HomePage2 } from "../pages/HomePage2/HomePage2";
import { JunkPage } from "../pages/JunkPage";
import { NewProjectPage } from "../pages/NewProjectsPage";
const routes = [
  {
    path: "/",
    label: "home",
    element: <HomePage2/>,
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: true
  },
  {
    path: "/projects/:projectId?",  // Make parameter optional
    label: "projects",
    element: <NewProjectPage />,
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: false
  },
  {
    path: "/junk",
    label: "junk",
    element: <JunkPage/>,
    fullscreen_fullNav: false,
    mobile_fullNav: false,
    transparentnav: false
  }
];

export default routes;