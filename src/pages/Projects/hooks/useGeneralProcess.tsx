import useProcessMutations, {
  DeleteProcessMutationProps,
  DownloadFileMutationProps,
  DownloadZIPMutationProps,
  UpdateProcessMutationProps,
  UploadFilesMutationProps,
} from "@/api/Process/useProcessMutations";
import { DownloadFilesZIPProps } from "./useProcess";
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
}

const useGeneralProcess = (): useGeneralProcessReturnProps => {
  const {
    createProcessMutation,
    updateProcessMutation,
    deleteProcessMutation,
    uploadFilesMutation,
    downloadFileMutation,
    deleteFileMutation,
    downloadZIPMutation,
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

  const getNavigationPrefix = (currentProcessID: string) => {
    const paramProcessIDAvaliable = processID !== undefined;
    const atCurrentProcessID =
      paramProcessIDAvaliable && processID === currentProcessID;
    return `${atCurrentProcessID ? "" : `..`}${
      paramProcessIDAvaliable ? "" : ""
    }`;
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
  };
};

export default useGeneralProcess;
