import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OntoNode, OntoNodeType } from "./useGetOntoNodes";

interface useGetOntoNodeNeighborsProps {
  nodeID: string;
  nodeType: OntoNodeType;
}

const useGetOntoNodeNeighbors = ({
  nodeID,
  nodeType,
}: useGetOntoNodeNeighborsProps) => {
  const queryClient = useQueryClient();
  const getOntoNodeNeighbors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/nodes/neighbors/get/${nodeID}/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) => ({
          ...node,
          name: node.nodeName,
        }));
        logger("useGetOntoNodeNeighbors | getOntoNodeNeighbors ✅ |", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "onto", "nodes", nodeID, nodeType],
    queryFn: getOntoNodeNeighbors,
    enabled: nodeID !== "",
  });
};

export default useGetOntoNodeNeighbors;
