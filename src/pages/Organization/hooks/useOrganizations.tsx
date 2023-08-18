import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { getCustomAxios } from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import { ListItem } from "@mui/material";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<Permission[], Error>;
  rolePermissionsQuery: UseQueryResult<RolePermission[], Error>;
  organizationInfoQuery: UseQueryResult<OrganizationInfoProps, Error>;
  inviteLinkMutation: UseMutationResult<string, Error, string, unknown>;
  inviteUserMutation: UseMutationResult<any, Error, string, unknown>;
  createRoleMutation: UseMutationResult<any, Error, CreateRoleProps, unknown>;
  deleteRoleMutation: UseMutationResult<any, Error, string, unknown>;
  setPermissionMutation: UseMutationResult<
    any,
    Error,
    SetPermissionProps,
    unknown
  >;
  assignRoleMutation: UseMutationResult<any, Error, AssignRoleProps, unknown>;
  removeRoleMutation: UseMutationResult<any, Error, AssignRoleProps, unknown>;
  deleteUserMutation: UseMutationResult<any, Error, string, unknown>;
  updateOrganizationInfo: UseMutationResult<
    string,
    Error,
    UpdateOrgaInfoProps,
    unknown
  >;
}

export type OrganizationsUser = {
  email: string;
  name: string;
  picture: string;
  roles: RoleProps[];
};

export type RoleProps = {
  id: string;
} & CreateRoleProps;

export type CreateRoleProps = {
  name: string;
  description: string;
};

export type RolePermission = {
  permission_name: string;
  description: string;
  resource_server_name: string;
  resource_server_identifier: string;
};
export type Permission = {
  permission_name: string;
  description: string;
};

export type SetPermissionProps = {
  roleID: string;
  permissionIDs: string[];
};

export type AssignRoleProps = {
  email: string;
  roleID: string;
};

export interface OrganizationInfoProps {
  accessed: Date;
  created: Date;
  updated: Date;
  details: { taxID: string; adress: string; email: string };
  canManufacture: boolean;
  hashedID: string;
  name: string;
}

export interface UpdateOrgaInfoProps {
  email: string;
  adress: string;
  taxID: string;
  name: string;
  canManufacture: boolean;
}

