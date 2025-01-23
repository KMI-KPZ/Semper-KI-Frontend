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
        }/public/project/delete/?projectIDs=${projectIDs.join(",")}`
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
    onSuccess: (_, projectIDs) => {
      projectIDs.map((projectID) => {
        queryClient.invalidateQueries(["project", projectID]);
      });
      queryClient.invalidateQueries(["dashboardProject"]);
      queryClient.invalidateQueries(["admin, dashboardProject"]);
    },
  });
};

export default useDeleteProject;
