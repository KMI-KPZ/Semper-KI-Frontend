import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNode,
  parseOntoNode,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";

const useGetAllOrgaNodeNeighbors = (nodeID?: string) => {
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
    enabled: nodeID !== undefined && nodeID !== "",
  });
};

export default useGetAllOrgaNodeNeighbors;
