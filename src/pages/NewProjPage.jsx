
// src/pages/ProjectDetailsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useProjects } from "../contexts/ContentContext";
// import ColumnWithSections from "../components/Column/ColumnWithSections";
import { Article } from "../components/Article/Article";
import { DocumentWrapper } from "../components/Document/DocumentWrapper";
import { meta } from "@eslint/js";

const NewProjPage = () => {
  const { getArticleMetaData } = useProjects();
  const { projectId } = useParams();
  
  const [metaData, setMetaData] = useState(null);
  const [state, setState] = useState("wait");

  useEffect(() => {
    const _metadata = getArticleMetaData(projectId);

    if (!_metadata) {
      console.warn("[ProjectPage] No metadata found for:", projectId);
      setState("MetaDataFailure");
      return;
    }

    setMetaData(_metadata);
    setState("ready");
  }, [projectId, getArticleMetaData]);

  if (state === "MetaDataFailure") {
    return <div className="GenericPageContainer centered">
        <h2>Selected Project {projectId} Not Found</h2>
    </div>;
  }

  if (state !== "ready") {
    return <p>Loading project metadata...</p>;
  }

  return (
<div className="GenericPageContainer full">
    {/* <DocumentWrapper metadata={metaData} /> */}

    <DocumentWrapper metadata={metaData}/>
        {metaData.title} test
      {/* <Article
        // twoColumns={true}
        fullLink={false}
        metadata={metaData}
        AsArticle={true}
        style="modern"
      /> */}
    </div>
  );
};

export { NewProjPage };