import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useSaveProjects = () => {
  const queryClient = useQueryClient();
  const saveProjects = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/project/save/`)
      .then((response) => {
        logger("useSaveProjects | saveProjects ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSaveProjects | saveProjects ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: saveProjects,
    onSuccess: (_, projectID) => {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["dashboardProject"]);
    },
  });
};

export default useSaveProjects;
