import { customAxios } from "@/api/customAxios";
import {
  useMutation,
  UseMutationResult,
  useQueryClient,
} from "@tanstack/react-query";
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
  licenses: string[];
  certificates: string[];
}

interface UploadModelProps {
  projectID: string;
  processID: string;
  model: ModelUploadProps;
  file: File;
}

const useModelUpload = (): ReturnProps => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const uploadModel = useMutation<ModelProps[], Error, UploadModelProps>({
    mutationFn: async (props) => {
      const { model, processID, projectID, file } = props;
      const formData = new FormData();
      formData.append(file.name, file);
      formData.append("tags", model.tags.join(","));
      formData.append("licenses", model.licenses.join(","));
      formData.append("certificates", model.certificates.join(","));
      formData.append("projectID", projectID);
      formData.append("processID", processID);
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/uploadModel/`;
      return customAxios
        .post(apiUrl, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((response) => {
          logger("useModelUpload | uploadModel ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess(data, variables, context) {
      // const model: ModelProps[] = Object.entries(data).map(([key, value]) => {
      //   logger("UseModelUpload | onSuccess ✅ |", value);
      //   return { ...value } as ModelProps;
      // });
      // if (model.length === 0) return;
      // updateProcessWithProcessID.mutate({
      //   processID: variables.processID,
      //   updates: { changes: { service: { model: model[0] } } },
      // });
      queryClient.invalidateQueries(["project", variables.projectID]);
      navigate("../material");
    },
  });

  return { uploadModel };
};

export default useModelUpload;
