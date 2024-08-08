import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteAllOrgaEdges = () => {
  const queryClient = useQueryClient();
  const deleteAllOrgaEdges = async () =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/all/delete/`
      )
      .then((response) => {
        logger("useDeleteAllOrgaEdges | deleteAllOrgaEdges ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteAllOrgaEdges | deleteAllOrgaEdges ❌ |", error);
      });

  return useMutation<string, Error, void>({
    mutationFn: deleteAllOrgaEdges,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useDeleteAllOrgaEdges;
