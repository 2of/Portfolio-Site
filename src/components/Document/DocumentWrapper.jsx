import React, { useState, useEffect } from "react";
import { useProjects } from "../../contexts/ContentContext";
import Loader from "../UI/StandardLib/Loader.jsx";
import { HeaderDesktopDoc } from "./HeaderDesktopDoc";
import { meta } from "@eslint/js";

/* 
Takes in metadata object and fetches the article content.
If fixeddata is provided, it uses that instead of fetching.

*/

export const DocumentWrapper = ({ metadata, fixeddata }) => {
  const { getArticle } = useProjects();
  const [loadingState, setLoadingState] = useState("wait");
  const [data, setData] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      if (fixeddata) {
        setData(fixeddata);
        setLoadingState("ready");
        return;
      }

      if (!metadata) {
        console.warn("[DocumentWrapper] No metadata provided");
        setLoadingState("fail");
        return;
      }

      const result = await getArticle(metadata);
      if (!result || typeof result !== "object" || Array.isArray(result)) {
        console.warn("[DocumentWrapper] Invalid article structure:", result);
        setLoadingState("fail");
        return;
      }

      setData(result);
      setLoadingState("ready");
    };

    fetchData();
  }, [metadata, fixeddata, getArticle]);

  if (loadingState === "wait") {
    return <Loader />;
  }

  if (loadingState === "fail") {
    return <h1>Failed to load article</h1>;
  }

  return (
    <div className="DocumentWrapper">
      {/* Replace this with your actual article rendering */}
      <HeaderDesktopDoc 
      title={data.title} 
      subtitle={data.subtitle}g
      tags={metadata.details.tags}
      author={data.author}
        date={data.date}
        herolinks={data.herolinks}
        extratext={data.extratext}
        heroimage={data.heroImage}
        icon={metadata.icon}
       />
      <div>{data.content || "No content available."}</div>
    </div>
  );
};
