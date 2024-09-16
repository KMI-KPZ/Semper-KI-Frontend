import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "../Querys/useGetOntoNodes";

const useUpdateOntoNode = () => {
  const queryClient = useQueryClient();
  const updateOntoNode = async (node: OntoNode) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/update/`,
        { ...node, nodeName: node.name, name: undefined }
      )
      .then((response) => {
        logger("useUpdateNode | updateNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateNode | updateNode ❌ |", error);
      });

  return useMutation<string, Error, OntoNode>({
    mutationFn: updateOntoNode,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources", "onto"]);
    },
  });
};

export default useUpdateOntoNode;
