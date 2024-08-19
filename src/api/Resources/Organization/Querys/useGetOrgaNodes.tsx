import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeType,
  parseOntoNode,
} from "../../Ontology/Querys/useGetOntoNodes";

const useGetOrgaNodes = (nodeType: OntoNodeType) => {
  const queryClient = useQueryClient();
  const getOntoNodes = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/by-type/get/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger("useGetOntoNodes | getOntoNodes ✅ |", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "orga", "nodes", nodeType],
    queryFn: getOntoNodes,
  });
};

export default useGetOrgaNodes;
