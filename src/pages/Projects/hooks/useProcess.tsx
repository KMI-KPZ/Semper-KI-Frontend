import { MutateOptions, UseQueryResult } from "@tanstack/react-query";
import { ProjectProps } from "./useProject";
import {
  ServiceProps,
  GerneralUpdateServiceProps,
  ServiceType,
} from "@/pages/Service/hooks/useService";
import { useContext } from "react";
import { ManufacturingServiceProps } from "@/pages/Service/Manufacturing/types/types";
import { ModelingServiceProps } from "@/pages/Service/Modelling/Modelling";
import { ProcessContext } from "../context/ProcessContext";
import {
  DownloadFileMutationProps,
  DownloadZIPMutationProps,
  UpdateProcessMutationProps,
} from "@/api/Process/useProcessMutations";
import useGeneralProcess from "./useGeneralProcess";

interface ReturnProps {
  process: ProcessProps;
  createProcess: () => void;
  updateProcess: (
    updates: UpdateProcessProps,
    options?: MutateOptions<string, Error, UpdateProcessMutationProps, unknown>
  ) => void;
  deleteProcess: () => void;
  uploadFiles: (files: File[]) => void;
  downloadFile: (
    fileID: string,
    options?: MutateOptions<Blob, Error, DownloadFileMutationProps, unknown>
  ) => void;
  downloadZIP: (
    fileIDs: string[],
    options?: MutateOptions<Blob, Error, DownloadZIPMutationProps, unknown>
  ) => void;
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
  client: string;
  processID: string;
  processStatus: ProcessStatus;
  processDetails: ProcessDetailsProps;
  serviceType: ServiceType;
  serviceStatus: number;
  serviceDetails: ServiceProps;
  createdWhen: Date;
  updatedWhen: Date;
  files: FileProps[];
  messages: ChatMessageProps[];
  contractor: string;
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

export interface UpdateProcessProps {
  changes?: ProcessChangesProps;
  deletions?: ProcessDeletionsProps;
}

export interface ProcessChangesProps {
  serviceStatus?: number;
  serviceType?: ServiceType;
  provisionalContractor?: string;
  messages?: ChatMessageProps;
  processStatus?: ProcessStatus;
  files?: File[];
  processDetails?: ProcessDetailsProps;
  serviceDetails?: GerneralUpdateServiceProps;
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
  } = useGeneralProcess();

  const updateProcess = (
    updates: UpdateProcessProps,
    options?: MutateOptions<string, Error, UpdateProcessMutationProps, unknown>
  ) => {
    _updateProcess(
      {
        processIDs: [process.processID],
        updates,
      },
      options
    );
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

  const downloadFile = (
    fileID: string,
    options?: MutateOptions<Blob, Error, DownloadFileMutationProps, unknown>
  ) => {
    _downloadFile({ processID: process.processID, fileID }, options);
  };

  const downloadZIP = (
    fileIDs: string[],
    options?: MutateOptions<Blob, Error, DownloadZIPMutationProps, unknown>
  ) => {
    _downloadZIP({ processID: process.processID, fileIDs }, options);
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
