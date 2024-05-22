import React, {
  Dispatch,
  PropsWithChildren,
  useDebugValue,
  useState,
} from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { AppLoadingSuspense, LoadingAnimation } from "@component-library/index";
import { Query, UseQueryResult } from "@tanstack/react-query";
import useUser, { UserType } from "@/hooks/useUser";
import useGetAdminProject from "@/api/Admin/Querys/useGetAdminProject";
import useGetProject, { Project } from "@/api/Project/Querys/useGetProject";

interface ProjectOutletProps {}

export interface ProjectContextProps {
  project: Project;
  projectQuery: UseQueryResult<Project, Error>;
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
  projectQuery: {} as UseQueryResult<Project, Error>,
  checkedProcesses: [],
  setCheckedProcesses: () => {},
});

const ProjectContextProvider: React.FC<ProjectOutletProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const _project = useGetProject();
  const adminProjectQuery = useGetAdminProject();
  const project =
    user.usertype === UserType.ADMIN ? adminProjectQuery : _project;
  const [checkedProcesses, setCheckedProcesses] = useState<string[]>([]);

  if (project.isLoading) return <LoadingAnimation className="py-40" />;
  if (project.isFetched && project.data !== undefined)
    return (
      <ProjectContext.Provider
        value={{
          project: project.data,
          projectQuery: project,
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
