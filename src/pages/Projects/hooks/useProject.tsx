import { UseQueryResult } from "@tanstack/react-query";
import { ProcessProps, ProcessStatus } from "./useProcess";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import useProjectMutations from "@/api/Project/useProjectMutations";

interface ReturnProps {
  project: ProjectProps;
  projectQuery: UseQueryResult<ProjectProps, Error>;
  createProject(): void;
  updateProject(updateProps: UpdateProjectProps): void;
  deleteProject(projectID: string): void;
}

export interface ProjectProps {
  projectID: string;
  client: string;
  status: ProcessStatus;
  created: Date;
  updated: Date;
  details: ProjectDetailsProps;
  processes: ProcessProps[];
}

export interface ProjectDetailsProps {
  title?: string;
}

export interface UpdateProjectProps {
  changes?: ProjectChangesProps;
  deletions?: ProjectDeletionsProps;
}

export interface ProjectChangesProps {
  status?: ProcessStatus;
  details?: ProjectDetailsProps;
}
export interface ProjectDeletionsProps {
  details?: { title?: "" };
  status?: "";
}

export const useProject = (): ReturnProps => {
  const { project, projectQuery } = useContext(ProjectContext);
  const {
    createProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
  } = useProjectMutations();

  const createProject = () => {
    createProjectMutation.mutate();
  };

  const updateProject = (updateProps: UpdateProjectProps) => {
    updateProjectMutation.mutate(updateProps);
  };
  const deleteProject = (projectID: string) => {
    deleteProjectMutation.mutate(projectID);
  };

  return {
    project,
    projectQuery,
    createProject,
    updateProject,
    deleteProject,
  };
};
