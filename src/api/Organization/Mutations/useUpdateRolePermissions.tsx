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
      .patch(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/permissions/role/set/`,
        { roleID, permissionIDs }
      )
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
    onSuccess(_, variables) {
      queryClient.invalidateQueries([
        "organization",
        "roles",
        variables.roleID,
        "permissions",
      ]);
    },
  });
};

export default useUpdateRolePermissions;
