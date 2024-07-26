import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface useCreateInviteLinkProps {
  email: string;
  roleID: string;
}

const useCreateInviteLink = () => {
  const queryClient = useQueryClient();
  const createInviteLink = async (props: useCreateInviteLinkProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/users/inviteLink/`,
        props
      )
      .then((response) => {
        logger("useCreateInviteLink | createInviteLink ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateInviteLink | createInviteLink ❌ |", error);
      });

  return useMutation<string, Error, useCreateInviteLinkProps>({
    mutationFn: createInviteLink,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "invites"]);
    },
  });
};

export default useCreateInviteLink;
