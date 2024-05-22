import { MutateOptions, UseQueryResult } from "@tanstack/react-query";
import {
  ServiceProps,
  GerneralUpdateServiceProps,
  ServiceType,
} from "@/pages/Service/hooks/useService";
import { useContext } from "react";
import { ManufacturingServiceProps } from "@/pages/Service/Manufacturing/types/types";
import { ModelingServiceProps } from "@/pages/Service/Modelling/Modelling";
import { ProcessContext } from "../../contexts/ProcessContext";
import useGeneralProcess from "./useGeneralProcess";
import { useNavigate, useParams } from "react-router-dom";
import { UserAddressProps } from "@/hooks/useUser";
import useUpdateProcess, {
  UpdateProcessMutationProps,
  UpdateProcessProps,
} from "@/api/Process/Mutations/useUpdateProcess";
import useDownloadFiles, {
  DownloadFilesProps,
} from "@/api/Process/Mutations/useDownloadFiles";
import useDownloadFile from "@/api/Process/Mutations/useDownloadFile";
import useUploadFiles from "@/api/Process/Mutations/useUploadFiles";
import useDeleteProcess from "@/api/Process/Mutations/useDeleteProcess";
import useStatusButtonRequest from "@/api/Process/Mutations/useStatusButtonRequest";
import useDeleteFile from "@/api/Process/Mutations/useDeleteFile";
import useDeleteModel from "@/api/Process/Mutations/useDeleteModel";
import useCreateProcess from "@/api/Process/Mutations/useCreateProcess";
import { Project } from "@/api/Project/Querys/useGetProject";
import {
  StatusButtonActionRequestProps,
  StatusButtonPropsExtern,
} from "@/hooks/Project/useStatusButtons";

interface ReturnProps {
  process: Process;
  createProcess: () => void;
  updateProcess: (
    updates: UpdateProcessProps,
    options?: MutateOptions<string, Error, UpdateProcessMutationProps, unknown>
  ) => void;
  deleteProcess: () => void;
  uploadFiles: (files: File[]) => void;
  downloadFile: (
    fileID: string,
    options?: MutateOptions<Blob, Error, DownloadFileProps, unknown>
  ) => void;
  downloadZIP: (
    fileIDs: string[],
    options?: MutateOptions<Blob, Error, DownloadFilesProps, unknown>
  ) => void;
  deleteFile: (fileID: string) => void;
  getNavigationPrefix: () => string;
  deleteModel: () => void;
  statusButtonRequest: (button: StatusButtonActionRequestProps) => void;
}

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

const useProcess = (): ReturnProps => {
  const { process } = useContext(ProcessContext);
  const navigate = useNavigate();
  const { getNavigationPrefix: _getNavigationPrefix } = useGeneralProcess();
  const _updateProcess = useUpdateProcess();
  const _deleteProcess = useDeleteProcess();
  const _uploadFiles = useUploadFiles();
  const _downloadFile = useDownloadFile();
  const _downloadFiles = useDownloadFiles();
  const _deleteFile = useDeleteFile();
  const _deleteModel = useDeleteModel();
  const _statusButtonRequest = useStatusButtonRequest();
  const _createProcess = useCreateProcess();

  const createProcess = () => {
    _createProcess.mutate();
  };

  const updateProcess = (
    updates: UpdateProcessProps,
    options?: MutateOptions<string, Error, UpdateProcessMutationProps, unknown>
  ) => {
    _updateProcess.mutate(
      {
        processIDs: [process.processID],
        updates,
      },
      options
    );
  };

  const deleteProcess = () => {
    _deleteProcess.mutate({ processIDs: [process.processID] });
  };

  const uploadFiles = (files: File[]) => {
    _uploadFiles.mutate({
      processID: process.processID,
      files,
    });
  };

  const downloadFile = (
    fileID: string,
    options?: MutateOptions<Blob, Error, DownloadFileProps, unknown>
  ) => {
    _downloadFile.mutate({ processID: process.processID, fileID }, options);
  };

  const downloadZIP = (
    fileIDs: string[],
    options?: MutateOptions<Blob, Error, DownloadFilesProps, unknown>
  ) => {
    _downloadFiles.mutate({ processID: process.processID, fileIDs }, options);
  };

  const deleteFile = (fileID: string) => {
    _deleteFile.mutate({ processID: process.processID, fileID });
  };

  const getNavigationPrefix = (): string => {
    return _getNavigationPrefix(process.processID);
  };

  const deleteModel = () => {
    _deleteModel.mutate({ processID: process.processID });
  };

  const statusButtonRequest = (button: StatusButtonActionRequestProps) => {
    _statusButtonRequest.mutate({ processIDs: [process.processID], button });
  };

  return {
    process,
    statusButtonRequest,
    getNavigationPrefix,
    createProcess,
    deleteFile,
    deleteProcess,
    downloadFile,
    downloadZIP,
    updateProcess,
    uploadFiles,
    deleteModel,
  };
};

export default useProcess;
