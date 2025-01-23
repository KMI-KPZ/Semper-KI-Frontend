import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import useUser, { UserType } from "@/hooks/useUser";
import TestImg from "@images/Test.png";
import { ProcessFile, ProcessStatus } from "@/api/Process/Querys/useGetProcess";
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

export type ProcessActionStatus =
  | "ACTION_REQUIRED"
  | "WAITING_CONTRACTOR"
  | "WAITING_CLIENT"
  | "WAITING_PROCESS"
  | "IN_PROGRESS"
  | "COMPLETED"
  | "FAILED";

export interface FlatProcess {
  title: string;
  processID: string;
  serviceType: ServiceType;
  updatedWhen: Date;
  createdWhen: Date;
  actionStatus: ProcessActionStatus;
  amount: number;
  imgPath: string;
}

export const getProcessFiles = (filesObject: Object): ProcessFile[] => {
  let files: ProcessFile[] = Object.entries(filesObject).map(([_, value]) => {
    return { ...value } as ProcessFile;
  });
  return files;
};

const useGetProject = (customProjectID?: string) => {
  const { projectID: paramProjectID } = useParams();

  const projectID =
    customProjectID !== undefined ? customProjectID : paramProjectID;
  const { user } = useUser();
  const getProject = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/public/project/get/${projectID}/`)
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
              title: process.title,
              processID: process.processID,
              actionStatus: process.ProcessActionStatus,
              serviceType: process.serviceType,
              createdWhen: new Date(process.createdWhen),
              updatedWhen: new Date(process.updatedWhen),
              amount: process.amount,
              imgPath: process.imgPath === "" ? TestImg : process.imgPath,
            })
          ),
        };
        logger("useGetProject | getProject ✅ |", response);
        return project;
      });

  return useQuery<Project, Error>({
    queryKey: ["project", projectID],
    queryFn: getProject,
    enabled:
      (paramProjectID !== undefined && user.usertype !== UserType.ADMIN) ||
      customProjectID !== undefined,
  });
};

export default useGetProject;
