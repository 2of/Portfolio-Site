import React, { createContext, useContext } from "react";
import FullProj from "../assets/ProjectText/FullProjectsContent.json";
import SmallProj from "../assets/ProjectText/ShortProjectsContent.json";
import Index from "../assets/ProjectText/index.json";
import NestSkills from "../assets/About/NestedSkills.json";

// Create Context
const ProjectContext = createContext();

// Provider Component
export const ProjectProvider = ({ children }) => {
  // Fetch an article by ID and size (large or small)
  const getArticle = (name, size = null) => {
    // Find the project in the index to determine its size
    const projectIndex = Index.find((proj) => proj.name === name);

    if (!projectIndex) {
      return null; // Project not found
    }

    // If size is specified, return the corresponding content
    if (size === "large") {
      return FullProj.find((proj) => proj.name === name) || null;
    } else if (size === "small") {
      return SmallProj.find((proj) => proj.name === name) || null;
    }

    // If no size is specified, return the content based on the index
    return projectIndex.size === "large"
      ? FullProj.find((proj) => proj.name === name) || null
      : SmallProj.find((proj) => proj.name === name) || null;
  };

  // Get a list of all article IDs and titles
  const getListOfArticles = () => {
    return Index.map((proj) => ({
      name: proj.name,
      size: proj.size, // Include size in the list if needed
    }));
  };

  // Get nested skills
  const getSkills = () => {
    return NestSkills;
  };

  return (
    <ProjectContext.Provider value={{ getArticle, getListOfArticles, getSkills }}>
      {children}
    </ProjectContext.Provider>
  );
};

// Custom Hook for easy access
export const useProjects = () => {
  return useContext(ProjectContext);
};