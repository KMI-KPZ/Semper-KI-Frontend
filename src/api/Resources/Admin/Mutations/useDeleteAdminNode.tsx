import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteAdminNodeProps {
  nodeID: string;
}

const useDeleteAdminNode = () => {
  const queryClient = useQueryClient();
  const deleteAdminNode = async ({ nodeID }: useDeleteAdminNodeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/delete/${nodeID}/`
      )
      .then((response) => {
        logger("useDeleteAdminNode | deleteAdminNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteAdminNode | deleteAdminNode ❌ |", error);
      });

  return useMutation<string, Error, useDeleteAdminNodeProps>({
    mutationFn: deleteAdminNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useDeleteAdminNode;
