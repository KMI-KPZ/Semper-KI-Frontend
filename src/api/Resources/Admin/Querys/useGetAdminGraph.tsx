import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { Graph } from "@/api/Graph/Querys/useGetPrivateGraph";

const useGetAdminGraph = () => {
  const getAdminGraph = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/graph/get/`
      )
      .then((response) => {
        const data: Graph = {
          nodes: response.data.Nodes,
          edges: response.data.Edges,
        };

        logger("useGetAdminGraph | getAdminGraph ✅ |", response);
        return data;
      });

  return useQuery<Graph, Error>({
    queryKey: ["resources", "admin", "graph"],
    queryFn: getAdminGraph,
  });
};

export default useGetAdminGraph;
