import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SingleProcessMutationProps } from "../../types";

export type DeleteFileProps = {
  fileID: string;
} & SingleProcessMutationProps;

const useDeleteFile = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const deleteFile = async ({ fileID, processID }: DeleteFileProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/files/delete/${projectID}/${processID}/${fileID}/`
      )
      .then((response) => {
        logger("useDeleteFile | deleteFile ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteFile | deleteFile ❌ |", error);
      });

  return useMutation<string, Error, DeleteFileProps>({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });
};

export default useDeleteFile;