const useOrganizations = (roleID?: string): useOrganizationsReturnProps => {
  const queryClient = useQueryClient();
  const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/organizations/`;
  const staleTime: number = 300000;

  const organizationInfoQuery = useQuery<OrganizationInfoProps, Error>({
    queryKey: ["organizations", "info"],
    queryFn: async () => {
      return getCustomAxios()
        .get(`${process.env.VITE_HTTP_API_URL}/public/getOrganization/`)
        .then((res) => {
          logger("useOrganizations | organizationInfoQuery ✅ |", res.data);
          const orgaInfo: OrganizationInfoProps = {
            ...res.data,
            accessed: new Date(res.data.accessed),
            created: new Date(res.data.created),
            updated: new Date(res.data.updated),
            details: {
              ...JSON.parse(res.data.details),
            },
          };
          logger("useOrganizations | orgaInfo ✅ |", orgaInfo);
          return orgaInfo;
        });
    },
  });

  const userQuery = useQuery<OrganizationsUser[], Error>({
    queryKey: ["organizations", "users"],
    queryFn: async () => {
      return (
        getCustomAxios()
          // .post(apiUrl, { data: { intent: "fetchUsers" } })
          .get(apiUrl + "fetchUsers/")
          .then((res) => {
            logger("useOrganizations | fetchUsers ✅ |", res.data);
            return res.data;
          })
      );
    },
    staleTime: staleTime,
  });

  const permissionsQuery = useQuery<Permission[], Error>({
    queryKey: ["organizations", "permissions"],
    queryFn: async () =>
      getCustomAxios()
        // .post(apiUrl, { data: { intent: "getPermissions" } })
        .get(apiUrl + "getPermissions/")
        .then((res) => {
          logger("useOrganizations | getPermissions ✅ |", res.data);
          return res.data.map(
            (item: { value: string; descibtion: String }) => ({
              ...item,
              permission_name: item.value,
            })
          );
        }),
    staleTime: staleTime,
  });

  const rolesQuery = useQuery<RoleProps[], Error>({
    queryKey: ["organizations", "roles"],
    queryFn: async () => {
      return (
        getCustomAxios()
          // .post(apiUrl, { data: { intent: "getRoles" } })
          .get(apiUrl + "getRoles/")
          .then((res) => {
            logger("useOrganizations | getRoles ✅ |", res.data);
            return res.data;
          })
      );
    },
    staleTime: staleTime,
  });

  const rolePermissionsQuery = useQuery<RolePermission[], Error>({
    queryKey: ["organizations", "roles", roleID, "permissions"],
    queryFn: async () =>
      getCustomAxios()
        .post(apiUrl + "getPermissionsForRole/", {
          data: {
            content: { roleID: roleID },
          },
        })
        .then((res) => {
          logger("useOrganizations | getPermissionsForRole ✅ |", res.data);
          return res.data;
        }),
    enabled: roleID !== undefined && roleID !== "",
    staleTime: staleTime,
  });

  const updateOrganizationInfo = useMutation<
    string,
    Error,
    UpdateOrgaInfoProps
  >({
    mutationFn: async (props) => {
      const { name, email, adress, taxID, canManufacture } = props;
      return getCustomAxios()
        .patch(
          `${process.env.VITE_HTTP_API_URL}/public/updateOrganizationDetails/`,
          {
            data: {
              content: {
                canManufacture,
                details: { email, adress, taxID },
              },
            },
          }
        )
        .then((response) => {
          logger(
            "useOrganizations | updateOrganizationInfo ✅ |",
            response.data
          );
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "info"]);
    },
  });

  const inviteLinkMutation = useMutation<string, Error, string>({
    mutationFn: async (email: string) => {
      return getCustomAxios()
        .post(apiUrl + "getInviteLink/", {
          data: { content: { email: email } },
        })
        .then((response) => {
          logger("useOrganizations | getInviteLink ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const inviteUserMutation = useMutation<any, Error, string>({
    mutationFn: async (email: string) => {
      return getCustomAxios()
        .post(apiUrl + "addUser/", {
          data: { content: { email: email } },
        })
        .then((response) => {
          logger("useOrganizations | addUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const createRoleMutation = useMutation<any, Error, CreateRoleProps>({
    mutationFn: async (props) => {
      const { description, name } = props;
      return getCustomAxios()
        .post(apiUrl + "createRole/", {
          data: {
            content: { roleName: name, roleDescription: description },
          },
        })
        .then((response) => {
          logger("useOrganizations | createRole ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });

  const setPermissionMutation = useMutation<any, Error, SetPermissionProps>({
    mutationFn: async (props) => {
      const { permissionIDs, roleID } = props;
      return getCustomAxios()
        .post(apiUrl + "setPermissionsForRole/", {
          data: {
            content: { roleID, permissionIDs },
          },
        })
        .then((response) => {
          logger(
            "useOrganizations | setPermissionsForRole ✅ |",
            response.data
          );
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });

  const deleteRoleMutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      return getCustomAxios()
        .post(apiUrl + "deleteRole/", {
          data: {
            content: { roleID: id },
          },
        })
        .then((response) => {
          logger("useOrganizations | deleteRole ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });

  const assignRoleMutation = useMutation<any, Error, AssignRoleProps>({
    mutationFn: async (props) => {
      const { email, roleID } = props;
      return getCustomAxios()
        .post(apiUrl + "assignRole/", {
          data: {
            content: { email, roleID },
          },
        })
        .then((response) => {
          logger("useOrganizations | assignRole ✅ |", roleID);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const removeRoleMutation = useMutation<any, Error, AssignRoleProps>({
    mutationFn: async (props) => {
      const { email, roleID } = props;
      return getCustomAxios()
        .post(apiUrl + "removeRole/", {
          data: {
            content: { email, roleID },
          },
        })
        .then((response) => {
          logger("useOrganizations | removeRole ✅ |", roleID);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const deleteUserMutation = useMutation<any, Error, string>({
    mutationFn: async (email) => {
      return getCustomAxios()
        .post(apiUrl + "deleteUser/", {
          data: {
            content: { email },
          },
        })
        .then((response) => {
          logger("useOrganizations | deleteUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  return {
    organizationInfoQuery,
    permissionsQuery,
    rolesQuery,
    userQuery,
    rolePermissionsQuery,
    inviteLinkMutation,
    inviteUserMutation,
    createRoleMutation,
    deleteRoleMutation,
    setPermissionMutation,
    assignRoleMutation,
    removeRoleMutation,
    deleteUserMutation,
    updateOrganizationInfo,
  };
};

export default useOrganizations;
