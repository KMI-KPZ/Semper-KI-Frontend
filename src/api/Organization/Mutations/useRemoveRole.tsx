import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type RemoveRoleProps = {
  email: string;
  roleID: string;
};

const useRemoveRole = () => {
  const queryClient = useQueryClient();
  const removeRole = async ({ email, roleID }: RemoveRoleProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/roles/remove/`,
        { email, roleID }
      )
      .then((response) => {
        logger("useRemoveRole | removeRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useRemoveRole | removeRole ❌ |", error);
      });

  return useMutation<void, Error, RemoveRoleProps>({
    mutationFn: removeRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "users"]);
    },
  });
};

export default useRemoveRole;
