import logger from "@/hooks/useLogger";
import { authorizedCustomAxios } from "@/api/customAxios";
import { useQuery, useQueryClient } from "@tanstack/react-query";

export type PermissionProps = {
  permission_name: PermissionNameTranslationType;
  context: PermissionContextTranslationType;
  permissionType: PermissionTypeTranslationType;
  description: string;
};

export type PermissionNameTranslationType =
  | "orga:read"
  | "resources:edit"
  | "resources:read"
  | "orga:delete"
  | "processes:read"
  | "processes:messages"
  | "processes:edit"
  | "processes:delete"
  | "processes:files";
export type PermissionContextTranslationType =
  | "resources"
  | "orga"
  | "processes";
export type PermissionTypeTranslationType =
  | "read"
  | "edit"
  | "delete"
  | "messages"
  | "delete"
  | "files";

const useGetOrganizationPermissions = () => {
  const queryClient = useQueryClient();
  const getOrganizationPermissions = async () =>
    authorizedCustomAxios
      .get(
        `${process.env.VITE_HTTP_API_URL}/public/organizations/permissions/get/`
      )
      .then((response) => {
        const responseData = response.data;
        const data: PermissionProps[] = !Array.isArray(responseData)
          ? []
          : responseData.map(
              (item: {
                value: string;
                description: string;
              }): PermissionProps => ({
                permission_name: item.value as PermissionNameTranslationType,
                context: item.value.split(
                  ":"
                )[0] as PermissionContextTranslationType,
                permissionType: item.value.split(
                  ":"
                )[1] as PermissionTypeTranslationType,
                description: item.description,
              })
            );

        logger(
          "useGetOrganizationPermissions | getOrganizationPermissions ✅ |",
          response
        );
        return data;
      });

  return useQuery<PermissionProps[], Error>({
    queryKey: ["organization", "permissions"],
    queryFn: getOrganizationPermissions,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export default useGetOrganizationPermissions;
