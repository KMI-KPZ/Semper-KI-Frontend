import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OntoNode } from "./useGetOntoNodes";
import { useParams } from "react-router-dom";

const useGetOntoNode = () => {
  const queryClient = useQueryClient();
  const { nodeID } = useParams();
  const getOntoNode = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/nodes/get/by-id/${nodeID}/`
      )
      .then((response) => {
        const data: OntoNode = response.data.map((node: any) => ({
          ...node,
          name: node.nodeName,
        }));

        logger("useGetOntoNode | getOntoNode ✅ |", response);
        return data;
      });

  return useQuery<OntoNode, Error>({
    queryKey: ["resources", "onto", "node", nodeID],
    enabled: nodeID !== undefined && nodeID !== "",
    queryFn: getOntoNode,
  });
};

export default useGetOntoNode;
