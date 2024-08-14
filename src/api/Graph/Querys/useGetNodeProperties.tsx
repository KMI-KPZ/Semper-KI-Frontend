import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  OntoNodeProperty,
  OntoNodeType,
} from "@/api/Resources/Ontology/Querys/useGetOntoNodes";

const useGetNodeProperties = (nodeType: OntoNodeType) => {
  const queryClient = useQueryClient();
  const getNodeProperties = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/nodes/properties/get/by-type/${nodeType}/`
      )
      .then((response) => {
        const data: OntoNodeProperty[] = response.data;

        logger("useGetNodeProperties | getNodeProperties ✅ |", response);
        return data;
      });

  return useQuery<OntoNodeProperty[], Error>({
    queryKey: ["node", "properties", nodeType],
    queryFn: getNodeProperties,
  });
};

export default useGetNodeProperties;
