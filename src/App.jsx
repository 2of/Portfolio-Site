import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { GlobalProvider, useGlobalContext } from "./contexts/GlobalContext"; // Import GlobalProvider and useGlobalContext
import routes from "./routes/routes"; // Import routes
import MainLayout from "./layouts/MainLayout/MainLayout"; // Import MainLayout
import { NotFoundPage } from "./pages/NotFoundPage"; // Import NotFoundPage
import './styles/App.scss'
import { TooltipProvider } from "./contexts/tooltip";
import { ProjectProvider } from "./contexts/ContentContext";
function App() {
  return (
    // Wrap the entire app with GlobalProvider to provide global state
    <GlobalProvider> 
      <ProjectProvider>
      <TooltipProvider>
      <AppContent />
      
      </TooltipProvider>
      </ProjectProvider>
    </GlobalProvider>
  );
}

const AppContent = () => {
  const { basename } = useGlobalContext(); // Access basename from GlobalContext

  return (
    // <Router basename={basename}> {/* Use the basename from context */}
    //   <Routes>
    //     {/* Routes that use MainLayout */}
    //     <Route element={<MainLayout />}>
    //       {/* Dynamically render routes from the routes array */}
    //       {routes.map((route) => (
    //         <Route 
    //           key={route.path} 
    //           path={route.path} 
    //           element={route.element} 
    //         />
    //       ))}
    //     </Route>

    //     {/* 404 Route (doesn't use MainLayout) */}
    //     {/* <Route path="/404" element={<NotFoundPage />} /> */}

    //     {/* If the route doesn't match any, redirect to the /404 route */}
    //     {/* <Route path="*" element={<Navigate to="/404" />} /> */}
    //   </Routes>
    // </Router>
    <h1>test</h1>
  );
}

export default App;
