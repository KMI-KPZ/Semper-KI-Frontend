import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SingleProcessMutationProps } from "../../types";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";

const useDeleteFile = () => {
  const queryClient = useQueryClient();
  const {
    project: { projectID },
  } = useProject();
  const {
    process: { processID },
  } = useProcess();
  const deleteFile = async (fileID: string) =>
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

  return useMutation<string, Error, string>({
    mutationFn: deleteFile,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });
};

export default useDeleteFile;
