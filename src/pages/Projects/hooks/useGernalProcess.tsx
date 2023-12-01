import useProcessMutations, {
  DeleteProcessMutationProps,
  DownloadFileMutationProps,
  UpdateProcessMutationProps,
  UploadFilesMutationProps,
} from "@/api/Process/useProcessMutations";
import { DownloadFilesZIPProps } from "./useProcess";

interface useGernalProcessReturnProps {
  createProcess: () => void;
  updateProcess: (props: UpdateProcessMutationProps) => void;
  deleteProcess: (props: DeleteProcessMutationProps) => void;
  uploadFiles: (props: UploadFilesMutationProps) => void;
  downloadFile: (props: DownloadFileMutationProps) => void;
  deleteFile: (props: DownloadFileMutationProps) => void;
  downloadZIP: (props: DownloadFilesZIPProps) => void;
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
  const updateProcess = (props: UpdateProcessMutationProps) => {
    updateProcessMutation.mutate(props);
  };
  const deleteProcess = (props: DeleteProcessMutationProps) => {
    deleteProcessMutation.mutate(props);
  };
  const uploadFiles = (props: UploadFilesMutationProps) => {
    uploadFilesMutation.mutate(props);
  };
  const downloadFile = (props: DownloadFileMutationProps) => {
    downloadFileMutation.mutate(props);
  };
  const deleteFile = (props: DownloadFileMutationProps) => {
    deleteFileMutation.mutate(props);
  };
  const downloadZIP = (props: DownloadFilesZIPProps) => {
    downloadZIPMutation.mutate(props);
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
