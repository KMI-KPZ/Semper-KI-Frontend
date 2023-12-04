import useProcessMutations, {
  DeleteProcessMutationProps,
  DownloadFileMutationProps,
  DownloadZIPMutationProps,
  UpdateProcessMutationProps,
  UploadFilesMutationProps,
} from "@/api/Process/useProcessMutations";
import { DownloadFilesZIPProps } from "./useProcess";
import { MutateOptions } from "@tanstack/react-query";

interface useGernalProcessReturnProps {
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
}

const useGernalProcess = (): useGernalProcessReturnProps => {
  const {
    createProcessMutation,
    updateProcessMutation,
    deleteProcessMutation,
    uploadFilesMutation,
    downloadFileMutation,
    deleteFileMutation,
    downloadZIPMutation,
  } = useProcessMutations();

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

  return {
    createProcess,
    deleteFile,
    deleteProcess,
    downloadFile,
    downloadZIP,
    updateProcess,
    uploadFiles,
  };
};

export default useGernalProcess;
