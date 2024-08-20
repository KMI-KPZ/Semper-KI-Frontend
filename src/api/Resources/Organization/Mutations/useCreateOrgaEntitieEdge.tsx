import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useCreateOrgaEntitieEdgeProps {
  entity1ID: string;
  entity2ID: string;
}

const useCreateOrgaEntitieEdge = () => {
  const queryClient = useQueryClient();
  const createOrgaEntitieEdge = async (props: useCreateOrgaEntitieEdgeProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/between-entities/create/`,
        props
      )
      .then((response) => {
        logger(
          "useCreateOrgaEntitieEdge | createOrgaEntitieEdge ✅ |",
          response
        );
        return response.data;
      })
      .catch((error) => {
        logger("useCreateOrgaEntitieEdge | createOrgaEntitieEdge ❌ |", error);
      });

  return useMutation<string, Error, useCreateOrgaEntitieEdgeProps>({
    mutationFn: createOrgaEntitieEdge,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useCreateOrgaEntitieEdge;
