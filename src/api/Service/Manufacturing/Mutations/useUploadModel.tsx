import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

interface ModelUploadProps {
  tags: string[];
  date: Date;
  licenses: string[];
  certificates: string[];
}

interface UploadModelProps {
  projectID: string;
  processID: string;
  model: ModelUploadProps;
  file: File;
}

const useUploadModel = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const uploadModel = async ({
    file,
    model,
    processID,
    projectID,
  }: UploadModelProps) => {
    const formData = new FormData();
    formData.append(file.name, file);
    formData.append("tags", model.tags.join(","));
    formData.append("licenses", model.licenses.join(","));
    formData.append("certificates", model.certificates.join(","));
    formData.append("projectID", projectID);
    formData.append("processID", processID);
    return authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/uploadModel/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((response) => {
        logger("useUploadModel | uploadModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUploadModel | uploadModel ❌ |", error);
      });
  };

  return useMutation<string, Error, UploadModelProps>({
    mutationFn: uploadModel,
    onSuccess: (data, UploadModelProps, context) => {
      navigate("../material");
      queryClient.invalidateQueries(["project", UploadModelProps.projectID]);
    },
  });
};

export default useUploadModel;
