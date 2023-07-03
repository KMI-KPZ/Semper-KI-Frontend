import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import customAxios from "@/hooks/useCustomAxios";
import logger from "@/hooks/useLogger";
import usePermissions from "@/hooks/usePermissions";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<Permission[], Error>;
  rolePermissionsQuery: UseQueryResult<RolePermission[], Error>;
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
  value: string;
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

const useOrganizations = (roleID?: string): useOrganizationsReturnProps => {
  const queryClient = useQueryClient();
  const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/organizations/`;
  const staleTime: number = 300000;

  const userQuery = useQuery<OrganizationsUser[], Error>({
    queryKey: ["organizations", "users"],
    queryFn: async () => {
      return customAxios
        .post(apiUrl, { data: { intent: "fetchUsers" } })
        .then((res) => {
          logger("useOrganizations | fetchUsers ✅ |", res.data);
          return res.data;
        });
    },
    staleTime: staleTime,
  });

  const permissionsQuery = useQuery<Permission[], Error>({
    queryKey: ["organizations", "permissions"],
    queryFn: async () =>
      customAxios
        .post(apiUrl, { data: { intent: "getPermissions" } })
        .then((res) => {
          logger("useOrganizations | getPermissions ✅ |", res.data);
          return res.data;
        }),
    staleTime: staleTime,
  });

  const rolesQuery = useQuery<RoleProps[], Error>({
    queryKey: ["organizations", "roles"],
    queryFn: async () => {
      return customAxios
        .post(apiUrl, { data: { intent: "getRoles" } })
        .then((res) => {
          logger("useOrganizations | getRoles ✅ |", res.data);
          return res.data;
        });
    },
    staleTime: staleTime,
  });

  const rolePermissionsQuery = useQuery<RolePermission[], Error>({
    queryKey: ["organizations", "roles", roleID, "permissions"],
    queryFn: async () =>
      customAxios
        .post(apiUrl, {
          data: {
            intent: "getPermissionsForRole",
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

  const inviteLinkMutation = useMutation<string, Error, string>({
    mutationFn: async (email: string) => {
      return customAxios
        .post(apiUrl, {
          data: { intent: "getInviteLink", content: { email: email } },
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
      return customAxios
        .post(apiUrl, {
          data: { intent: "addUser", content: { email: email } },
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
      return customAxios
        .post(apiUrl, {
          data: {
            intent: "createRole",
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
      return customAxios
        .post(apiUrl, {
          data: {
            intent: "setPermissionsForRole",
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
      return customAxios
        .post(apiUrl, {
          data: {
            intent: "deleteRole",
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
      return customAxios
        .post(apiUrl, {
          data: {
            intent: "assignRole",
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
      return customAxios
        .post(apiUrl, {
          data: {
            intent: "removeRole",
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
      return customAxios
        .post(apiUrl, {
          data: {
            intent: "deleteUser",
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
  };
};

export default useOrganizations;
