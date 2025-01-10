import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { ModelingServiceProps } from "@/pages/Process/components/Service/ServiceEdit/Modelling/Modelling";
import { UserAddressProps } from "@/hooks/useUser";
import { StatusButtonPropsExtern } from "@/hooks/Project/useStatusButtons";
import {
  GerneralUpdateServiceProps,
  ManufacturingServiceProps,
  ServiceProps,
  ServiceType,
} from "@/api/Service/Querys/useGetServices";
import {
  OrganizationPriority,
  parseOrganizationPrioritise,
} from "@/api/Organization/Querys/useGetOrganization";
import { UpdatePriorities } from "@/api/Organization/Mutations/useUpdateOrganization";

export interface ProcessDetailsProps {
  provisionalContractor?: string;
  title?: string;
  clientBillingAddress?: UserAddressProps;
  clientDeliverAddress?: UserAddressProps;
  amount: number;
  priorities: OrganizationPriority[];
}

export type ProcessError = {
  key: ProcessErrorType;
  groupID?: number;
};

export type ProcessErrorType =
  | "Service-ADDITIVE_MANUFACTURING-models"
  | "Service-ADDITIVE_MANUFACTURING-material"
  | "ServiceManufacturingPostProcessing"
  | "Process-Contractor"
  | "Process-Address-Billing"
  | "Process-Address-Deliver"
  | "Process-ServiceType";

export type Process = NoServiceProcessProps | DefinedProcess;

export type DefinedProcess = ManufactoringProcessProps | ModelingProcessProps;

export type DefaultProcessProps = {
  client: string;
  contractor: { name?: string; hashedID?: string };
  processID: string;
  processStatus: ProcessStatus;
  processStatusButtons?: StatusButtonPropsExtern[];
  processDetails: ProcessDetailsProps;
  processErrors: ProcessError[];
  serviceType: ServiceType;
  serviceStatus: number;
  serviceDetails: ServiceProps;
  createdWhen: Date;
  updatedWhen: Date;
  accessedWhen: Date;
  files: ProcessFile[];
  messages: { [key: string]: ChatMessageProps[] };
  dependenciesIn: any[];
  dependenciesOut: any[];
  project: {
    projectID: string;
    projectStatus: number;
    client: string;
    projectDetails: {
      title: string;
    };
    createdWhen: Date;
    updatedWhen: Date;
    accessedWhen: Date;
  };
};

export type NoServiceProcessProps = {
  serviceType: ServiceType.NONE;
  serviceDetails: undefined;
} & DefaultProcessProps;

export type ManufactoringProcessProps = {
  serviceType: ServiceType.ADDITIVE_MANUFACTURING;
  serviceDetails: { groups: ManufacturingServiceProps[] };
} & DefaultProcessProps;

export type ModelingProcessProps = {
  serviceType: ServiceType.CREATE_MODEL;
  serviceDetails: ModelingServiceProps;
} & DefaultProcessProps;

export type FileProps = {
  createdBy: string;
  date: Date;
  fileName: string;
  id: string;
  path: string;
};

export type ProcessFile = DefaultProcessFile | ProcessModel;

export interface GenericProcessFile {
  id: string;
  date: Date;
  size: number;
  fileName: string;
  imgPath: string;
  createdBy: string;
  createdByID: string;
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

export type ProcessModel = {
  type: "Model";
  tags: string[];
  licenses: string[];
  certificates: string[];
  quantity: number;
  levelOfDetail: ModelLevelOfDetail;
  isFile: boolean;
  volume?: number;
  width?: number;
  length?: number;
  height?: number;
  scalingFactor?: number;
  complexity?: ModelComplexity;
} & GenericProcessFile;

export enum ModelLevelOfDetail {
  "LOW",
  "MEDIUM",
  "HIGH",
}

export enum ModelComplexity {
  "LOW",
  "LOW_MEDIUM",
  "MEDIUM",
  "MEDIUM_HIGH",
  "HIGH",
}

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
  priorities?: UpdatePriorities;
}

