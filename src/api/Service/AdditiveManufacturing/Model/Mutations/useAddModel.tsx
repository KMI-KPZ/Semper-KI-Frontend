import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface AddModelProps {
  projectID: string;
  processID: string;
  modelID: string;
}

const useAddModel = () => {
  const queryClient = useQueryClient();
  const addModel = async (props: AddModelProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/model/add/`,
        props
      )
      .then((response) => {
        logger("useAddModel | addModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useAddModel | addModel ❌ |", error);
      });

  return useMutation<string, Error, AddModelProps>({
    mutationFn: addModel,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useAddModel;
