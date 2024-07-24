import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface UpdateRoleProps {
  roleID: string;
  name: string;
  description: string;
}

const useUpdateRole = () => {
  const queryClient = useQueryClient();
  const updateRole = async ({ description, name, roleID }: UpdateRoleProps) =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/roles/edit/`,
        {
          data: {
            content: { roleID, roleName: name, roleDescription: description },
          },
        }
      )
      .then((response) => {
        logger("useUpdateRole | updateRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateRole | updateRole ❌ |", error);
      });

  return useMutation<void, Error, UpdateRoleProps>({
    mutationFn: updateRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["organization", "roles"]);
    },
  });
};

export default useUpdateRole;
