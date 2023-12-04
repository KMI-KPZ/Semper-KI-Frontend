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
  deleteProject(projectIDs: string[]): void;
}

export interface ProjectProps {
  projectID: string;
  client: string;
  status: ProcessStatus;
  createdWhen: Date;
  updatedWhen: Date;
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
  const deleteProject = (projectIDs: string[]) => {
    deleteProjectMutation.mutate(projectIDs);
  };

  return {
    project,
    projectQuery,
    createProject,
    updateProject,
    deleteProject,
  };
};
