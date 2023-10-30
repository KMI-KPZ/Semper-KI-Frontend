import { getCustomAxios } from "@/hooks/useCustomAxios";
import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { ModelProps } from "../types";
import logger from "@/hooks/useLogger";
import { useNavigate } from "react-router-dom";
import useProcess from "@/pages/Projects/hooks/useProcess";

interface ReturnProps {
  uploadModel: UseMutationResult<
    ModelProps[],
    Error,
    UploadModelProps,
    unknown
  >;
}

interface ModelUploadProps {
  tags: string[];
  date: Date;
  license: string[];
  certificate: string[];
}

interface UploadModelProps {
  projectID: string;
  processID: string;
  model: ModelUploadProps;
  file: File;
}

const useModelUpload = (): ReturnProps => {
  const uploadModel = useMutation<ModelProps[], Error, UploadModelProps>({
    mutationFn: async (props) => {
      const { model, processID, projectID, file } = props;
      const formData = new FormData();
      formData.append(file.name, file);
      formData.append("tags", model.tags.join(","));
      formData.append("license", model.license.join(","));
      formData.append("certificate", model.certificate.join(","));
      formData.append("projectID", projectID);
      formData.append("processID", processID);
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/uploadModel/`;
      return getCustomAxios()
        .post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          logger("useModelUpload | uploadModel ✅ |", response.data);
          return response.data.models;
        });
    },
  });

  return { uploadModel };
};

export default useModelUpload;
