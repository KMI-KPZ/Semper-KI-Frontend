import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUser, { UserType } from "@/hooks/useUser";
import TestImg from "@images/Test.png";
import {
  FilesDescriptionProps,
  Process,
  ProcessStatus,
} from "@/api/Process/Querys/useGetProcess";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

export interface ProjectDetailsProps {
  title?: string;
}

export interface Project {
  projectID: string;
  projectStatus: ProcessStatus;
  projectDetails: ProjectDetailsProps;
  client: string;
  createdWhen: Date;
  updatedWhen: Date;
  processes: FlatProcess[];
}

export type FlatProcessStatus =
  | "ACTION_REQUIRED"
  | "WAITING_CONTRACTOR"
  | "WAITING_CLIENT"
  | "WAITING_PROCESS"
  | "IN_PROGRESS"
  | "COMPLETED";

export interface FlatProcess {
  title: string;
  processID: string;
  serviceType: ServiceType;
  updatedWhen: Date;
  createdWhen: Date;
  flatProcessStatus: FlatProcessStatus;
  amount: number;
  img: string;
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

const useGetProject = () => {
  const queryClient = useQueryClient();
  const { projectID } = useParams();
  const { user } = useUser();
  const getProject = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getProject/${projectID}/`)
      .then((response) => {
        const project: Project = {
          client: response.data.client,
          projectID: response.data.projectID,
          projectStatus: response.data.projectStatus,
          projectDetails: response.data.projectDetails,
          createdWhen: new Date(response.data.createdWhen),
          updatedWhen: new Date(response.data.updatedWhen),
          processes: response.data.processes.map(
            (process: any): FlatProcess => ({
              title: process.processDetails.title,
              processID: process.processID,
              flatProcessStatus: process.processStatus,
              serviceType: process.serviceType,
              createdWhen: new Date(process.createdWhen),
              updatedWhen: new Date(process.updatedWhen),
              amount: process.processDetails.amount,
              img: TestImg,
            })
          ),
        };
        logger("useGetProject | getProject ✅ |", response);
        return project;
      });
  const getProjectOld = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/getProject/${projectID}/`)
      .then((response) => {
        const project: Project = {
          client: response.data.client,
          projectID: response.data.projectID,
          projectStatus: response.data.projectStatus,
          projectDetails: response.data.projectDetails,
          createdWhen: new Date(response.data.createdWhen),
          updatedWhen: new Date(response.data.updatedWhen),
          processes: response.data.processes.map(
            (process: any): Process => ({
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
        logger("useGetProject | getProject ✅ |", response);
        return project;
      });

  return useQuery<Project, Error>({
    queryKey: ["project", projectID],
    queryFn: getProject,
    enabled: projectID !== undefined && user.usertype !== UserType.ADMIN,
  });
};

export default useGetProject;
