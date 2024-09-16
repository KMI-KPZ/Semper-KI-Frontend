import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteOrgaEdge = () => {
  const queryClient = useQueryClient();
  const deleteOrgaEdge = async (entityID: string) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/to-orga/delete/${entityID}/`
      )
      .then((response) => {
        logger("useDeleteOrgaEdge | deleteOrgaEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteOrgaEdge | deleteOrgaEdge ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: deleteOrgaEdge,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useDeleteOrgaEdge;
