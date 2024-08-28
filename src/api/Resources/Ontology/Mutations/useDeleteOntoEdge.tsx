import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteOntoEdgeProps {
  ID1: string;
  ID2: string;
}

const useDeleteOntoEdge = () => {
  const queryClient = useQueryClient();
  const deleteOntoEdge = async ({ ID1, ID2 }: useDeleteOntoEdgeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/edge/delete/${ID1}/${ID2}/`
      )
      .then((response) => {
        logger("useDeleteOntoEdge | deleteOntoEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteOntoEdge | deleteOntoEdge ❌ |", error);
      });

  return useMutation<string, Error, useDeleteOntoEdgeProps>({
    mutationFn: deleteOntoEdge,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "onto"]);
    },
  });
};

export default useDeleteOntoEdge;
