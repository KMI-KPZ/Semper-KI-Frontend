import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useCreateProjectProcess from "./useCreateProjectProcess";

const useCreateProject = () => {
  const queryClient = useQueryClient();
  const createProjectProcess = useCreateProjectProcess();

  const createProject = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/createProjectID/`)
      .then((response) => {
        logger("useCreateProject | createProject ✅ |", response);
        return response.data.projectID;
      })
      .catch((error) => {
        logger("useCreateProject | createProject ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: createProject,
    onSuccess: (projectID, variables, context) => {
      createProjectProcess.mutate(projectID);
    },
  });
};

export default useCreateProject;
