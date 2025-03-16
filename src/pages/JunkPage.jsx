import ImageHandle from "../components/ImageHandle";
import image from "../assets/images/default.png"
import image2 from "../assets/images/default_other.jpeg"

import { useProjects } from "../contexts/ContentContext";

import { useState, useEffect } from "react";

export const JunkPage = () => {
  const { getArticle, getListOfArticles } = useProjects();
  const [article, setArticle] = useState(null);
  const [articlesList, setArticlesList] = useState([]);


  useEffect(() => {
    const list = getListOfArticles();
    setArticlesList(list);
    console.log(list)

  }, [getListOfArticles]);

  return (
    <>
      <div className="GenericPageContainer">
        <section>
          <h1>test</h1>

          <iframe
            src="/"
            width="100%"
            height="500px"
            style={{ border: "none" }}
          />
        </section>
        <section>
          test
        </section>
        
        <secton>
          <ImageHandle src={image} alt="test" />
          <ImageHandle src={image} alt="test" />
          <ImageHandle src={image2} alt="test" />
        </secton>
      </div>
    </>
  );
};
