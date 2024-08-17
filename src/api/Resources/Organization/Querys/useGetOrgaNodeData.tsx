import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type OrgaNode = {
  resources: string[];
};

const useGetOrgaNodeData = () => {
  const queryClient = useQueryClient();
  const getOrgaNode = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/get/`
      )
      .then((response) => {
        const data: OrgaNode = {
          ...response.data,
        };

        logger("useGetOrgaNode | getOrgaNode ✅ |", response);
        return data;
      });

  return useQuery<OrgaNode, Error>({
    queryKey: ["resources", "orga"],
    queryFn: getOrgaNode,
  });
};

export default useGetOrgaNodeData;
