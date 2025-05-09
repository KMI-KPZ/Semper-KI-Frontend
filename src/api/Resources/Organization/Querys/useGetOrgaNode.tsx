import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import {
  OntoNode,
  parseOntoNode,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodesByType";
import useUser, { UserType } from "@/hooks/useUser";

const useGetOrgaNode = (optionalNodeID?: string) => {
  const { nodeID: paramNodeID } = useParams();
  const { user } = useUser();
  const nodeID = optionalNodeID === undefined ? paramNodeID : optionalNodeID;
  const getOrgaNode = async () =>
    authorizedCustomAxios
      .get(
        user.usertype === UserType.ADMIN
          ? `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/nodes/by-id/get/${nodeID}/`
          : `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/nodes/by-id/get/${nodeID}/`
      )
      .then((response) => {
        const data: OntoNode = parseOntoNode(response.data);

        logger("useGetOrgaNode | getOrgaNode ✅ |", data);
        return data;
      });

  return useQuery<OntoNode, Error>({
    queryKey: ["resources", "orga", "node", nodeID],
    enabled: nodeID !== undefined && nodeID !== "",
    queryFn: getOrgaNode,
  });
};

export default useGetOrgaNode;
