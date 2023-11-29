import { customAxios } from "@/api/customAxios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import logger from "@/hooks/useLogger";
import { useNavigate, useParams } from "react-router-dom";
import useProcess, {
  FilesDescriptionProps,
  ProcessProps,
  ProcessStatus,
} from "./useProcess";
import { ServiceType } from "@/pages/Service/hooks/useService";

interface ReturnProps {
  projectQuery: UseQueryResult<ProjectProps, Error>;
  createProject: UseMutationResult<string, Error, void, unknown>;
  updateProject: UseMutationResult<string, Error, UpdateProjectProps, unknown>;
  deleteProject: UseMutationResult<string, Error, string, unknown>;
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

const getFiles = (filesObject: Object): FilesDescriptionProps[] => {
  let files: FilesDescriptionProps[] = Object.entries(filesObject).map(
    ([key, value]) => {
      return { ...value } as FilesDescriptionProps;
    }
  );
  return files;
};

export const useProject = (): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectID } = useParams();

  const projectQuery = useQuery<ProjectProps, Error>(
    ["project", projectID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getProject/${projectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        const project: ProjectProps = {
          client: response.data.client,
          projectID: response.data.projectID,
          status: response.data.status,
          details: response.data.details,
          created: new Date(response.data.createdWhen),
          updated: new Date(response.data.updatedWhen),
          processes: response.data.processes.map(
            (process: any): ProcessProps => ({
              client: process.client,
              processID: process.processID,
              status: process.processStatus,
              serviceStatus: process.serviceStatus,
              serviceType: process.serviceType,
              details: process.serviceDetails,
              contractor: process.contractor,
              messages: process.messages.messages,
              service: process.service,
              created: new Date(process.createdWhen),
              updated: new Date(process.updatedWhen),
              files: getFiles(process.files),
            })
          ),
        };
        logger("useOrdes | getProject ✅ |", project);
        return project;
      });
    },
    {
      enabled: projectID !== undefined,
    }
  );

  const createProject = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProjectID/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useProject | createProject ✅ |", response.data);
        return response.data.projectID;
      });
    },
    onSuccess(data, variables, context) {
      createProcessWithProjectID.mutate(data);
    },
  });

  const createProcessWithProjectID = useMutation<string, Error, string>({
    mutationFn: async (manuelProjectID: string) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProcessID/${manuelProjectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useProcess | createProcess ✅ |", response.data);
        return response.data.processID;
      });
    },
    onSuccess(newProcessID, manuelProjectID, context) {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", manuelProjectID]);
      navigate(`/projects/${manuelProjectID}/${newProcessID}`);
    },
  });

  const updateProject = useMutation<string, Error, UpdateProjectProps>({
    mutationFn: async ({ changes = {}, deletions = {} }) => {
      return customAxios
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
      return customAxios
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
  };
};
