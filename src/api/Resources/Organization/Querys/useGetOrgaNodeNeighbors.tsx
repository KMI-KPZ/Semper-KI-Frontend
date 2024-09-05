import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeType,
  parseOntoNode,
} from "../../Ontology/Querys/useGetOntoNodes";

interface useGetOrgaNodeNeighborsProps {
  nodeID: string;
  nodeType: OntoNodeType;
}

const useGetOrgaNodeNeighbors = ({
  nodeID,
  nodeType,
}: useGetOrgaNodeNeighborsProps) => {
  const getOrgaNodeNeighbors = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/neighbors/by-type/get/${nodeID}/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger("useGetOrgaNodeNeighbors | getOrgaNodeNeighbors ✅ |", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "orga", "nodes", nodeID, nodeType],
    queryFn: getOrgaNodeNeighbors,
    enabled: nodeID !== "",
  });
};

export default useGetOrgaNodeNeighbors;
