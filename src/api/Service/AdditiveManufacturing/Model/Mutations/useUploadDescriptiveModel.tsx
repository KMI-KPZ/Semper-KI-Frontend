import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProcessOrigin } from "@/api/Process/Querys/useGetProcess";

interface useUploadDescriptiveModelProps {
  name: string;
  projectID: string;
  processID: string;
  levelOfDetail: number;
  width: number;
  height: number;
  length: number;
  volume: number;
  quantity: number;
  tags: string[];
  origin: ProcessOrigin;
  complexity: number;
  groupID: number;
}

const useUploadDescriptiveModel = () => {
  const queryClient = useQueryClient();
  const uploadDescriptiveModel = async (
    props: useUploadDescriptiveModelProps
  ) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/upload-wo-file/`,
        props
      )
      .then((response) => {
        logger(
          "useUploadDescriptiveModel | uploadDescriptiveModel ✅ |",
          response
        );
        return response.data;
      })
      .catch((error) => {
        logger(
          "useUploadDescriptiveModel | uploadDescriptiveModel ❌ |",
          error
        );
      });

  return useMutation<string, Error, useUploadDescriptiveModelProps>({
    mutationFn: uploadDescriptiveModel,
    onSuccess: (_, modelUploadProps) => {
      queryClient.invalidateQueries([
        "project",
        modelUploadProps.projectID,
        modelUploadProps.processID,
      ]);
    },
  });
};

export default useUploadDescriptiveModel;
