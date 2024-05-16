import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SingleProcessMutationProps } from "../types";

export type DownloadFileProps = {
  fileID: string;
} & SingleProcessMutationProps;

const useDownloadFile = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const downloadFile = async ({ fileID, processID }: DownloadFileProps) =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/downloadFile/${projectID}/${processID}/${fileID}`,
        { responseType: "blob" }
      )
      .then((response) => {
        logger("useDownloadFile | downloadFile ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDownloadFile | downloadFile ❌ |", error);
      });

  return useMutation<Blob, Error, DownloadFileProps>({
    mutationFn: downloadFile,
    onSuccess: () => {},
  });
};

export default useDownloadFile;