export interface ProcessDeletionsProps {
  processDetails?: "";
  serviceDetails?: {
    groups?: {
      groupID?: number;
      delete?: boolean;
      title?: boolean;
      model?: string[];
      material?: {};
      postProcessings?: string[];
    }[];
  };
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

export const isProcessAtServiceStatus = (process: Process): boolean => {
  return (
    process.processStatus >= ProcessStatus.SERVICE_READY &&
    process.processStatus <= ProcessStatus.SERVICE_COMPLICATION
  );
};

export const isTypeOfProcess = (process: any): process is Process => {
  return (
    process.processID !== undefined &&
    typeof process.processID === "string" &&
    process.project !== undefined &&
    typeof process.project === "object" &&
    process.serviceDetails !== undefined &&
    typeof process.serviceDetails === "object" &&
    process.processStatus !== undefined &&
    typeof process.processStatus === "number" &&
    process.serviceType !== undefined &&
    typeof process.serviceType === "number" &&
    process.serviceStatus !== undefined &&
    typeof process.serviceStatus === "number" &&
    process.processDetails !== undefined &&
    typeof process.processDetails === "object" &&
    process.dependenciesIn !== undefined &&
    process.dependenciesOut !== undefined &&
    process.client !== undefined &&
    typeof process.client === "string" &&
    process.files !== undefined &&
    typeof process.files === "object" &&
    process.messages !== undefined &&
    typeof process.messages === "object" &&
    process.contractor !== undefined &&
    typeof process.contractor === "object" &&
    process.createdWhen !== undefined &&
    process.updatedWhen !== undefined &&
    process.accessedWhen !== undefined &&
    // process.processStatusButtons !== undefined &&
    // typeof process.processStatusButtons === "object" &&
    process.processErrors !== undefined &&
    typeof process.processErrors === "object"
  );
};

export const parseProcess = (process: any): Process => {
  const parsedProcess: Process = {
    processID: process.processID,
    project: process.project,
    processStatus: process.processStatus,
    serviceType: process.serviceType,
    serviceStatus: process.serviceStatus,
    serviceDetails:
      process.serviceType === ServiceType.ADDITIVE_MANUFACTURING
        ? {
            groups: process.serviceDetails.groups.map((group: any) => ({
              ...group,
              material:
                Object.keys(group.material).length === 0
                  ? undefined
                  : group.material,
            })),
          }
        : process.serviceDetails,
    processDetails: {
      amount: process.processDetails.amount,
      provisionalContractor: process.processDetails.provisionalContractor,
      title: process.processDetails.title,
      clientBillingAddress:
        process.processDetails.clientBillingAddress === undefined ||
        Object.keys(process.processDetails.clientBillingAddress).length === 0
          ? undefined
          : process.processDetails.clientBillingAddress,
      clientDeliverAddress:
        process.processDetails.clientDeliverAddress === undefined ||
        Object.keys(process.processDetails.clientDeliverAddress).length === 0
          ? undefined
          : process.processDetails.clientDeliverAddress,
      priorities: parseOrganizationPrioritise(
        process.processDetails.priorities
      ),
    },
    dependenciesIn: process.dependenciesIn,
    dependenciesOut: process.dependenciesOut,
    client: process.client,
    files: process.files,
    messages: process.messages,
    contractor: process.contractor,
    createdWhen: new Date(process.createdWhen),
    updatedWhen: new Date(process.updatedWhen),
    accessedWhen: new Date(process.accessedWhen),
    processStatusButtons: process.processStatusButtons,
    processErrors: process.processErrors,
  };

  return parsedProcess;
};

const useGetProcess = (customProjectID?: string, customProcessID?: string) => {
  const { projectID: paramsProjectID, processID: paramsProcessID } =
    useParams();
  const projectID = customProjectID ? customProjectID : paramsProjectID;
  const processID = customProcessID ? customProcessID : paramsProcessID;

  const getProcess = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/process/get/${projectID}/${processID}/`
      )
      .then((response) => {
        // const process: Process = {
        //   ...response.data,
        //   updatedWhen: new Date(response.data.updatedWhen),
        //   createdWhen: new Date(response.data.createdWhen),
        //   accessedWhen: new Date(response.data.accessedWhen),
        //   files: Object.values(response.data.files),
        //   serviceDetails: response.data.serviceDetails,
        //   processDetails: {
        //     ...response.data.processDetails,
        //     clientBillingAddress:
        //       response.data.processDetails.clientBillingAddress === undefined ||
        //       Object.keys(response.data.processDetails.clientBillingAddress)
        //         .length === 0
        //         ? undefined
        //         : response.data.processDetails.clientBillingAddress,
        //     clientDeliverAddress:
        //       response.data.processDetails.clientDeliverAddress === undefined ||
        //       Object.keys(response.data.processDetails.clientDeliverAddress)
        //         .length === 0
        //         ? undefined
        //         : response.data.processDetails.clientDeliverAddress,
        //     priorities: parseOrganizationPrioritise(
        //       response.data.processDetails.priorities
        //     ),
        //   },
        //   messages:
        //     Object.keys(response.data.messages).length === 0
        //       ? []
        //       : response.data.messages,
        // };

        logger("useGetProcess | getProcess ✅ |", response.data);
        if (isTypeOfProcess(response.data)) {
          return parseProcess(response.data);
        } else {
          throw new Error("Process is not of type Process");
        }
      });

  return useQuery<Process, Error>({
    queryKey: ["project", projectID, processID],
    queryFn: getProcess,
  });
};

export default useGetProcess;
