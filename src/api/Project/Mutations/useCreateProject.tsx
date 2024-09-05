import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import useCreateProjectProcess from "./useCreateProjectProcess";

const useCreateProject = () => {
  const createProjectProcess = useCreateProjectProcess();

  const createProject = async (title: string) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/project/create/`, {
        title,
      })
      .then((response) => {
        logger("useCreateProject | createProject ✅ |", response);
        return response.data.projectID;
      })
      .catch((error) => {
        logger("useCreateProject | createProject ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: createProject,
    onSuccess: (projectID) => {
      createProjectProcess.mutate(projectID);
    },
  });
};

export default useCreateProject;
