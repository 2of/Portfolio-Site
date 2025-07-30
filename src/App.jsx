import React from "react"; // Make sure React is imported if AppContent is in a separate file
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { GlobalProvider, useGlobalContext } from "./contexts/GlobalContext";
import routes from "./routes/routes";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./styles/App.scss";
import { TooltipProvider } from "./contexts/tooltip";
import { ProjectProvider } from "./contexts/ContentContext";
import { AlertMenuProvider } from "./contexts/AlertMenuContext";
import { ScreenSizeProvider } from "./contexts/ScreenSizeProvider";

function App() {
  return (
    <GlobalProvider>
      <ProjectProvider>
        <TooltipProvider>
          <AlertMenuProvider>
            <ScreenSizeProvider>
              <AppContent />
              {/* getting big :o  */}
            </ScreenSizeProvider>
          </AlertMenuProvider>
        </TooltipProvider>
      </ProjectProvider>
    </GlobalProvider>
  );
}

const AppContent = () => {
  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          {routes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}

          {/* 404 Route - NOW INSIDE MainLayout */}
          <Route path="/404" element={<NotFoundPage />} />

          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
