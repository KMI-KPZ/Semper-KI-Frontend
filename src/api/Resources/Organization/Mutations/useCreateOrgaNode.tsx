import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeNew,
  parseOntoNode,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

interface useCreateOrgaNodeProps {
  node: OntoNodeNew;
}

const useCreateOrgaNode = () => {
  const queryClient = useQueryClient();
  const createOrgaNode = async ({ node }: useCreateOrgaNodeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/create/`,
        { ...node, nodeName: node.name, name: undefined }
      )
      .then((response) => {
        logger("useCreateOrgaNode | createOrgaNode ✅ |", response);
        return parseOntoNode(response.data);
      });
  // .catch((error) => {
  //   logger("useCreateOrgaNode | createOrgaNode ❌ |", error);
  // });

  return useMutation<OntoNode, Error, useCreateOrgaNodeProps>({
    mutationFn: createOrgaNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useCreateOrgaNode;
