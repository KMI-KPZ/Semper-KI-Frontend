import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useUpdateOrgaEdgeProps {
  entity1ID: string;
  entity2ID: string;
}

const useUpdateOrgaEdge = () => {
  const queryClient = useQueryClient();
  const updateOrgaEdge = async (props: useUpdateOrgaEdgeProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/update/`,
        props
      )
      .then((response) => {
        logger("useUpdateOrgaEdge | updateOrgaEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateOrgaEdge | updateOrgaEdge ❌ |", error);
      });

  return useMutation<string, Error, useUpdateOrgaEdgeProps>({
    mutationFn: updateOrgaEdge,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useUpdateOrgaEdge;
