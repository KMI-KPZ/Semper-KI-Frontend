import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Graph } from "@/api/Graph/Querys/useGetGraph";

const useGetOrgaGraph = () => {
  const queryClient = useQueryClient();
  const getOrgaGraph = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/graph/get/`
      )
      .then((response) => {
        const data: Graph = {
          nodes: response.data.Nodes,
          edges: response.data.Edges,
        };

        logger("useGetOrgaGraph | getOrgaGraph ✅ |", response);
        return data;
      });

  return useQuery<Graph, Error>({
    queryKey: ["resources", "orga", "graph"],
    queryFn: getOrgaGraph,
  });
};

export default useGetOrgaGraph;
