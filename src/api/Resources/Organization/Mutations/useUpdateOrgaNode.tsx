import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "../../Ontology/Querys/useGetOntoNodes";

interface useUpdateOrgaNodeProps {
  node: OntoNode;
}

const useUpdateOrgaNode = () => {
  const queryClient = useQueryClient();
  const updateOrgaNode = async ({ node }: useUpdateOrgaNodeProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/update/`,
        node
      )
      .then((response) => {
        logger("useUpdateOrgaNode | updateOrgaNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateOrgaNode | updateOrgaNode ❌ |", error);
      });

  return useMutation<string, Error, useUpdateOrgaNodeProps>({
    mutationFn: updateOrgaNode,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useUpdateOrgaNode;
