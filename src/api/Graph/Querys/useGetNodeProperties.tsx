import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery } from "@tanstack/react-query";
import {
  OntoNodeProperty,
  OntoNodeType,
} from "@/api/Resources/Organization/Querys/useGetOrgaNodes";

const useGetNodeProperties = (nodeType?: OntoNodeType) => {
  const getNodeProperties = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/nodes/properties/get/by-type/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNodeProperty[] = response.data;

        logger("useGetNodeProperties | getNodeProperties ✅ |", response);
        return data;
      });

  return useQuery<OntoNodeProperty[], Error>({
    queryKey: ["node", "properties", nodeType],
    queryFn: getNodeProperties,
    enabled: nodeType !== undefined,
  });
};

export default useGetNodeProperties;
