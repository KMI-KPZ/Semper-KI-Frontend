import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface DeleteModelProps {
  processID: string;
  projectID: string;
  modelID: string;
}

const useDeleteModel = () => {
  const queryClient = useQueryClient();
  const deleteModel = async ({
    modelID,
    processID,
    projectID,
  }: DeleteModelProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/delete/${projectID}/${processID}/${modelID}/`
      )
      .then((response) => {
        logger("useDeleteModel | deleteModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteModel | deleteModel ❌ |", error);
      });

  return useMutation<string, Error, DeleteModelProps>({
    mutationFn: deleteModel,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useDeleteModel;
