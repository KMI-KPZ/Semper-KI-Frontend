import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ProcessModel } from "@/api/Process/Querys/useGetProcess";

interface useUpdateModelProps {
  projectID: string;
  processID: string;
  model: ProcessModel;
}

const useUpdateModel = () => {
  const queryClient = useQueryClient();
  const updateModel = async (props: useUpdateModelProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/updateModel/`, {
        projectID: props.projectID,
        processID: props.processID,
        ...props.model,
      })
      .then((response) => {
        logger("useUpdateModel | updateModel ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateModel | updateModel ❌ |", error);
      });

  return useMutation<string, Error, useUpdateModelProps>({
    mutationFn: updateModel,
    onSuccess: (_, updateModelProps) => {
      queryClient.invalidateQueries([
        "project",
        updateModelProps.projectID,
        updateModelProps.processID,
      ]);
    },
  });
};

export default useUpdateModel;
