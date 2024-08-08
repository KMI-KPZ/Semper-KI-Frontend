import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ExistingOntoNode, OntoNode } from "../Querys/useGetOntoNodes";

const useUpdateOntoNode = () => {
  const queryClient = useQueryClient();
  const updateOntoNode = async (node: ExistingOntoNode) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/update/`,
        node
      )
      .then((response) => {
        logger("useUpdateNode | updateNode ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateNode | updateNode ❌ |", error);
      });

  return useMutation<string, Error, ExistingOntoNode>({
    mutationFn: updateOntoNode,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources", "onto"]);
    },
  });
};

export default useUpdateOntoNode;
