import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SingleProcessMutationProps } from "../types";

export type DeleteModelProps = {} & SingleProcessMutationProps;

const useDeleteModel = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const deleteModel = async ({ processID }: DeleteModelProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/deleteModel/${projectID}/${processID}/`
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
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });
};

export default useDeleteModel;
