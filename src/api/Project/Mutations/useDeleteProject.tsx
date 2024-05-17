import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteProject = () => {
  const queryClient = useQueryClient();
  const deleteProject = async (projectIDs: string[]) =>
    authorizedCustomAxios
      .delete(
        `${
          process.env.VITE_HTTP_API_URL
        }/public/deleteProjects/?projectIDs=${projectIDs.join(",")}`
      )
      .then((response) => {
        logger("useDeleteProject | deleteProject ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteProject | deleteProject ❌ |", error);
      });

  return useMutation<string, Error, string[]>({
    mutationFn: deleteProject,
    onSuccess: (data, projectIDs, context) => {
      projectIDs.map((projectID) => {
        queryClient.invalidateQueries(["project", projectID]);
      });
      queryClient.invalidateQueries(["flatProjects"]);
      queryClient.invalidateQueries(["admin, flatProjects"]);
    },
  });
};

export default useDeleteProject;
