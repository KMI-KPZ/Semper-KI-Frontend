import { customAxios } from "@/api/customAxios";
import logger from "@/hooks/useLogger";
import {
  AssignRoleProps,
  CreateRoleProps,
  EditRoleProps,
  SetPermissionProps,
  UpdateOrgaInfoProps,
} from "@/pages/Organization/hooks/useOrganizations";
import { RegisterOrganizationFormData } from "@/pages/RegisterOrganization/RegisterOrganization";
import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { useState } from "react";

interface useOrganizationMutationsReturnProps {
  updateOrganizationInfo: UseMutationResult<
    string,
    Error,
    UpdateOrgaInfoProps,
    unknown
  >;
  inviteLinkMutation: UseMutationResult<string, Error, string, unknown>;
  inviteUserMutation: UseMutationResult<any, Error, InvitationProps, unknown>;
  createRoleMutation: UseMutationResult<any, Error, CreateRoleProps, unknown>;
  editRoleMutation: UseMutationResult<any, Error, EditRoleProps, unknown>;
  updatePermissionForRoleMutation: UseMutationResult<
    any,
    Error,
    SetPermissionProps,
    unknown
  >;
  deleteRoleMutation: UseMutationResult<any, Error, string, unknown>;
  assignRoleMutation: UseMutationResult<any, Error, AssignRoleProps, unknown>;
  removeRoleMutation: UseMutationResult<any, Error, AssignRoleProps, unknown>;
  deleteUserMutation: UseMutationResult<any, Error, string, unknown>;
  registerOrganizationMutation: UseMutationResult<
    string,
    Error,
    RegisterOrganizationFormData,
    unknown
  >;
}

export type InvitationProps = {
  email: string;
  roleID: string;
};

const useOrganizationMutations = (): useOrganizationMutationsReturnProps => {
  const queryClient = useQueryClient();
  const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/organizations/`;
  const [showLogger, setShowLogger] = useState<boolean>(true);

  const updateOrganizationInfo = useMutation<
    string,
    Error,
    UpdateOrgaInfoProps
  >({
    mutationFn: async (props) => {
      const { name, email, adress, taxID, supportedServices } = props;
      return customAxios
        .patch(
          `${process.env.VITE_HTTP_API_URL}/public/updateOrganizationDetails/`,
          {
            data: {
              content: {
                supportedServices,
                details: { email, adress, taxID },
              },
            },
          }
        )
        .then((response) => {
          if (showLogger)
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
      return customAxios
        .post(apiUrl + "getInviteLink/", {
          data: { content: { email: email } },
        })
        .then((response) => {
          if (showLogger)
            logger("useOrganizations | getInviteLink ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const inviteUserMutation = useMutation<any, Error, InvitationProps>({
    mutationFn: async (props) => {
      return customAxios
        .post(apiUrl + "addUser/", {
          data: { content: props },
        })
        .then((response) => {
          if (showLogger)
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
        .post(apiUrl + "createRole/", {
          data: {
            content: { roleName: name, roleDescription: description },
          },
        })
        .then((response) => {
          if (showLogger)
            logger("useOrganizations | createRole ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });

  const editRoleMutation = useMutation<any, Error, EditRoleProps>({
    mutationFn: async (props) => {
      const { description, name, roleID } = props;
      return customAxios
        .post(apiUrl + "editRole/", {
          data: {
            content: { roleID, roleName: name, roleDescription: description },
          },
        })
        .then((response) => {
          if (showLogger)
            logger("useOrganizations | editRole ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "roles"]);
    },
  });

  const updatePermissionForRoleMutation = useMutation<
    any,
    Error,
    SetPermissionProps
  >({
    mutationFn: async (props) => {
      const { permissionIDs, roleID } = props;
      return customAxios
        .post(apiUrl + "setPermissionsForRole/", {
          data: {
            content: { roleID, permissionIDs },
          },
        })
        .then((response) => {
          if (showLogger)
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
        .post(apiUrl + "deleteRole/", {
          data: {
            content: { roleID: id },
          },
        })
        .then((response) => {
          if (showLogger)
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
        .post(apiUrl + "assignRole/", {
          data: {
            content: { email, roleID },
          },
        })
        .then((response) => {
          if (showLogger) logger("useOrganizations | assignRole ✅ |", roleID);
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
        .post(apiUrl + "removeRole/", {
          data: {
            content: { email, roleID },
          },
        })
        .then((response) => {
          if (showLogger) logger("useOrganizations | removeRole ✅ |", roleID);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const deleteUserMutation = useMutation<any, Error, string>({
    mutationFn: async (email) => {
      return customAxios
        .post(apiUrl + "deleteUser/", {
          data: {
            content: { email },
          },
        })
        .then((response) => {
          if (showLogger)
            logger("useOrganizations | deleteUser ✅ |", response.data);
          return response.data;
        });
    },
    onSuccess() {
      queryClient.invalidateQueries(["organizations", "users"]);
    },
  });

  const registerOrganizationMutation = useMutation<
    string,
    Error,
    RegisterOrganizationFormData
  >({
    mutationFn: async (props) => {
      const {} = props;
      const apiUrl = `${process.env.VITE_HTTP_API_URL}/public/organizations/createNew/`;
      return customAxios
        .post(apiUrl, { data: { content: props } })
        .then((response) => {
          logger(
            "useRegisterOrganisation | registerOrganizationMutation ✅ |",
            response.data
          );
          return response.data.processID;
        });
    },
  });

  return {
    registerOrganizationMutation,
    assignRoleMutation,
    createRoleMutation,
    deleteRoleMutation,
    deleteUserMutation,
    editRoleMutation,
    inviteLinkMutation,
    inviteUserMutation,
    removeRoleMutation,
    updateOrganizationInfo,
    updatePermissionForRoleMutation,
  };
};

export default useOrganizationMutations;
