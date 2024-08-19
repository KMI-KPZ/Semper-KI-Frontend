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
          nodes: response.data.Nodes,
          edges: response.data.Edges,
        };

        logger("useGetGraph | getGraph ✅ |", response);
        return data;
      });

  return useQuery<ReturnDataType, Error>({
    queryKey: ["graph"],
    queryFn: getGraph,
    enabled: process.env.NODE_ENV === "development",
  });
};

export default useGetGraph;
