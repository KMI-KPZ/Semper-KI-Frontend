import { getCustomAxios } from "@/hooks/useCustomAxios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ModelProps } from "../types";
import logger from "@/hooks/useLogger";
import { useNavigate } from "react-router-dom";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface ReturnProps {
  uploadModels: UseMutationResult<
    ModelProps[],
    Error,
    UploadModelsProps,
    unknown
  >;
}

interface UploadModelsProps {
  processID: string;
  file: File;
}

const useModelUpload = (): ReturnProps => {
  const navigate = useNavigate();
  const { updateProcess } = useProcess();

  const uploadModels = useMutation<ModelProps[], Error, UploadModelsProps>({
    mutationFn: async (props) => {
      const { file, processID } = props;
      const formData = new FormData();
      // files.forEach((file) => {
      formData.append(file.name, file);
      // });
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/uploadModels/`;
      return getCustomAxios()
        .post(
          apiUrl,
          {
            processID,
            file: formData,
          },
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        )
        .then((response) => {
          logger("useModelUpload | uploadModels ✅ |", response.data);
          return response.data.models;
        });
    },
    onSuccess(data) {
      updateProcess.mutate({
        changes: {
          service: {
            model: data[0],
          },
        },
      });
      navigate("..");
    },
  });

  return { uploadModels };
};

export default useModelUpload;
