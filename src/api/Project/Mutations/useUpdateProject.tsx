import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UpdateProjectProps } from "@/pages/Projects/hooks/useProject";
import { useParams } from "react-router-dom";

const useUpdateProject = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const updateProject = async ({
    changes = {},
    deletions = {},
  }: UpdateProjectProps) =>
    authorizedCustomAxios
      .patch(`${process.env.VITE_HTTP_API_URL}/public/updateProject/`, {
        projectID,
        changes,
        deletions,
      })
      .then((response) => {
        logger("useUpdateProject | updateProject ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateProject | updateProject ❌ |", error);
      });

  return useMutation<void, Error, UpdateProjectProps>({
    mutationFn: updateProject,
    onSuccess: (data, variables, context) => {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["flatProjects"]);
    },
  });
};

export default useUpdateProject;
