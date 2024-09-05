import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteOrgaEntitieEdgeProps {
  entity1ID: string;
  entity2ID: string;
  invalidate?: boolean;
}

const useDeleteOrgaEntitieEdge = () => {
  const queryClient = useQueryClient();
  const deleteOrgaEntitieEdge = async ({
    entity1ID,
    entity2ID,
  }: useDeleteOrgaEntitieEdgeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/orga/edge/between-entities/delete/${entity1ID}/${entity2ID}/`
      )
      .then((response) => {
        logger(
          "useDeleteOrgaEntitieEdge | deleteOrgaEntitieEdge ✅ |",
          response
        );
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteOrgaEntitieEdge | deleteOrgaEntitieEdge ❌ |", error);
      });

  return useMutation<string, Error, useDeleteOrgaEntitieEdgeProps>({
    mutationFn: deleteOrgaEntitieEdge,
    onSuccess: (_, props) => {
      if (
        props.invalidate === undefined ||
        (props.invalidate !== undefined && props.invalidate === false)
      )
        queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useDeleteOrgaEntitieEdge;
