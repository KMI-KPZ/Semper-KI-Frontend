import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { OntoNode, parseOntoNode } from "../../Ontology/Querys/useGetOntoNodes";

const useGetOrgaNode = () => {
  const queryClient = useQueryClient();
  const { nodeID } = useParams();
  const getOntoNode = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/by-id/get/${nodeID}/`
      )
      .then((response) => {
        const data: OntoNode = parseOntoNode(response.data);

        logger("useGetOntoNode | getOntoNode ✅ |", response);
        return data;
      });

  return useQuery<OntoNode, Error>({
    queryKey: ["resources", "orga", "node", nodeID],
    enabled: nodeID !== undefined && nodeID !== "",
    queryFn: getOntoNode,
  });
};

export default useGetOrgaNode;
