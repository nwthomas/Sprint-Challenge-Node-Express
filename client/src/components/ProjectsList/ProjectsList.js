import React from "react";
import { ProjectCard } from "../ProjectCard";

const ProjectsList = props => {
  const { projects } = props;
  return (
    <div>
      {projects.map((project, index) => {
        return <ProjectCard project={project} key={index} />;
      })}
    </div>
  );
};

export default ProjectsList;
