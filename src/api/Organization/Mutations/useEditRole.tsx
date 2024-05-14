import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface EditRoleProps {
  roleID: string;
  name: string;
  description: string;
}

const useEditRole = () => {
  const queryClient = useQueryClient();
  const editRole = async ({ description, name, roleID }: EditRoleProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/editRole/`, {
        data: {
          content: { roleID, roleName: name, roleDescription: description },
        },
      })
      .then((response) => {
        logger("useEditRole | editRole ✅ |", response);
        return response.data;
      })
      .catch((error) => {
        logger("useEditRole | editRole ❌ |", error);
      });

  return useMutation<void, Error, EditRoleProps>({
    mutationFn: editRole,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });
};

export default useEditRole;
