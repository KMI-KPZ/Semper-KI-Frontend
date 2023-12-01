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
  deleteProjectMutation: UseMutationResult<string, Error, string, unknown>;
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
    mutationFn: async ({ changes = {}, deletions = {} }) => {
      return customAxios
        .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProject/`, {
          projectID,
          changes,
          deletions,
        })
        .then((res) => {
          logger("useProjectMutations | updateProject ✅ |", res.data);
          return res.data;
        });
    },
    onSuccess(data, variables, context) {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });

  const deleteProjectMutation = useMutation<string, Error, string>({
    mutationFn: async (ProjectID: string) => {
      return customAxios
        .delete(
          `${process.env.VITE_HTTP_API_URL}/public/deleteProject/${ProjectID}/`
        )
        .then((res) => {
          logger("useProjectMutations | deleteProject ✅ |", res.data);
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
    createProcessWithIDMutation,
    createProjectMutation,
    deleteProjectMutation,
    updateProjectMutation,
  };
};

export default useProjectMutations;
