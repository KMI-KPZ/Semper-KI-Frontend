import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "../../Ontology/Querys/useGetOntoNodes";

export interface UpdateOrgaNode extends Partial<OntoNode> {
  nodeID: string;
}

const useUpdateOrgaNode = () => {
  const queryClient = useQueryClient();
  const updateOrgaNode = async (node: UpdateOrgaNode) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/update/`,
        {
          ...node,
          nodeID: node.nodeID,
          nodeName: node.name,
          name: undefined,
        }
      )
      .then((response) => {
        logger("useUpdateOrgaNode | updateOrgaNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateOrgaNode | updateOrgaNode ❌ |", error);
      });

  return useMutation<string, Error, UpdateOrgaNode>({
    mutationFn: updateOrgaNode,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useUpdateOrgaNode;
