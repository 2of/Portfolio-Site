// App.jsx
import React from "react";
import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import routes from "./routes/routes";
import MainLayout from "./layouts/MainLayout/MainLayout";
import { NotFoundPage } from "./pages/NotFoundPage";
import "./styles/App.scss";
import { ContextWrapper } from "./contexts/ContextWrapper";

function App() {
  return (
    <Router>
      <ContextWrapper>
        <AppContent />
      </ContextWrapper>
    </Router>
  );
}

const AppContent = () => {
  return (
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
  );
};

export default App;