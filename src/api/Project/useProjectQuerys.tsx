import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import useUser, { UserType } from "@/hooks/useUser";
import {
  FileProps,
  FilesDescriptionProps,
  ProcessProps,
  ProcessStatus,
} from "@/pages/Projects/hooks/useProcess";
import {
  ProjectDetailsProps,
  ProjectProps,
} from "@/pages/Projects/hooks/useProject";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface useProjectQuerysReturnProps {
  projectQuery: UseQueryResult<ProjectProps, Error>;
}

export const getProjectFiles = (
  filesObject: Object
): FilesDescriptionProps[] => {
  let files: FilesDescriptionProps[] = Object.entries(filesObject).map(
    ([key, value]) => {
      return { ...value } as FilesDescriptionProps;
    }
  );
  return files;
};

const useProjectQuerys = (): useProjectQuerysReturnProps => {
  const { user } = useUser();
  const { projectID } = useParams();

  const projectQuery = useQuery<ProjectProps, Error>(
    ["project", projectID],
    async () => {
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/getProject/${projectID}/`;
      return authorizedCustomAxios.get(apiUrl).then((response) => {
        const project: ProjectProps = {
          client: response.data.client,
          projectID: response.data.projectID,
          projectStatus: response.data.projectStatus,
          projectDetails: response.data.projectDetails,
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
              processStatusButtons: process.processStatusButtons,
              serviceType: process.serviceType,
              messages: process.messages.messages,
              contractor: process.contractor,
              createdWhen: new Date(process.createdWhen),
              updatedWhen: new Date(process.updatedWhen),
              files: getProjectFiles(process.files),
            })
          ),
        };
        logger("useProjectQuerys | projectQuery ✅ |", project);
        return project;
      });
    },
    {
      enabled: projectID !== undefined && user.usertype !== UserType.ADMIN,
    }
  );

  return { projectQuery };
};

export default useProjectQuerys;
