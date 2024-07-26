import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useDeleteInvite = () => {
  const queryClient = useQueryClient();
  const deleteInvite = async (invitationID: string) =>
    authorizedCustomAxios
      .delete(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/invites/delete/${invitationID}/`
      )
      .then((response) => {
        logger("useDeleteInvite | deleteInvite ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useDeleteInvite | deleteInvite ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: deleteInvite,
    onSuccess: (data, props, context) => {
      queryClient.invalidateQueries(["organization", "invites"]);
    },
  });
};

export default useDeleteInvite;
