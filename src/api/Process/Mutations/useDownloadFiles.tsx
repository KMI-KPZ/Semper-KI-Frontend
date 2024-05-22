import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
export interface DownloadFilesProps {
  processID: string;
  fileIDs: string[];
}

const useDownloadFiles = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const downloadFiles = async ({ fileIDs, processID }: DownloadFilesProps) =>
    authorizedCustomAxios
      .get(
        `${
          process.env.VITE_HTTP_API_URL
        }/public/downloadFilesAsZip/${projectID}/${processID}?fileIDs=${fileIDs.join(
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

  return useMutation<Blob, Error, DownloadFilesProps>({
    mutationFn: downloadFiles,
    onSuccess: () => {},
  });
};

export default useDownloadFiles;
