import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Project, getProjectFiles } from "@/api/Project/Querys/useGetProject";
import { ModelingServiceProps } from "@/pages/Service/Modelling/Modelling";
import { UserAddressProps } from "@/hooks/useUser";
import { StatusButtonPropsExtern } from "@/hooks/Project/useStatusButtons";
import {
  GerneralUpdateServiceProps,
  ManufacturingServiceProps,
  ServiceProps,
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import { objectToArray } from "@/services/utils";

export interface ProcessDetailsProps {
  provisionalContractor?: string;
  title?: string;
  clientAddress?: UserAddressProps;
  amount: number;
}

export type Process =
  | NoServiceProcessProps
  | ManufactoringProcessProps
  | ModelingProcessProps;

export type DefaultProcessProps = {
  client: string;
  contractor: string;
  processID: string;
  processStatus: ProcessStatus;
  processStatusButtons?: StatusButtonPropsExtern[];
  processDetails: ProcessDetailsProps;
  serviceType: ServiceType;
  serviceStatus: number;
  serviceDetails: ServiceProps;
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
  files: FilesDescriptionProps[];
  messages: ChatMessageProps[];
};

export type NoServiceProcessProps = {
  serviceType: ServiceType.NONE;
  serviceDetails: undefined;
} & DefaultProcessProps;

export type ManufactoringProcessProps = {
  serviceType: ServiceType.MANUFACTURING;
  serviceDetails: ManufacturingServiceProps;
} & DefaultProcessProps;

export type ModelingProcessProps = {
  serviceType: ServiceType.MODELING;
  serviceDetails: ModelingServiceProps;
} & DefaultProcessProps;

export type FileProps = {
  createdBy: string;
  date: Date;
  fileName: string;
  id: string;
  path: string;
};

export interface FilesDescriptionProps {
  createdBy: string;
  id: string;
  title: string;
  path: string;
  fileName: string;
  tags: string[];
  date: Date;
  licenses: string[];
  certificates: string[];
  URI: string;
}

export interface ChatMessageProps {
  userID: string;
  userName: string;
  date: string;
  text: string;
}

export interface ProcessChangesProps {
  serviceStatus?: number;
  serviceType?: ServiceType;
  provisionalContractor?: string;
  messages?: ChatMessageProps;
  processStatus?: ProcessStatus;
  files?: File[];
  processDetails?: UpdateProcessDetailsProps;
  serviceDetails?: GerneralUpdateServiceProps;
}

export interface UpdateProcessDetailsProps {
  provisionalContractor?: string;
  title?: string;
  clientDeliverAddress?: UserAddressProps;
  clientBillingAddress?: UserAddressProps;
  amount?: number;
}

export interface ProcessDeletionsProps {
  processDetails?: "";
  serviceDetails?: string[] | "";
}

export interface UplaodFilesProps {
  processID: string;
  files: File[];
}

export interface DownloadFileProps {
  processID: string;
  fileID: string;
}

export interface DeleteFileProps {
  processID: string;
  fileID: string;
}

export enum ProcessStatus {
  "DRAFT" = 0,
  "WAITING_FOR_OTHER_PROCESS" = 100,
  "SERVICE_READY" = 200,
  "SERVICE_IN_PROGRESS" = 201,
  "SERVICE_COMPLICATION" = 202,
  "CONTRACTOR_SELECTED" = 300,
  "VERIFYING" = 400,
  "VERIFIED" = 500,
  "REQUESTED" = 600,
  "CLARIFICATION" = 700,
  "CONFIRMED_BY_CONTRACTOR" = 800,
  "REJECTED_BY_CONTRACTOR" = 801,
  "CONFIRMED_BY_CLIENT" = 900,
  "REJECTED_BY_CLIENT" = 901,
  "PRODUCTION" = 1000,
  "DELIVERY" = 1100,
  "DISPUTE" = 1200,
  "COMPLETED" = 1300,
  "FAILED" = 1400,
  "CANCELED" = 1500,
}

interface ProcessQueryProps {
  process: Process | undefined;
  query: UseQueryResult<Project, Error>;
}

export const isProcessAtServiceStatus = (process: Process): boolean => {
  return (
    process.processStatus >= ProcessStatus.SERVICE_READY &&
    process.processStatus <= ProcessStatus.SERVICE_COMPLICATION
  );
};

const useGetProcess = () => {
  const queryClient = useQueryClient();
  const { projectID, processID } = useParams();
  const getProcess = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/getProcess/${projectID}/${processID}/`
      )
      .then((response) => {
        const process: Process = {
          ...response.data,
          updatedWhen: new Date(response.data.updatedWhen),
          createdWhen: new Date(response.data.createdWhen),
          accessedWhen: new Date(response.data.accessedWhen),
          files: Object.values(response.data.files),
          serviceDetails: {
            materials:
              response.data.serviceDetails.materials !== undefined
                ? Object.values(response.data.serviceDetails.materials)
                : undefined,
            models:
              response.data.serviceDetails.models !== undefined
                ? Object.values(response.data.serviceDetails.models)
                : undefined,
            postProcessings:
              response.data.serviceDetails.postProcessings !== undefined
                ? Object.values(response.data.serviceDetails.postProcessings)
                : undefined,
            manufacturerID: response.data.serviceDetails.manufacturerID,
          },
        };
        logger("useGetProcess | getProcess ✅ |", process);

        return process;
      });

  return useQuery<Process, Error>({
    queryKey: ["project", projectID, processID],
    queryFn: getProcess,
  });
};

export default useGetProcess;
