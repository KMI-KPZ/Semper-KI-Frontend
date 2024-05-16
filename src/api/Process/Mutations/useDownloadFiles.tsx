import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { DownloadFilesZIPProps } from "@/pages/Projects/hooks/useProcess";
import { useParams } from "react-router-dom";

const useDownloadFiles = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const downloadFiles = async ({ fileIDs, processID }: DownloadFilesZIPProps) =>
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

  return useMutation<Blob, Error, DownloadFilesZIPProps>({
    mutationFn: downloadFiles,
    onSuccess: () => {},
  });
};

export default useDownloadFiles;
