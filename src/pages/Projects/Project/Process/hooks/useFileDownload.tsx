import logger from "@/hooks/useLogger";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { useTranslation } from "react-i18next";
import Project from "../../Project";
import { ProjectContext } from "@/pages/Projects/context/ProjectContext";
import { getCustomAxios } from "@/hooks/useCustomAxios";

interface useFileDownloadProps {
  processID: string;
  files: string[];
  load: boolean;
}
interface useFileDownloadReturnProps {
  processFilesQuery: UseQueryResult<File, Error>;
}

const useFileDownload = ({
  files,
  load,
  processID,
}: useFileDownloadProps): useFileDownloadReturnProps => {
  const { project } = useContext(ProjectContext);

  const processFilesQuery = useQuery<File, Error>(
    ["project", project.projectID, processID, "files"],
    async () => {
      const apiUrl = `${
        process.env.VITE_HTTP_API_URL
      }/public/downloadFile/${processID}?fileIDs=${files.join(",")}/`;
      return getCustomAxios()
        .get(apiUrl)
        .then((response) => {
          logger("useFileDownload | processFilesQuery ✅ |", response.data);
          return response.data;
        });
    },
    {
      enabled: processID !== undefined && load === true,
    }
  );

  return { processFilesQuery };
};

export default useFileDownload;
