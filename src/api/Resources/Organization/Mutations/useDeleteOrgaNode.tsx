import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteOrgaNodeProps {
  nodeID: string;
}

const useDeleteOrgaNode = () => {
  const queryClient = useQueryClient();
  const deleteOrgaNode = async ({ nodeID }: useDeleteOrgaNodeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/delete/${nodeID}/`
      )
      .then((response) => {
        logger("useDeleteOrgaNode | deleteOrgaNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteOrgaNode | deleteOrgaNode ❌ |", error);
      });

  return useMutation<string, Error, useDeleteOrgaNodeProps>({
    mutationFn: deleteOrgaNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useDeleteOrgaNode;
