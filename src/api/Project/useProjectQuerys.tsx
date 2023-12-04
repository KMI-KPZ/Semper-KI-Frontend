import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  FileProps,
  FilesDescriptionProps,
  ProcessProps,
} from "@/pages/Projects/hooks/useProcess";
import { ProjectProps } from "@/pages/Projects/hooks/useProject";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface useProjectQuerysReturnProps {
  projectQuery: UseQueryResult<ProjectProps, Error>;
}

const getFiles = (filesObject: Object): FileProps[] => {
  let files: FileProps[] = Object.entries(filesObject).map(([key, value]) => {
    return { ...value } as FileProps;
  });
  return files;
};

const useProjectQuerys = (): useProjectQuerysReturnProps => {
  const { projectID } = useParams();

  const projectQuery = useQuery<ProjectProps, Error>(
    ["project", projectID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getProject/${projectID}/`;
      return customAxios.get(apiUrl).then((response) => {
        const project: ProjectProps = {
          client: response.data.client,
          projectID: response.data.projectID,
          status: response.data.status,
          details: response.data.details,
          createdWhen: new Date(response.data.createdWhen),
          updatedWhen: new Date(response.data.updatedWhen),
          processes: response.data.processes.map(
            (process: any): ProcessProps => ({
              client: process.client,
              processDetails: process.processDetails,
              processID: process.processID,
              processStatus: process.processStatus,
              serviceDetails: process.serviceDetails,
              serviceStatus: process.serviceStatus,
              serviceType: process.serviceType,
              messages: process.messages.messages,
              contractor: process.contractor,
              createdWhen: new Date(process.createdWhen),
              updatedWhen: new Date(process.updatedWhen),
              files: getFiles(process.files),
            })
          ),
        };
        logger("useProjectQuerys | projectQuery ✅ |", project);
        return project;
      });
    },
    {
      enabled: projectID !== undefined,
    }
  );

  return { projectQuery };
};

export default useProjectQuerys;
