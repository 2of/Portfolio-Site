import React, { useState, useEffect } from "react";
// Import the JSON file directly
import projectContentSchema from "../assets/ProjectContent_SCHEMA.json";
import ColumnWithSections from "../components/ColumnWithSections";

export const AboutPage = () => {
  // State to hold the JSON content
  const [jsonContent, setJsonContent] = useState(projectContentSchema);

  return (
    <div className="GenericPageContainer">
      <section>
        <h2>Introduction</h2>
        <p>Welcome to my about page! Here you can learn more about me and my work.</p>
      </section>

      <section>
        <h2>Skills</h2>
        <p>I have experience in IT work, networking, and web development.</p>
      </section>

      <section>
        <h2>Notes on the website</h2>
        <p>I kinda wanted a 'newspaper column' theme</p>
        <p>Columns are therefore defined using this JSON SCHEMA, and because i'm a very lazy person, I made a WYSIWYG editor on another page</p>

        {/* Displaying the JSON content as raw code */}
        {jsonContent && (
          <section>


            <div className="horizontalContainer">
                <div>
                <h3>Project Content JSON Schema</h3>
            <pre>

              <code>{JSON.stringify(jsonContent[1], null, 2)}</code>
            </pre>


                </div>

<div>
<h3>Nice Pretty Column</h3>

<ColumnWithSections data={projectContentSchema[1]}/>
</div>
            </div>
    

       
            {/* <ColumnWithSections data={projectContentSchema[1]}/> */}
          </section>
        )}
      </section>
    </div>
  );
};
