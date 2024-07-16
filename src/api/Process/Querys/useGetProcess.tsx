import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Project, getProcessFiles } from "@/api/Project/Querys/useGetProject";
import { ModelingServiceProps } from "@/pages/Process/components/Service/ServiceEdit/Modelling/Modelling";
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
  clientBillingAddress?: UserAddressProps;
  clientDeliverAddress?: UserAddressProps;
  amount: number;
}

export type Process = NoServiceProcessProps | DefinedProcess;

export type DefinedProcess = ManufactoringProcessProps | ModelingProcessProps;

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
  files: ProcessFile[];
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

export type ProcessFile = DefaultProcessFile | ModelProcessFile;

export interface GenericProcessFile {
  id: string;
  fileName: string;
  imgPath: string;
  date: Date;
  createdBy: string;
  createdByID: string;
  size: number;
  type: ProcessFileType;
  origin: ProcessOrigin;
}
export type ProcessFileType = "Model" | "File";

export type ProcessOrigin =
  | "Service"
  | "Contractor"
  | "Verification"
  | "Request"
  | "Clarification"
  | "Contract"
  | "Confirmation"
  | "Production"
  | "Delivery"
  | "Completed";

export type DefaultProcessFile = {
  type: "File";
} & GenericProcessFile;

export type ModelProcessFile = {
  type: "Model";
  tags: string[];
  licenses: string[];
  certificates: string[];
} & GenericProcessFile;

export interface ChatMessageProps {
  userID: string;
  userName: string;
  date: string;
  text: string;
  origin?: ProcessOrigin;
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
  "DRAFT" = 0, //kein Service Ausgewählt
  "WAITING_FOR_OTHER_PROCESS" = 100, //warten auf anderen Prozess
  "SERVICE_READY" = 200, //Service bereit
  "SERVICE_IN_PROGRESS" = 201, //Service in Bearbeitung
  "SERVICE_COMPLICATION" = 202, //Service Komplikation
  "SERVICE_COMPLETED" = 203, //Service abgeschlossen
  "CONTRACTOR_COMPLETED" = 300, //auftragnehmer ausgewählt
  "VERIFYING_IN_PROGRESS" = 400, //verifizierung in bearbeitung
  "VERIFYING_COMPLETED" = 401, //verifizierung abgeschlossen
  "REQUEST_COMPLETED" = 500, //auftrag raus
  "OFFER_COMPLETED" = 600, //angebot raus
  "OFFER_REJECTED" = 601, //angebot abgelehnt
  "CONFIRMATION_COMPLETED" = 700, //bestätigung raus
  "CONFIRMATION_REJECTED" = 701, //bestätigung abgelehnt
  "PRODUCTION_IN_PROGRESS" = 800, //produktion in bearbeitung
  "PRODUCTION_COMPLETED" = 801, //produktion abgeschlossen
  "DELIVERY_IN_PROGRESS" = 900, //lieferung in bearbeitung
  "DELIVERY_COMPLETED" = 901, //lieferung abgeschlossen
  "DISPUTE" = 1000, //streitfall
  "COMPLETED" = 1100, //abgeschlossen
  "FAILED" = 1200, //fehlgeschlagen
  "CANCELED" = 1300, //abgebrochen
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
        `${process.env.VITE_HTTP_API_URL}/public/process/get/${projectID}/${processID}/`
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
          processDetails: {
            ...response.data.processDetails,
            clientBillingAddress:
              response.data.processDetails.clientBillingAddress === undefined ||
              Object.keys(response.data.processDetails.clientBillingAddress)
                .length === 0
                ? undefined
                : response.data.processDetails.clientBillingAddress,
            clientDeliverAddress:
              response.data.processDetails.clientDeliverAddress === undefined ||
              Object.keys(response.data.processDetails.clientDeliverAddress)
                .length === 0
                ? undefined
                : response.data.processDetails.clientDeliverAddress,
          },
          messages: response.data.messages.messages,
          // messages: {
          //   clarification: response.data.messages.messages.clarification,
          //   production: response.data.messages.messages.production,
          // }, // Akshar
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
