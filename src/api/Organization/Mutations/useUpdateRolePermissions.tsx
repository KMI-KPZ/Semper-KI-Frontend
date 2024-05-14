import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export type SetPermissionProps = {
  roleID: string;
  permissionIDs: string[];
};

const useUpdateRolePermissions = () => {
  const queryClient = useQueryClient();
  const updateRolePermissions = async ({
    permissionIDs,
    roleID,
  }: SetPermissionProps) =>
    authorizedCustomAxios
      .post(`${process.env.VITE_HTTP_API_URL}/public/setPermissionsForRole/`, {
        data: {
          content: { roleID, permissionIDs },
        },
      })
      .then((response) => {
        logger(
          "useUpdateRolePermissions | updateRolePermissions ✅ |",
          response
        );
        return response.data;
      })
      .catch((error) => {
        logger("useUpdateRolePermissions | updateRolePermissions ❌ |", error);
      });

  return useMutation<void, Error, SetPermissionProps>({
    mutationFn: updateRolePermissions,
    onSuccess: () => {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });
};

export default useUpdateRolePermissions;
