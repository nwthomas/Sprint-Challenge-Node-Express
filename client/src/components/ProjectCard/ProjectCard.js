import React from "react";

const ProjectCard = props => {
  return (
    <div>
      <h2>Name: {props.project.name}</h2>
      <p>Description: {props.project.description}</p>
      <p>ID: {props.project.id}</p>
    </div>
  );
};

export default ProjectCard;
