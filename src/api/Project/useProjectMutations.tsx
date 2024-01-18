import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import { UpdateProjectProps } from "@/pages/Projects/hooks/useProject";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface useProjectMutationsReturnProps {
  createProjectMutation: UseMutationResult<string, Error, void, unknown>;
  createProcessWithIDMutation: UseMutationResult<
    string,
    Error,
    string,
    unknown
  >;
  updateProjectMutation: UseMutationResult<
    string,
    Error,
    UpdateProjectProps,
    unknown
  >;
  deleteProjectMutation: UseMutationResult<string, Error, string[], unknown>;
  sendProjectMutation: UseMutationResult<
    any,
    Error,
    SendProjectMutationProps,
    unknown
  >;
  verifyProjectMutation: UseMutationResult<
    any,
    Error,
    VerifyProjectMutationProps,
    unknown
  >;
}

export interface SendProjectMutationProps {
  processIDs: string[];
}

export interface VerifyProjectMutationProps {
  processIDs: string[];
  send: boolean;
}

const useProjectMutations = (): useProjectMutationsReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { projectID } = useParams();

  const createProjectMutation = useMutation<string, Error, void>({
    mutationFn: async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProjectID/`;
      return customAxios.get(apiUrl).then((response) => {
        logger("useProjectMutations | createProject ✅ |", response.data);
        return response.data.projectID;
      });
    },
    onSuccess(data, variables, context) {
      createProcessWithIDMutation.mutate(data);
    },
  });

  const createProcessWithIDMutation = useMutation<string, Error, string>({
    mutationFn: async (manuelProjectID: string) => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/createProcessID/${manuelProjectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        logger(
          "useProjectMutations | createProcessWithProjectID ✅ |",
          response.data
        );
        return response.data.processID;
      });
    },
    onSuccess(newProcessID, manuelProjectID, context) {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", manuelProjectID]);
      navigate(`/projects/${manuelProjectID}/${newProcessID}`);
    },
  });

  const updateProjectMutation = useMutation<string, Error, UpdateProjectProps>({
    mutationFn: async (props) => {
      const { changes = {}, deletions = {} } = props;
      return customAxios
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProject/`, {
          projectID,
          changes,
          deletions,
        })
        .then((res) => {
          logger("useProjectMutations | updateProjectMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const deleteProjectMutation = useMutation<string, Error, string[]>({
    mutationFn: async (projectIDs: string[]) => {
      return customAxios
        .delete(
          `${
            process.env.VITE_HTTP_API_URL
          }/public/deleteProjects/?projectIDs=${projectIDs.join(",")}`
        )
        .then((res) => {
          logger("useProjectMutations | deleteProjectMutation ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, ProjectID, context) {
      queryClient.invalidateQueries(["project", ProjectID]);
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["admin, flatProjects"]);
    },
  });

  const sendProjectMutation = useMutation<any, Error, SendProjectMutationProps>(
    {
      mutationFn: async ({ processIDs }) => {
        const url = `${process.env.VITE_HTTP_API_URL}/public/sendProject/`;
        return customAxios
          .patch(url, {
            projectID,
            processIDs,
          })
          .then((response) => {
            logger("useCheckout | sendProject ✅ |", response.data);
            return response.data;
          });
      },
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries(["project", projectID]);
        navigate(`/projects/${projectID}/${variables.processIDs[0]}`);
      },
    }
  );

  const verifyProjectMutation = useMutation<
    any,
    Error,
    VerifyProjectMutationProps
  >({
    mutationFn: async (props) => {
      const { processIDs, send } = props;
      const url = `${process.env.VITE_HTTP_API_URL}/public/verifyProject/`;
      return customAxios
        .patch(url, {
          projectID,
          processIDs,
          send,
        })
        .then((response) => {
          logger("useVerification | verifyProject ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });

  return {
    createProcessWithIDMutation,
    createProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
    sendProjectMutation,
    verifyProjectMutation,
  };
};

export default useProjectMutations;
