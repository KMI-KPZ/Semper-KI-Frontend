import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface ModelUploadDetails {
  tags: string[];
  date: Date;
  licenses: string[];
  certificates: string[];
}

interface UploadModel {
  details: ModelUploadDetails;
  file: File;
}

interface ModelsUpload {
  projectID: string;
  processID: string;
  models: UploadModel[];
}

const useUploadModels = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const uploadModel = async ({
    models: _models,
    processID,
    projectID,
  }: ModelsUpload) => {
    const formData = new FormData();
    _models.forEach((model, index) => {
      const { details, file } = model;
      formData.append(file.name, file);
      formData.append(file.name, JSON.stringify(details));
    });

    formData.append("projectID", projectID);
    formData.append("processID", processID);

    return authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/upload/`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      )
      .then((response) => {
        logger("useUploadModel | uploadModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUploadModel | uploadModel ❌ |", error);
      });
  };

  return useMutation<string, Error, ModelsUpload>({
    mutationFn: uploadModel,
    onSuccess: (data, modelUploadProps, context) => {
      navigate("../material");
      queryClient.invalidateQueries(["project", modelUploadProps.projectID]);
    },
  });
};

export default useUploadModels;
