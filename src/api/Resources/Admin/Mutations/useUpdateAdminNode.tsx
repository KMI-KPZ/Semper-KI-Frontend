import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "@/api/Resources/Organization/Querys/useGetOrgaNodes";

export interface UpdateAdminNode extends Partial<OntoNode> {
  nodeID: string;
}

const useUpdateAdminNode = () => {
  const queryClient = useQueryClient();
  const updateAdminNode = async (node: UpdateAdminNode) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/update/`,
        {
          ...node,
          nodeID: node.nodeID,
          nodeName: node.name,
          name: undefined,
        }
      )
      .then((response) => {
        logger("useUpdateAdminNode | updateAdminNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateAdminNode | updateAdminNode ❌ |", error);
      });

  return useMutation<string, Error, UpdateAdminNode>({
    mutationFn: updateAdminNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useUpdateAdminNode;
