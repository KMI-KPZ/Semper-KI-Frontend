import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useCreateOntoEdgeProps {
  ID1: string;
  ID2: string;
}

const useCreateOntoEdge = () => {
  const queryClient = useQueryClient();
  const createOntoEdge = async (props: useCreateOntoEdgeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/edge/create/`,
        props
      )
      .then((response) => {
        logger("useCreateOntoEdge | createOntoEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateOntoEdge | createOntoEdge ❌ |", error);
      });

  return useMutation<string, Error, useCreateOntoEdgeProps>({
    mutationFn: createOntoEdge,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources", "onto"]);
    },
  });
};

export default useCreateOntoEdge;
