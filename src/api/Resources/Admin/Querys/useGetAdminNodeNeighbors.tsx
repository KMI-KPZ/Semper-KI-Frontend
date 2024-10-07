import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeType,
  parseOntoNode,
} from "../../Ontology/Querys/useGetOntoNodes";

interface useGetAdminNodeNeighborsProps {
  nodeID: string;
  nodeType: OntoNodeType;
}

const useGetAdminNodeNeighbors = ({
  nodeID,
  nodeType,
}: useGetAdminNodeNeighborsProps) => {
  const getAdminNodeNeighbors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/neighbors/get/${nodeID}/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger(
          "useGetAdminNodeNeighbors | getAdminNodeNeighbors ✅ |",
          response
        );
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "admin", "nodes", nodeID, nodeType],
    queryFn: getAdminNodeNeighbors,
    enabled: nodeID !== "",
  });
};

export default useGetAdminNodeNeighbors;
