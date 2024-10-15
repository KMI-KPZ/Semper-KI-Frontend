import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useDeleteAdminEdgeProps {
  entity1ID: string;
  entity2ID: string;
}

const useAdminAdminEdge = () => {
  const queryClient = useQueryClient();
  const deleteAdminEdge = async ({
    entity1ID,
    entity2ID,
  }: useDeleteAdminEdgeProps) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/service/additive-manufacturing/resources/onto/admin/edge/delete/${entity1ID}/${entity2ID}/`
      )
      .then((response) => {
        logger("useDeleteAdminEdge | deleteAdminEdge ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteAdminEdge | deleteAdminEdge ❌ |", error);
      });

  return useMutation<string, Error, useDeleteAdminEdgeProps>({
    mutationFn: deleteAdminEdge,
    onSuccess: () => {
      queryClient.invalidateQueries(["resources"]);
    },
  });
};

export default useAdminAdminEdge;
