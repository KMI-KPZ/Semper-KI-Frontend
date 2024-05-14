import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  PermissionContextTranslationType,
  PermissionNameTranslationType,
  PermissionProps,
  PermissionTypeTranslationType,
} from "./useGetOrganizationPermissions";

const useGetOrganizationRolePermissions = (roleID?: string) => {
  const queryClient = useQueryClient();
  const getOrganizationRolePermissions = async () =>
    authorizedCustomAxios
      .post(
        `${process.env.VITE_HTTP_API_URL}/public/organization/getPermissionsForRole/`,
        {
          data: {
            content: { roleID: roleID },
          },
        }
      )
      .then((response) => {
        const responseData = response.data;
        const data: PermissionProps[] = responseData.map(
          (permission: {
            description: string;
            permission_name: string;
            resource_server_identifier: string;
            resource_server_name: string;
          }): PermissionProps => ({
            permission_name:
              permission.permission_name as PermissionNameTranslationType,
            context: permission.permission_name.split(
              ":"
            )[0] as PermissionContextTranslationType,
            permissionType: permission.permission_name.split(
              ":"
            )[1] as PermissionTypeTranslationType,
            description: permission.description,
          })
        );
        logger(
          "useGetOrganizationRolePermissions | getOrganizationRolePermissions ✅ |",
          response
        );
        return data;
      });

  return useQuery<PermissionProps[], Error>({
    queryKey: ["organizations", "roles", roleID, "permissions"],
    queryFn: getOrganizationRolePermissions,
    staleTime: 300000, // 5 minutes
    enabled: roleID !== undefined && roleID !== "",
  });
};

export default useGetOrganizationRolePermissions;
