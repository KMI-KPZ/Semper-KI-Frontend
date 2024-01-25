import { authorizedCustomAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  OrganizationInfoProps,
  OrganizationsUser,
  PermissionContextTranslationType,
  PermissionNameTranslationType,
  PermissionProps,
  PermissionTypeTranslationType,
  RoleProps,
} from "@/pages/Organization/hooks/useOrganizations";
import { ServiceType } from "@/pages/Service/hooks/useService";
import {
  UseQueryResult,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

interface useOrganizationQuerysReturnProps {
  organizationInfoQuery: UseQueryResult<OrganizationInfoProps, Error>;
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  permissionsQuery: UseQueryResult<PermissionProps[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  rolePermissionsQuery: UseQueryResult<PermissionProps[], Error>;
}

const useOrganizationQuerys = (
  roleID?: string
): useOrganizationQuerysReturnProps => {
  const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/organizations/`;
  const staleTime: number = 300000; //
  const [showLogger, setShowLogger] = useState<boolean>(true);

  const organizationInfoQuery = useQuery<OrganizationInfoProps, Error>({
    queryKey: ["organizations", "info"],
    queryFn: async () => {
      return authorizedCustomAxios
        .get(`${process.env.VITE_HTTP_API_URL}/public/getOrganization/`)
        .then((res) => {
          if (showLogger)
            logger("useOrganizations | organizationInfoQuery ✅ |", res.data);
          const orgaInfo: OrganizationInfoProps = {
            ...res.data,
            accessedWhen: new Date(res.data.accessedWhen),
            createdWhen: new Date(res.data.createdWhen),
            updatedWhen: new Date(res.data.updatedWhen),
            details: res.data.details,
            supportedServices: res.data.supportedServices.filter(
              (serviceType: ServiceType) => serviceType !== 0
            ),
          };
          return orgaInfo;
        });
    },
    staleTime: staleTime,
  });

  const userQuery = useQuery<OrganizationsUser[], Error>({
    queryKey: ["organizations", "users"],
    queryFn: async () => {
      return (
        authorizedCustomAxios
          // .post(apiUrl, { data: { intent: "fetchUsers" } })
          .get(apiUrl + "fetchUsers/")
          .then((res) => {
            if (showLogger)
              logger("useOrganizations | fetchUsers ✅ |", res.data);
            return res.data;
          })
      );
    },
    staleTime: staleTime,
  });

  const permissionsQuery = useQuery<PermissionProps[], Error>({
    queryKey: ["organizations", "permissions"],
    queryFn: async () =>
      authorizedCustomAxios.get(apiUrl + "getPermissions/").then((res) => {
        if (showLogger)
          logger("useOrganizations | getPermissions ✅ |", res.data);
        return !Array.isArray(res.data)
          ? []
          : res.data.map(
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
      }),
    staleTime: staleTime,
  });

  const rolesQuery = useQuery<RoleProps[], Error>({
    queryKey: ["organizations", "roles"],
    queryFn: async () => {
      return (
        authorizedCustomAxios
          // .post(apiUrl, { data: { intent: "getRoles" } })
          .get(apiUrl + "getRoles/")
          .then((res) => {
            if (showLogger)
              logger("useOrganizations | getRoles ✅ |", res.data);
            return res.data;
          })
      );
    },
    staleTime: staleTime,
  });

  const rolePermissionsQuery = useQuery<PermissionProps[], Error>({
    queryKey: ["organizations", "roles", roleID, "permissions"],
    queryFn: async () =>
      authorizedCustomAxios
        .post(apiUrl + "getPermissionsForRole/", {
          data: {
            content: { roleID: roleID },
          },
        })
        .then((res) => {
          if (showLogger)
            logger("useOrganizations | getPermissionsForRole ✅ |", res.data);
          return res.data.map(
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
        }),
    enabled: roleID !== undefined && roleID !== "",
    staleTime: staleTime,
  });

  return {
    organizationInfoQuery,
    permissionsQuery,
    rolePermissionsQuery,
    rolesQuery,
    userQuery,
  };
};

export default useOrganizationQuerys;
