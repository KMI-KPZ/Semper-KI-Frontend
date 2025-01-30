import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQueries } from "@tanstack/react-query";
import {
  OntoNode,
  parseOntoNode,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useUser, { UserType } from "@/hooks/useUser";

const useGetAllOrgaNodeNeighborsFromList = (nodes: OntoNode[]) => {
  const { user } = useUser();
  const getAllOrgaNodeNeighbors = async (nodeID: string) =>
    authorizedCustomAxios
      .get(
        user.usertype === UserType.ADMIN
          ? `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/neighbors/all/get/${nodeID}/`
          : `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/neighbors/all/get/${nodeID}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );

        logger(
          "useGetAllOrgaNodeNeighborsFromList | getAllOrgaNodeNeighbors ✅ |",
          response
        );
        return data;
      });

  return useQueries({
    queries: nodes.map((node) => ({
      queryKey: ["resources", "orga", "nodes", node.nodeID, "all"],
      queryFn: () => getAllOrgaNodeNeighbors(node.nodeID),
      enabled: !!node.nodeID, // Only run query if printer.nodeID exists
    })),
  });
};

export default useGetAllOrgaNodeNeighborsFromList;
