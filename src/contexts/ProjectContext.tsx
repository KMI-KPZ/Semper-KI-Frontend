import { Project } from "@/api/Project/Querys/useGetProject";
import React, { PropsWithChildren, createContext } from "react";
import { Outlet } from "react-router-dom";

interface ProjectOutletProps {
  project: Project;
}

export interface ProjectContextProps {
  project: Project;
}

export const ProjectContext = createContext<ProjectContextProps>({
  project: {
    client: "",
    createdWhen: new Date(),
    projectDetails: {},
    processes: [],
    projectID: "",
    updatedWhen: new Date(),
    projectStatus: 0,
  },
});

const ProjectContextProvider: React.FC<
  PropsWithChildren<ProjectOutletProps>
> = (props) => {
  const { project, children } = props;

  return (
    <ProjectContext.Provider
      value={{
        project,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
