import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode, OntoNodeNew } from "../../Ontology/Querys/useGetOntoNodes";

interface useSubmitOrgaNodeProps {
  type: "update" | "create";
  node: OntoNode | OntoNodeNew;
  edges: { create: string[]; delete: string[] };
}

const useSubmitOrgaNode = () => {
  const queryClient = useQueryClient();
  const submitOrgaNode = async (props: useSubmitOrgaNodeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/create-and-link/`,
        {
          ...props,
          node: {
            ...props.node,
            nodeName: props.node.name,
            name: undefined,
            edges: undefined,
          },
        }
      )
      .then((response) => {
        logger("useSubmitOrgaNode | submitOrgaNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useSubmitOrgaNode | submitOrgaNode ❌ |", error);
      });

  return useMutation<string, Error, useSubmitOrgaNodeProps>({
    mutationFn: submitOrgaNode,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useSubmitOrgaNode;
