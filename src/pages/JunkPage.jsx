import ImageHandle from "../components/ImageHandle";
import image from "../assets/images/default.png"
import image2 from "../assets/images/default_other.jpeg"

import { useProjects } from "../contexts/ContentContext";

import { useState, useEffect } from "react";
import { StandardButton } from "../components/UI/StandardButton";

export const JunkPage = () => {
  const { getArticle, getListOfArticles } = useProjects();
  const [article, setArticle] = useState(null);
  const [articlesList, setArticlesList] = useState([]);


  useEffect(() => {
    const list = getListOfArticles();
    setArticlesList(list);
    console.log(list)

  }, [getListOfArticles]);
  const handleButtonClick = () => {
    console.log("Button clicked!"); // Log a message to the console
    alert("You clicked the button!"); // Show an alert
    // You can add any other logic here, such as updating state, making API calls, etc.
  };
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
        <StandardButton
          label="Do stuff"
          callback={handleButtonClick}/>
          <ImageHandle src={image} alt="test" />
          <ImageHandle src={image} alt="test" />
          <ImageHandle src={image2} alt="test" />
        
        </secton>
      
 
      </div>
    </>
  );
};
