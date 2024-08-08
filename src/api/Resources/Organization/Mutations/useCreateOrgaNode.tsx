import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "../../Ontology/Querys/useGetOntoNodes";

interface useCreateOrgaNodeProps {
  node: OntoNode;
}

const useCreateOrgaNode = () => {
  const queryClient = useQueryClient();
  const createOrgaNode = async ({ node }: useCreateOrgaNodeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/create/`,
        node
      )
      .then((response) => {
        logger("useCreateOrgaNode | createOrgaNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateOrgaNode | createOrgaNode ❌ |", error);
      });

  return useMutation<string, Error, useCreateOrgaNodeProps>({
    mutationFn: createOrgaNode,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useCreateOrgaNode;
