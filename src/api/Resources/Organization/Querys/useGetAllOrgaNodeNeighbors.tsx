import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OntoNode, parseOntoNode } from "../../Ontology/Querys/useGetOntoNodes";

const useGetAllOrgaNodeNeighbors = (nodeID: string) => {
  const queryClient = useQueryClient();
  const getAllOrgaNodeNeighbors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/neighbors/all/get/${nodeID}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );

        logger(
          "useGetAllOrgaNodeNeighbors | getAllOrgaNodeNeighbors ✅ |",
          response
        );
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "orga", "nodes", nodeID, "all"],
    queryFn: getAllOrgaNodeNeighbors,
  });
};

export default useGetAllOrgaNodeNeighbors;
