import React from 'react';

export const DefaultProjPage = ({ project, onClose }) => {
  return (
    <div>
      <h1>{project.Title}</h1>
      <p>{project.Subtitle}</p>
      <div>
        <h2>Technologies</h2>
        <ul>
          {project.Technologies.map((tech, index) => (
            <li key={index}>{tech}</li>
          ))}
        </ul>
      </div>
      <button onClick={onClose}>Close</button>
    </div>
  );
};