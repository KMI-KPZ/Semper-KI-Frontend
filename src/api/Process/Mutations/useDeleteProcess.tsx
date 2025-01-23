import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { MultipleProcessMutationProps } from "../types";
export type DeleteProcessMutationProps = MultipleProcessMutationProps;

const useDeleteProcess = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const deleteProcess = async ({ processIDs }: DeleteProcessMutationProps) =>
    authorizedCustomAxios
      .delete(
        `${
          process.env.VITE_HTTP_API_URL
        }/public/process/delete/${projectID}/?processIDs=${processIDs.join(
          ","
        )}`
      )
      .then((response) => {
        logger("useDeleteProcess | deleteProcess ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteProcess | deleteProcess ❌ |", error);
      });

  return useMutation<string, Error, DeleteProcessMutationProps>({
    mutationFn: deleteProcess,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
      queryClient.invalidateQueries(["dashboardProject"]);
    },
  });
};

export default useDeleteProcess;
