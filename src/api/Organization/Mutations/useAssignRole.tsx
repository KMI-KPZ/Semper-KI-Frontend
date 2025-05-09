import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type AssignRoleProps = {
  email: string;
  roleID: string;
};

const useAssignRole = () => {
  const queryClient = useQueryClient();
  const assignRole = async ({ email, roleID }: AssignRoleProps) =>
    authorizedCustomAxios
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/roles/assign/`,
        { email, roleID }
      )
      .then((response) => {
        logger("useAssignRole | assignRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useAssignRole | assignRole ❌ |", error);
      });

  return useMutation<void, Error, AssignRoleProps>({
    mutationFn: assignRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "users"]);
    },
  });
};

export default useAssignRole;
