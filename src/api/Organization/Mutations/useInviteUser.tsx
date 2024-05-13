import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type InvitationProps = {
  email: string;
  roleID: string;
};

const useInviteUser = () => {
  const queryClient = useQueryClient();
  const inviteUser = async (props: InvitationProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/addUser/`, {
        data: { content: props },
      })
      .then((response) => {
        logger("useInviteUser | inviteUser ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useInviteUser | inviteUser ❌ |", error);
      });

  return useMutation<void, Error, InvitationProps>({
    mutationFn: inviteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });
};

export default useInviteUser;
