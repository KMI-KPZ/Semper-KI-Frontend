import React, {
  Dispatch,
  PropsWithChildren,
  useDebugValue,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectProps, useProject } from "../hooks/useProject";
import { LoadingAnimation } from "@component-library/index";
import { Query, UseQueryResult } from "@tanstack/react-query";
import useProjectQuerys from "@/api/Project/useProjectQuerys";

interface ProjectOutletProps {}

export interface ProjectContextProps {
  project: ProjectProps;
  projectQuery: UseQueryResult<ProjectProps, Error>;
  checkedProcesses: string[];
  setCheckedProcesses: Dispatch<React.SetStateAction<string[]>>;
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
  projectQuery: {} as UseQueryResult<ProjectProps, Error>,
  checkedProcesses: [],
  setCheckedProcesses: () => {},
});

const ProjectContextProvider: React.FC<ProjectOutletProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { projectQuery } = useProjectQuerys();
  const [checkedProcesses, setCheckedProcesses] = useState<string[]>([]);

  if (projectQuery.isLoading) return <LoadingAnimation />;

  if (projectQuery.isFetched && projectQuery.data !== undefined)
    return (
      <ProjectContext.Provider
        value={{
          project: projectQuery.data,
          projectQuery: projectQuery,
          checkedProcesses,
          setCheckedProcesses,
        }}
      >
        <Outlet />
      </ProjectContext.Provider>
    );

  return <Navigate to="/projects" />;
};

export default ProjectContextProvider;
