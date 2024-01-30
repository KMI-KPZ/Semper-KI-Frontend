import useProcessMutations, {
  DeleteModelMutationProps,
  DeleteProcessMutationProps,
  DownloadFileMutationProps,
  DownloadZIPMutationProps,
  StatusButtonRequestMutationProps,
  UpdateProcessMutationProps,
  UploadFilesMutationProps,
} from "@/api/Process/useProcessMutations";
import {
  DownloadFilesZIPProps,
  ProcessProps,
  ProcessStatus,
} from "./useProcess";
import { MutateOptions } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

interface useGeneralProcessReturnProps {
  createProcess: () => void;
  updateProcess: (
    props: UpdateProcessMutationProps,
    options?: MutateOptions<string, Error, UpdateProcessMutationProps, unknown>
  ) => void;
  deleteProcess: (props: DeleteProcessMutationProps) => void;
  uploadFiles: (props: UploadFilesMutationProps) => void;
  downloadFile: (
    props: DownloadFileMutationProps,
    options?: MutateOptions<Blob, Error, DownloadFileMutationProps, unknown>
  ) => void;
  deleteFile: (props: DownloadFileMutationProps) => void;
  downloadZIP: (
    props: DownloadFilesZIPProps,
    options?: MutateOptions<Blob, Error, DownloadZIPMutationProps, unknown>
  ) => void;
  getNavigationPrefix: (currentProcessID: string) => string;
  deleteModel: (props: DeleteModelMutationProps) => void;
  statusButtonRequest: (props: StatusButtonRequestMutationProps) => void;
}

export const isProcessAtServiceStatus = (process: ProcessProps): boolean => {
  return (
    process.processStatus >= ProcessStatus.SERVICE_READY &&
    process.processStatus <= ProcessStatus.SERVICE_COMPLICATION
  );
};

const useGeneralProcess = (): useGeneralProcessReturnProps => {
  const {
    createProcessMutation,
    updateProcessMutation,
    deleteProcessMutation,
    uploadFilesMutation,
    downloadFileMutation,
    deleteFileMutation,
    downloadZIPMutation,
    deleteModelMutation,
    statusButtonRequestMutation,
  } = useProcessMutations();
  const { processID } = useParams();

  const createProcess = () => {
    createProcessMutation.mutate();
  };
  const updateProcess = (
    props: UpdateProcessMutationProps,
    options?: MutateOptions<string, Error, UpdateProcessMutationProps, unknown>
  ) => {
    updateProcessMutation.mutate(props, options);
  };
  const deleteProcess = (props: DeleteProcessMutationProps) => {
    deleteProcessMutation.mutate(props);
  };
  const uploadFiles = (props: UploadFilesMutationProps) => {
    uploadFilesMutation.mutate(props);
  };
  const downloadFile = (
    props: DownloadFileMutationProps,
    options?: MutateOptions<Blob, Error, DownloadFileMutationProps, unknown>
  ) => {
    downloadFileMutation.mutate(props, options);
  };
  const deleteFile = (props: DownloadFileMutationProps) => {
    deleteFileMutation.mutate(props);
  };
  const downloadZIP = (
    props: DownloadFilesZIPProps,
    options?: MutateOptions<Blob, Error, DownloadZIPMutationProps, unknown>
  ) => {
    downloadZIPMutation.mutate(props, options);
  };
  const deleteModel = (props: DeleteModelMutationProps) => {
    deleteModelMutation.mutate(props);
  };

  const getNavigationPrefix = (currentProcessID: string) => {
    const paramProcessIDAvaliable = processID !== undefined;
    const processIDsAreEqual = processID === currentProcessID;

    if (processIDsAreEqual) return "";
    if (!paramProcessIDAvaliable) return `${currentProcessID}/`;
    return `../${currentProcessID}/`;
  };

  const statusButtonRequest = (props: StatusButtonRequestMutationProps) => {
    statusButtonRequestMutation.mutate(props);
  };

  return {
    getNavigationPrefix,
    createProcess,
    deleteFile,
    deleteProcess,
    downloadFile,
    downloadZIP,
    updateProcess,
    uploadFiles,
    deleteModel,
    statusButtonRequest,
  };
};

export default useGeneralProcess;
