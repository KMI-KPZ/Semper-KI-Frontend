import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";

const useDownloadFile = () => {
  const {
    project: { projectID },
  } = useProject();
  const {
    process: { processID },
  } = useProcess();
  const downloadFile = async (fileID: string) =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/files/download/file/${projectID}/${processID}/${fileID}/`,
        { responseType: "blob" }
      )
      .then((response) => {
        logger("useDownloadFile | downloadFile ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDownloadFile | downloadFile ❌ |", error);
      });

  return useMutation<Blob, Error, string>({
    mutationFn: downloadFile,
    onSuccess: () => {},
  });
};

export default useDownloadFile;
