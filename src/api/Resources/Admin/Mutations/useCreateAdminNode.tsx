import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeNew,
  parseOntoNode,
} from "../../Ontology/Querys/useGetOntoNodes";

interface useCreateAdminNodeProps {
  node: OntoNodeNew;
}

const useCreateAdminNode = () => {
  const queryClient = useQueryClient();
  const createAdminNode = async ({ node }: useCreateAdminNodeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/create/`,
        { ...node, nodeName: node.name, name: undefined }
      )
      .then((response) => {
        logger("useCreateAdminNode | createAdminNode ✅ |", response);
        return parseOntoNode(response.data);
      });
  // .catch((error) => {
  //   logger("useCreateAdminNode | createAdminNode ❌ |", error);
  // });

  return useMutation<OntoNode, Error, useCreateAdminNodeProps>({
    mutationFn: createAdminNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useCreateAdminNode;
