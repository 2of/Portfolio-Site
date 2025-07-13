import React, { useState, useEffect } from "react";
// Import the JSON file directly


export const AboutPage = () => {
  // State to hold the JSON content
  // const [jsonContent, setJsonContent] = useState(projectContentSchema);

  return (
    <div className="GenericPageContainer centered">
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

      </section>

      <footer>
  Photo by <a href="https://unsplash.com/@pawel_czerwinski" target="_blank" rel="noopener noreferrer">Pawel Czerwinski</a> on <a href="https://unsplash.com/photos/a-close-up-of-a-black-and-white-pattern-upjMhfYKfdc" target="_blank" rel="noopener noreferrer">Unsplash</a>
</footer>
    </div>
  );
};
