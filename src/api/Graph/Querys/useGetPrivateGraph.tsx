import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { OntoNodeType } from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

export interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  type: OntoNodeType;
}

export interface Edge {
  source: string;
  target: string;
}

export interface Graph {
  nodes: Node[];
  edges: Edge[];
}

const useGetPrivateGraph = () => {
  const getGraph = async () =>
    authorizedCustomAxios
      .get(`${process.env.VITE_HTTP_API_URL}/private/graph/get/`)
      .then((response) => {
        const data: Graph = {
          nodes: response.data.Nodes,
          edges: response.data.Edges,
        };

        logger("useGetGraph | getGraph ✅ |", response);
        return data;
      });

  return useQuery<Graph, Error>({
    queryKey: ["graph", "private"],
    queryFn: getGraph,
    enabled: process.env.NODE_ENV === "development",
  });
};

export default useGetPrivateGraph;
