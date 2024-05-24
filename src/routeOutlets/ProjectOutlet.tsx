import React from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import {  LoadingAnimation } from "@component-library/index";
import useUser, { UserType } from "@/hooks/useUser";
import useGetAdminProject from "@/api/Admin/Querys/useGetAdminProject";
import useGetProject from "@/api/Project/Querys/useGetProject";
import ProjectContextProvider from "@/contexts/ProjectContext";

interface ProjectOutletProps {}

const ProjectOutlet: React.FC<ProjectOutletProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { user } = useUser();
  const _project = useGetProject();
  const adminProjectQuery = useGetAdminProject();
  const project =
    user.usertype === UserType.ADMIN ? adminProjectQuery : _project;

  if (project.isLoading) return <LoadingAnimation className="py-40" />;
  if (project.isFetched && project.data !== undefined)
    return (
      <ProjectContextProvider project={project.data}>
        <Outlet />
      </ProjectContextProvider>
    );

  return <Navigate to="/projects" />;
};

export default ProjectOutlet;
