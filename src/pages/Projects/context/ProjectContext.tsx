import React, {
  Dispatch,
  PropsWithChildren,
  useDebugValue,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { ProjectProps, useProject } from "../hooks/useProject";
import { AppLoadingSuspense, LoadingAnimation } from "@component-library/index";
import { Query, UseQueryResult } from "@tanstack/react-query";
import useProjectQuerys from "@/api/Project/useProjectQuerys";
import useUser, { UserType } from "@/hooks/useUser";
import useGetAdminProject from "@/api/Admin/Querys/useGetAdminProject";

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
    createdWhen: new Date(),
    projectDetails: {},
    processes: [],
    projectID: "",
    updatedWhen: new Date(),
    projectStatus: 0,
  },
  projectQuery: {} as UseQueryResult<ProjectProps, Error>,
  checkedProcesses: [],
  setCheckedProcesses: () => {},
});

const ProjectContextProvider: React.FC<ProjectOutletProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const { projectQuery: userProjectQuery } = useProjectQuerys();
  const adminProjectQuery = useGetAdminProject();
  const projectQuery =
    user.usertype === UserType.ADMIN ? adminProjectQuery : userProjectQuery;
  const [checkedProcesses, setCheckedProcesses] = useState<string[]>([]);

  if (projectQuery.isLoading) return <LoadingAnimation className="py-40" />;
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
