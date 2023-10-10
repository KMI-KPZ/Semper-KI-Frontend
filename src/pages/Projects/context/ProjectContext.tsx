import React, { useDebugValue } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectProps, useProject } from "../hooks/useProject";

interface ProjectOutletProps {}

export interface ProjectContextProps {
  project?: ProjectProps;
}

export const ProjectContext = React.createContext<ProjectContextProps>({
  project: undefined,
});

const ProjectContextProvider: React.FC<ProjectOutletProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { projectQuery } = useProject();

  return (
    <ProjectContext.Provider value={{ project: projectQuery.data }}>
      <Outlet />
    </ProjectContext.Provider>
  );
};

export default ProjectContextProvider;
