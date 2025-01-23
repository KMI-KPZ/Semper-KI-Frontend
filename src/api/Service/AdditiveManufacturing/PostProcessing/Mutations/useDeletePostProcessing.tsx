import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeletePostProcessingProps {
  postProcessingID: string;
  processID: string;
  projectID: string;
  groupID: number;
}

const useDeletePostProcessing = () => {
  const queryClient = useQueryClient();
  const deletePostProcessing = async ({
    projectID,
    processID,
    postProcessingID,
    groupID,
  }: DeletePostProcessingProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/post-processing/delete/${projectID}/${processID}/${groupID}/${postProcessingID}/`
      )
      .then((response) => {
        logger("useDeletePostProcessing | deletePostProcessing ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeletePostProcessing | deletePostProcessing ❌ |", error);
      });

  return useMutation<string, Error, DeletePostProcessingProps>({
    mutationFn: deletePostProcessing,
    onSuccess: (_, props) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useDeletePostProcessing;
