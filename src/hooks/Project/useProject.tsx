import { UseQueryResult } from "@tanstack/react-query";
import { Process, ProcessStatus } from "../Process/useProcess";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Project } from "@/api/Project/Querys/useGetProject";
import useCreateProject from "@/api/Project/Mutations/useCreateProject";
import useDeleteProject from "@/api/Project/Mutations/useDeleteProject";
import useUpdateProject from "@/api/Project/Mutations/useUpdateProject";
import useSendProject from "@/api/Project/Mutations/useSendProject";
import useVerifyProject from "@/api/Project/Mutations/useVerifyProject";

interface ReturnProps {
  project: Project;
  projectQuery: UseQueryResult<Project, Error>;
  createProject(): void;
  updateProject(updateProps: UpdateProjectProps): void;
  deleteProject(projectIDs: string[]): void;
  verifyProject(props: VerifyProjectProps): void;
  sendProject(processIDs: string[]): void;
}

export interface ProjectDetailsProps {
  title?: string;
}

export interface UpdateProjectProps {
  changes?: ProjectChangesProps;
  deletions?: ProjectDeletionsProps;
}

export interface ProjectChangesProps {
  projectStatus?: ProcessStatus;
  projectDetails?: ProjectDetailsProps;
}
export interface ProjectDeletionsProps {
  projectDetails?: { title?: "" };
  projectStatus?: "";
}

export interface VerifyProjectProps {
  processIDs: string[];
  send: boolean;
}

export const useProject = (): ReturnProps => {
  const { project, projectQuery } = useContext(ProjectContext);

  const _createProject = useCreateProject();
  const _deleteProject = useDeleteProject();
  const _updateProject = useUpdateProject();
  const _sendProject = useSendProject();
  const _verifyProject = useVerifyProject();

  const createProject = () => {
    _createProject.mutate();
  };

  const updateProject = (updateProps: UpdateProjectProps) => {
    _updateProject.mutate(updateProps);
  };
  const deleteProject = (projectIDs: string[]) => {
    _deleteProject.mutate(projectIDs);
  };

  const sendProject = (processIDs: string[]) => {
    _sendProject.mutate(processIDs);
  };

  const verifyProject = (props: VerifyProjectProps) => {
    _verifyProject.mutate(props);
  };

  return {
    project,
    projectQuery,
    createProject,
    updateProject,
    deleteProject,
    sendProject,
    verifyProject,
  };
};
