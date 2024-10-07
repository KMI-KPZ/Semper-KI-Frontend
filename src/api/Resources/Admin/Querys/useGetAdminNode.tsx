import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { OntoNode, parseOntoNode } from "../../Ontology/Querys/useGetOntoNodes";

const useGetAdminNode = (optionalNodeID?: string) => {
  const { nodeID: paramNodeID } = useParams();
  const nodeID = optionalNodeID === undefined ? paramNodeID : optionalNodeID;
  const getAdminNode = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/by-id/get/${nodeID}/`
      )
      .then((response) => {
        const data: OntoNode = parseOntoNode(response.data);

        logger("useGetAdminNode | getAdminNode ✅ |", data);
        return data;
      });

  return useQuery<OntoNode, Error>({
    queryKey: ["resources", "admin", "node", nodeID],
    enabled: nodeID !== undefined && nodeID !== "",
    queryFn: getAdminNode,
  });
};

export default useGetAdminNode;
