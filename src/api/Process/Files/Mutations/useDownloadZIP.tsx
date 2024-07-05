import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export interface DownloadZIPProps {
  processID: string;
  fileIDs: string[];
}

const useDownloadZIP = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const downloadZIP = async ({ fileIDs, processID }: DownloadZIPProps) =>
    authorizedCustomAxios
      .get(
        `${
          process.env.VITE_HTTP_API_URL
        }/public/files/download/zip/${projectID}/${processID}?fileIDs=${fileIDs.join(
          ","
        )}`,
        { responseType: "blob" }
      )
      .then((response) => {
        logger("useDownloadFiles | downloadFiles ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDownloadFiles | downloadFiles ❌ |", error);
      });

  return useMutation<Blob, Error, DownloadZIPProps>({
    mutationFn: downloadZIP,
    onSuccess: () => {},
  });
};

export default useDownloadZIP;
