import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation } from "@tanstack/react-query";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";
import { createDownload } from "@/services/utils";
import { useTranslation } from "react-i18next";

const useDownloadZIP = () => {
  const { t } = useTranslation();
  const { project } = useProject();
  const { projectID } = project;
  const { process: _process } = useProcess();
  const { processID } = _process;
  const downloadZIP = async (fileIDs: string[]) =>
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

  return useMutation<Blob, Error, string[]>({
    mutationFn: downloadZIP,
    onSuccess(data) {
      if (data) {
        createDownload(
          data,
          `${t("api.Process.Files.useDownloadZIP.contract")}_${
            project.projectDetails.title === undefined ||
            project.projectDetails.title === ""
              ? projectID
              : project.projectDetails.title
          }_${
            _process.processDetails.title === undefined ||
            _process.processDetails.title === ""
              ? processID
              : _process.processDetails.title
          }_${new Date().toISOString().split("T")[0]}.zip`
        );
      }
    },
  });
};

export default useDownloadZIP;
