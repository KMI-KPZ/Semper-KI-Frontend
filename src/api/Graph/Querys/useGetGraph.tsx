import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
}

export interface Edge {
  source: string;
  target: string;
}

export interface ReturnDataType {
  nodes: Node[];
  edges: Edge[];
}

const useGetGraph = () => {
  const queryClient = useQueryClient();
  const getGraph = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/private/graph/get/`)
      .then((response) => {
        const data: ReturnDataType = {
          nodes: response.data.nodes.map((node: any) => ({
            id: node.nodeID,
            name: node.nodeName,
          })),
          edges: response.data.edges.map(
            (edge: any): Edge => ({ source: edge[0], target: edge[1] })
          ),
        };

        logger("useGetGraph | getGraph ✅ |", response);
        return data;
      });

  return useQuery<ReturnDataType, Error>({
    queryKey: ["graph"],
    queryFn: getGraph,
  });
};

export default useGetGraph;
