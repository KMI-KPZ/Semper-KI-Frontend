import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNode,
  OntoNodeType,
  parseOntoNode,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";

const useGetAdminNodes = (nodeType: OntoNodeType) => {
  const getAdminNodes = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/by-type/get/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNode[] = response.data.map((node: any) =>
          parseOntoNode(node)
        );
        logger("useGetAdminNodes | getAdminNodes ✅|", response);
        return data;
      });

  return useQuery<OntoNode[], Error>({
    queryKey: ["resources", "admin", "nodes", nodeType],
    queryFn: getAdminNodes,
  });
};

export default useGetAdminNodes;
