import React, { PropsWithChildren } from "react";
import { useTranslation } from "react-i18next";
import { Navigate, Outlet } from "react-router-dom";
import { ContentBox, LoadingAnimation } from "@component-library/index";
import useUser, { UserType } from "@/hooks/useUser";
import useGetAdminProject from "@/api/Admin/Querys/useGetAdminProject";
import useGetProject from "@/api/Project/Querys/useGetProject";
import ProjectContextProvider from "@/contexts/ProjectContext";
import ProcessPage from "@/pages/Process/ProcessPage";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface ProjectOutletProps {}

const ProjectOutlet: React.FC<PropsWithChildren<ProjectOutletProps>> = (
  props
) => {
  const { children } = props;
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
