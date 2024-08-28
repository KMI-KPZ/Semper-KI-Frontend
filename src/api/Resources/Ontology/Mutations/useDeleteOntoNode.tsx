import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteOntoNodeProps {
  nodeID: string;
}

const useDeleteOntoNode = () => {
  const queryClient = useQueryClient();
  const deleteOntoNode = async ({ nodeID }: useDeleteOntoNodeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/delete/${nodeID}/`
      )
      .then((response) => {
        logger("useDeleteNode | deleteNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteNode | deleteNode ❌ |", error);
      });

  return useMutation<string, Error, useDeleteOntoNodeProps>({
    mutationFn: deleteOntoNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "onto"]);
    },
  });
};

export default useDeleteOntoNode;
