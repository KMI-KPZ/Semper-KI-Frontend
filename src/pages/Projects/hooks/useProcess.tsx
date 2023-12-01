import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import usePathID from "@/hooks/usePathID";
import { ProjectProps, useProject } from "./useProject";
import {
  ServiceProps,
  GerneralUpdateServiceProps,
  ServiceType,
} from "@/pages/Service/hooks/useService";
import { useContext } from "react";
import { ProjectContext } from "../context/ProjectContext";
import { ManufacturingServiceProps } from "@/pages/Service/Manufacturing/types/types";
import { ModelingServiceProps } from "@/pages/Service/Modelling/Modelling";
import { ProcessContext } from "../context/ProcessContext";
import useProcessMutations from "@/api/Process/useProcessMutations";
import useGernalProcess from "./useGernalProcess";

interface ReturnProps {
  process: ProcessProps;
  createProcess: () => void;
  updateProcess: (updates: UpdateProcessProps) => void;
  deleteProcess: () => void;
  uploadFiles: (files: File[]) => void;
  downloadFile: (fileID: string) => void;
  downloadZIP: (fileIDs: string[]) => void;
  deleteFile: (fileID: string) => void;
}

export interface ProcessDetailsProps {
  title?: string;
}

export type ProcessProps =
  | NoServiceProcessProps
  | ManufactoringProcessProps
  | ModelingProcessProps;

export type DefaultProcessProps = {
  processID: string;
  client: string;
  status: ProcessStatus;
  details: ProcessDetailsProps;
  serviceStatus: number;
  serviceType: ServiceType;
  service: ServiceProps;
  created: Date;
  updated: Date;
  files: FileProps[];
  messages: { messages: ChatMessageProps[] };
  contractor: string[];
};

export type NoServiceProcessProps = {
  serviceType: ServiceType.NONE;
  service: undefined;
} & DefaultProcessProps;

export type ManufactoringProcessProps = {
  serviceType: ServiceType.MANUFACTURING;
  service: ManufacturingServiceProps;
} & DefaultProcessProps;

export type ModelingProcessProps = {
  serviceType: ServiceType.MODELING;
  service: ModelingServiceProps;
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

export interface UpdateProcessProps {
  changes?: ProcessChangesProps;
  deletions?: ProcessDeletionsProps;
}

export interface ProcessChangesProps {
  contractor?: string[];
  messages?: ChatMessageProps;
  status?: ProcessStatus;
  files?: File[];
  details?: ProcessDetailsProps;
  service?: GerneralUpdateServiceProps;
}

export interface ProcessDeletionsProps {
  messages?: "";
  status?: "";
  files?: "";
  details?: "";
  service?: string[] | "";
}

export interface UplaodFilesProps {
  processID: string;
  files: File[];
}

export interface DownloadFileProps {
  processID: string;
  fileID: string;
}
export interface DownloadFilesZIPProps {
  processID: string;
  fileIDs: string[];
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
  process: ProcessProps | undefined;
  query: UseQueryResult<ProjectProps, Error>;
}

const useProcess = (): ReturnProps => {
  const { process } = useContext(ProcessContext);
  const {
    createProcess,
    updateProcess: _updateProcess,
    deleteProcess: _deleteProcess,
    uploadFiles: _uploadFiles,
    downloadFile: _downloadFile,
    downloadZIP: _downloadZIP,
    deleteFile: _deleteFile,
  } = useGernalProcess();

  const updateProcess = (updates: UpdateProcessProps) => {
    _updateProcess({
      processIDs: [process.processID],
      updates,
    });
  };

  const deleteProcess = () => {
    _deleteProcess({ processIDs: [process.processID] });
  };

  const uploadFiles = (files: File[]) => {
    _uploadFiles({
      processID: process.processID,
      files,
    });
  };

  const downloadFile = (fileID: string) => {
    _downloadFile({ processID: process.processID, fileID });
  };

  const downloadZIP = (fileIDs: string[]) => {
    _downloadZIP({ processID: process.processID, fileIDs });
  };

  const deleteFile = (fileID: string) => {
    _deleteFile({ processID: process.processID, fileID });
  };

  return {
    process,
    createProcess,
    deleteFile,
    deleteProcess,
    downloadFile,
    downloadZIP,
    updateProcess,
    uploadFiles,
  };
};

export default useProcess;
