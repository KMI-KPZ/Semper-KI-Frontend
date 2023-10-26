import React, { useDebugValue } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectProps, useProject } from "../hooks/useProject";
import { LoadingAnimation } from "@component-library/index";

interface ProjectOutletProps {}

export interface ProjectContextProps {
  project: ProjectProps;
}

export const ProjectContext = React.createContext<ProjectContextProps>({
  project: {
    client: "",
    created: new Date(),
    details: {},
    processes: [],
    projectID: "",
    updated: new Date(),
    status: 0,
  },
});

const ProjectContextProvider: React.FC<ProjectOutletProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { projectQuery } = useProject();

  if (projectQuery.isLoading) return <LoadingAnimation />;

  if (projectQuery.isFetched && projectQuery.data !== undefined)
    return (
      <ProjectContext.Provider value={{ project: projectQuery.data }}>
        <Outlet />
      </ProjectContext.Provider>
    );

  return <Navigate to="/projects" />;
};

export default ProjectContextProvider;
