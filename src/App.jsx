import React from "react"; // Make sure React is imported if AppContent is in a separate file
import { HashRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider, useGlobalContext } from "./contexts/GlobalContext";
import routes from "./routes/routes";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import './styles/App.scss'
import { TooltipProvider } from "./contexts/tooltip";
import { ProjectProvider } from "./contexts/ContentContext";
import { AlertMenuProvider } from "./contexts/AlertMenuContext";

function App() {
  return (
    <GlobalProvider>
      <ProjectProvider>
        <TooltipProvider>
          <AlertMenuProvider>

          <AppContent />
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
        {/* All routes that should use MainLayout, including the 404 page */}
        <Route element={<MainLayout />}>
          {/* Dynamically render routes from the routes array */}
          {routes.map((route) => (
            <Route
              key={route.path}
              path={route.path}
              element={route.element}
            />
          ))}

          {/* 404 Route - NOW INSIDE MainLayout */}
          <Route path="/404" element={<NotFoundPage />} />

          {/* If the route doesn't match any, redirect to the /404 route - NOW INSIDE MainLayout */}
          {/* This means any unmatched route will also render with the MainLayout */}
          <Route path="*" element={<Navigate to="/404" />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;