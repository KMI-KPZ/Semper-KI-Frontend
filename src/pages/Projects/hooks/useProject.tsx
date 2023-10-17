import { getCustomAxios } from "@/hooks/useCustomAxios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import { useNavigate, useParams } from "react-router-dom";
import { ProcessProps, ProcessStatus } from "./useProcess";

interface ReturnProps {
  projectQuery: UseQueryResult<ProjectProps, Error>;
  createProject: UseMutationResult<string, Error, void, unknown>;
  updateProject: UseMutationResult<string, Error, UpdateProjectProps, unknown>;
  deleteProject: UseMutationResult<string, Error, string, unknown>;
  createProjectWithProcess: UseMutationResult<string, Error, void, unknown>;
}

export interface ProjectProps {
  projectID: string;
  client: string;
  created: Date;
  updated: Date;
  status: ProcessStatus;
  processes: ProcessProps[];
  details: ProjectDetailsProps;
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
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectID } = useParams();

  const projectQuery = useQuery<ProjectProps, Error>(
    ["project", projectID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getProject/${projectID}/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useOrdes | getProject ✅ |", response.data);
          const Project = {
            ...response.data,
            created: new Date(response.data.created),
            updated: new Date(response.data.updated),
          };
          return Project;
        });
    },
    {
      enabled: projectID !== undefined,
      onError: (error) => {
        logger("useProject | getProject ❌ |", error);
        navigate("/projects");
      },
    }
  );

  const createProject = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProjectID/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useProject | createProject ✅ |", response.data);
          return response.data.projectID;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project"]);
      queryClient.invalidateQueries(["flatProjects"]);
      navigate(`/projects/${data}`);
    },
  });

  const createProjectWithProcess = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProjectID/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useProject | createProjectWithProcess ✅ |", response.data);
          return response.data.projectID;
        });
    },
  });

  const updateProject = useMutation<string, Error, UpdateProjectProps>({
    mutationFn: async ({ changes = {}, deletions = {} }) => {
      return getCustomAxios()
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProject/`, {
          projectID,
          changes,
          deletions,
        })
        .then((res) => {
          logger("useProject | updateProject ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const deleteProject = useMutation<string, Error, string>({
    mutationFn: async (ProjectID: string) => {
      return getCustomAxios()
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteProject/${ProjectID}/`
        )
        .then((res) => {
          logger("useProject | deleteProject ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, ProjectID, context) {
      queryClient.invalidateQueries(["project", ProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["admin, flatProjects"]);
    },
  });

  return {
    createProject,
    projectQuery,
    updateProject,
    deleteProject,
    createProjectWithProcess,
  };
};
