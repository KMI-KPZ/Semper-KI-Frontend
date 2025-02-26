import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  ModelLevelOfDetail,
  ProcessOrigin,
} from "@/api/Process/Querys/useGetProcess";

interface ModelUploadDetails {
  tags: string[];
  date: Date;
  licenses: string[];
  certificates: string[];
  quantity: number;
  levelOfDetail: ModelLevelOfDetail;
  femRequested?: boolean;
  testType?: "elongation" | "compression";
  pressure?: number;
}

export interface UploadModel {
  details: ModelUploadDetails;
  file: File;
}

interface ModelsUpload {
  projectID: string;
  processID: string;
  groupID: number;
  origin: ProcessOrigin;
  models: UploadModel[];
}

const useUploadModels = () => {
  const queryClient = useQueryClient();
  const uploadModel = async ({
    models: _models,
    processID,
    projectID,
    groupID,
    origin,
  }: ModelsUpload) => {
    const formData = new FormData();
    let detailList: { details: ModelUploadDetails; fileName: string }[] = [];
    _models.forEach((model) => {
      const { details, file } = model;
      formData.append(file.name, file);
      detailList.push({ details, fileName: file.name });
    });
    formData.append("details", JSON.stringify(detailList));
    formData.append("projectID", projectID);
    formData.append("processID", processID);
    formData.append("groupID", "" + groupID);
    formData.append("origin", origin);

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
    onSuccess: (_, modelUploadProps) => {
      // navigate("../material");
      queryClient.invalidateQueries([
        "project",
        modelUploadProps.projectID,
        modelUploadProps.processID,
      ]);
    },
  });
};

export default useUploadModels;
