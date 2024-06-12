import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface SetModelProps {
  projectID: string;
  processID: string;
  modelID: string;
}

const useSetModel = () => {
  const queryClient = useQueryClient();
  const setModel = async (props: SetModelProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/setitive-manufacturing/model/set/`,
        props
      )
      .then((response) => {
        logger("useSetModel | setModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSetModel | setModel ❌ |", error);
      });

  return useMutation<string, Error, SetModelProps>({
    mutationFn: setModel,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries([
        "project",
        props.projectID,
        props.processID,
      ]);
    },
  });
};

export default useSetModel;
