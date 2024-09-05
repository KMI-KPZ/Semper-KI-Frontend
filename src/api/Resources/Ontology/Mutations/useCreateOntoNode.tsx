import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "../Querys/useGetOntoNodes";

const useCreateOntoNode = () => {
  const queryClient = useQueryClient();
  const createOntoNode = async (node: OntoNode) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/create/`,
        { ...node, nodeName: node.name, name: undefined }
      )
      .then((response) => {
        logger("useCreateNode | createNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateNode | createNode ❌ |", error);
      });

  return useMutation<string, Error, OntoNode>({
    mutationFn: createOntoNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "onto"]);
    },
  });
};

export default useCreateOntoNode;
