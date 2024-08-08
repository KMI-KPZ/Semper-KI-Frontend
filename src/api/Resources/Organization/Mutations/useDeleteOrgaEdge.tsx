import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteOrgaEdgeProps {
  entityID: string;
}

const useDeleteOrgaEdge = () => {
  const queryClient = useQueryClient();
  const deleteOrgaEdge = async ({ entityID }: useDeleteOrgaEdgeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/delete/${entityID}/`
      )
      .then((response) => {
        logger("useDeleteOrgaEdge | deleteOrgaEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteOrgaEdge | deleteOrgaEdge ❌ |", error);
      });

  return useMutation<string, Error, useDeleteOrgaEdgeProps>({
    mutationFn: deleteOrgaEdge,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useDeleteOrgaEdge;
