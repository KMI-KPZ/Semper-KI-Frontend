import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useCreateAdminEdgeProps {
  ID1: string;
  ID2: string;
}

const useCreateAdminEdge = () => {
  const queryClient = useQueryClient();
  const createAdminEdge = async (props: useCreateAdminEdgeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/edge/create/`,
        props
      )
      .then((response) => {
        logger("useCreateAdminEdge | createAdminEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateAdminEdge | createAdminEdge ❌ |", error);
      });

  return useMutation<string, Error, useCreateAdminEdgeProps>({
    mutationFn: createAdminEdge,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useCreateAdminEdge;
