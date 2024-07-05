import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useCreateInviteLink = () => {
  const queryClient = useQueryClient();
  const createInviteLink = async (email: string) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/users/inviteLink/`,
        {
          data: { content: { email: email } },
        }
      )
      .then((response) => {
        logger("useCreateInviteLink | createInviteLink ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useCreateInviteLink | createInviteLink ❌ |", error);
      });

  return useMutation<string, Error, string>({
    mutationFn: createInviteLink,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });
};

export default useCreateInviteLink;
