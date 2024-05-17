import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const useCreateProjectProcess = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const createProjectProcess = async (projectID: string) =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/createProcessID/${projectID}/`
      )
      .then((response) => {
        logger("useCreateProjectProcess | createProjectProcess ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateProjectProcess | createProjectProcess ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: createProjectProcess,
    onSuccess: (newProcessID, projectID, contex) => {
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["project", projectID]);
      navigate(`/projects/${projectID}/${newProcessID}`);
    },
  });
};

export default useCreateProjectProcess;
