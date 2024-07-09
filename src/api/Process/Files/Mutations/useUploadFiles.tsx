import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { SingleProcessMutationProps } from "../../types";
import { useProject } from "@/hooks/Project/useProject";
import useProcess from "@/hooks/Process/useProcess";
import { ProcessOrigin } from "../../Querys/useGetProcess";

export type UploadFilesProps = {
  files: File[];
  origin: ProcessOrigin;
};

const useUploadFiles = () => {
  const {
    project: { projectID },
  } = useProject();
  const {
    process: { processID },
  } = useProcess();
  const queryClient = useQueryClient();
  const uploadFile = async (props: UploadFilesProps) => {
    const { files, origin } = props;
    const formData = new FormData();
    files.forEach((file) => formData.append(file.name, file));
    formData.append("processID", processID);
    formData.append("projectID", projectID);
    formData.append("origin", origin);
    return authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/files/upload/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        logger("useUploadFile | uploadFile ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUploadFile | uploadFile ❌ |", error);
      });
  };

  return useMutation<void, Error, UploadFilesProps>({
    mutationFn: uploadFile,
    onSuccess: () => {
      queryClient.invalidateQueries(["project", projectID]);
    },
  });
};

export default useUploadFiles;
