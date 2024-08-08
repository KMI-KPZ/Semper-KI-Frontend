import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useCreateOrgaEdgeProps {
  entityIDs: string[];
}

const useCreateOrgaEdge = () => {
  const queryClient = useQueryClient();
  const createOrgaEdge = async (props: useCreateOrgaEdgeProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/create/`,
        props
      )
      .then((response) => {
        logger("useCreateOrgaEdge | createOrgaEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateOrgaEdge | createOrgaEdge ❌ |", error);
      });

  return useMutation<string, Error, useCreateOrgaEdgeProps>({
    mutationFn: createOrgaEdge,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useCreateOrgaEdge;
