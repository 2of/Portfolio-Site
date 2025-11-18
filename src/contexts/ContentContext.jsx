import React, { createContext, useContext } from "react";
import metadata from "../assets/ProjectText/metadata.json";
import uniMetadata from "../assets/Metadata/uniProjects.json";
import featMetadata from "../assets/Metadata/featuredProjects.json";

import AllMetaData from "../../public/metadata/ProjectsMetadata.json"
import Sections from "../../public/metadata/ProjectsSections.json"






import NestSkills from "../assets/About/NestedSkills.json";
// import AboutData from "../assets/about/about.json";
const ProjectContext = createContext();

export const ProjectProvider = ({ children }) => {
  const getPageData = async ({ pagename }) => {
    const mapping = {
      about: "/assets/text/about.json",
      home: "/assets/text/home.json",
      skills: "/assets/text/skills.json",
    };

    if (!mapping[pagename]) {
      console.error(`[getPageData] Unknown page: ${pagename}`);
      return null;
    }

    try {
      const response = await fetch(mapping[pagename]);
      if (!response.ok) throw new Error(`Failed to fetch ${mapping[pagename]}`);
      return await response.json();
    } catch (err) {
      console.error("[getPageData] Failed to load:", err);
      return null;
    }
  };

  const getArticleMetaData = (name) => {
    console.log("[getArticleMetaData] Looking up metadata for:", name);

    if (!name || typeof name !== "string") {
      console.warn("[getArticleMetaData] Invalid name provided:", name);
      return null;
    }

    const result = metadata.find((proj) => {
      const match = proj.name === name;
      return match;
    });
    return result || null;
  };

  const getArticle = async (meta, named = "") => {
    if (named) {
      meta = getArticleMetaData(named);
    }
    if (!meta) {
      console.warn("[getArticle] No metadata provided");

      return null;
    }

    const { name, details } = meta;
    const { url } = details;
    // console.log(`[getArticle] Fetching content for "${name}" from URL: ${url}`);

    try {
      const response = await fetch(url);
      if (!response.ok) {
        console.error(`[getArticle] Network error. Status: ${response.status}`);
        return null;
      }

      const text = await response.text();

      // Detect HTML pretending to be JSON bloody
      if (
        text.trim().startsWith("<!doctype html") ||
        text.trim().startsWith("<html")
      ) {
        return null;
      }

      try {
        const json = JSON.parse(text);
        // console.log(`[getArticle] Successfully parsed JSON data for "${name}"`);
        return json;
      } catch (jsonError) {
        // console.error(`[getArticle] Failed to parse JSON for "${name}":`, jsonError);
        return null;
      }
    } catch (error) {
      console.error(`[getArticle] Error loading article "${name}":`, error);
      return null;
    }
  };
  const getAllMetaData = () => metadata;

  const getListOfArticles = () => {
    return metadata.map(({ name }) => ({ name }));
  };



  //okay i built in waaayyyy too much legacy code.
const getSectionMetaData = (sectionName) => {
    if (!Sections[sectionName]) { return []
    }

    const ids = Sections[sectionName]; // ["geo", "portfolio", ...]

    return AllMetaData.filter(project =>
        ids.includes(project.name)
    );
};


const sections = () => { 
  return Sections
}

  const getMetadata = ({which}) => { 
    //accepts 'uni', 'showcase', 'all' as props
    switch (which) {
      case "uni":
        return uniMetadata;
      case "feat":
        return featMetadata;
      case "all":
        return metadata;
      default:
        return null
    }


  }
  const getSkills = () => NestSkills;

  return (
    <ProjectContext.Provider
      value={{
        getArticle,
        getArticleMetaData,
        getAllMetaData,
        getListOfArticles,
        getSkills,
        getPageData,
        getMetadata,
        getSectionMetaData
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => useContext(ProjectContext);
