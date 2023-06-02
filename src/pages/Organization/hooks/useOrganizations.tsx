import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import useCustomAxios from "@/hooks/useCustomAxios";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<Permission[], Error>;
  rolePermissionsQuery: UseQueryResult<Permission[], Error>;
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
}

export type OrganizationsUser = {
  email: string;
  name: string;
  picture: string;
};

export type RoleProps = {
  id: string;
} & CreateRoleProps;

export type CreateRoleProps = {
  name: string;
  description: string;
};

export type Permission = {
  value: string;
  description: string;
};

export type SetPermissionProps = {
  roleID: string;
  permissionIDs: string[];
};

const useOrganizations = (roleID?: string): useOrganizationsReturnProps => {
  const { axiosCustom } = useCustomAxios();
  const queryClient = useQueryClient();
  const apiUrl = `${import.meta.env.VITE_HTTP_API_URL}/public/organizations/`;

  const userQuery = useQuery<OrganizationsUser[], Error>({
    queryKey: ["organizations", "users"],
    queryFn: async () =>
      axiosCustom
        .post(apiUrl, { data: { intent: "fetchUsers" } })
        .then((res) => {
          console.log("useOrganizations | fetchUsers ✅ |", res.data);
          return res.data;
        }),
  });

  const rolesQuery = useQuery<RoleProps[], Error>({
    queryKey: ["organizations", "roles"],
    queryFn: async () =>
      axiosCustom.post(apiUrl, { data: { intent: "getRoles" } }).then((res) => {
        console.log("useOrganizations | getRoles ✅ |", res.data);
        return res.data;
      }),
  });

  const permissionsQuery = useQuery<Permission[], Error>({
    queryKey: ["organizations", "permissions"],
    queryFn: async () =>
      axiosCustom
        .post(apiUrl, { data: { intent: "getPermissions" } })
        .then((res) => {
          console.log("useOrganizations | getPermissions ✅ |", res.data);
          return res.data;
        }),
  });

  const rolePermissionsQuery = useQuery<Permission[], Error>({
    queryKey: ["organizations", "roles", roleID, "permissions"],
    queryFn: async () =>
      axiosCustom
        .post(apiUrl, {
          data: {
            intent: "getPermissionsForRole",
            content: { roleID: roleID },
          },
        })
        .then((res) => {
          console.log(
            "useOrganizations | getPermissionsForRole ✅ |",
            res.data
          );
          return res.data;
        }),
    enabled: roleID !== undefined && roleID !== "",
  });

  const inviteLinkMutation = useMutation<string, Error, string>({
    mutationFn: async (email: string) => {
      return axiosCustom
        .post(apiUrl, {
          data: { intent: "getInviteLink", content: { email: email } },
        })
        .then((response) => {
          console.log("useOrganizations | getInviteLink ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const inviteUserMutation = useMutation<any, Error, string>({
    mutationFn: async (email: string) => {
      return axiosCustom
        .post(apiUrl, {
          data: { intent: "addUser", content: { email: email } },
        })
        .then((response) => {
          console.log("useOrganizations | addUser ✅ |", response.data);
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
      return axiosCustom
        .post(apiUrl, {
          data: {
            intent: "createRole",
            content: { roleName: name, roleDescription: description },
          },
        })
        .then((response) => {
          console.log("useOrganizations | createRole ✅ |", response.data);
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
      return axiosCustom
        .post(apiUrl, {
          data: {
            intent: "setPermissionsForRole",
            content: { roleID, permissionIDs },
          },
        })
        .then((response) => {
          console.log(
            "useOrganizations | setPermissionsForRole ✅ |",
            response.data
          );
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles", "permissions"]);
    },
  });

  const deleteRoleMutation = useMutation<any, Error, string>({
    mutationFn: async (id: string) => {
      return axiosCustom
        .post(apiUrl, {
          data: {
            intent: "deleteRole",
            content: { roleID: id },
          },
        })
        .then((response) => {
          console.log("useOrganizations | deleteRole ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
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
  };
};

export default useOrganizations;
