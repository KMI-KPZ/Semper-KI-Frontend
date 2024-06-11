import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface UpdateModelProps {
  modelID: string;
  processID: string;
  projectID: string;
}

const useUpdateModel = () => {
  const queryClient = useQueryClient();
  const updateModel = async (props: UpdateModelProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/update/`,
        props
      )
      .then((response) => {
        logger("useUpdateModel | updateModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateModel | updateModel ❌ |", error);
      });

  return useMutation<string, Error, UpdateModelProps>({
    mutationFn: updateModel,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useUpdateModel;
