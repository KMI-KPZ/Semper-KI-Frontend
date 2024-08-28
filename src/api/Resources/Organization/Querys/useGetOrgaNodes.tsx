import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeType,
  parseOntoNode,
} from "../../Ontology/Querys/useGetOntoNodes";

const useGetOrgaNodes = (nodeType: OntoNodeType) => {
  const getOrgaNodes = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/by-type/get/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger("useGetOrgaNodes | getOrgaNodes ✅|", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "orga", "nodes", nodeType],
    queryFn: getOrgaNodes,
  });
};

export default useGetOrgaNodes;
