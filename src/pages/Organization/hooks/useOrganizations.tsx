import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { ServiceType } from "@/pages/Service/hooks/useService";
import useOrganizationMutations, {
  InvitationProps,
} from "@/api/Organization/useOrganizationMutations";
import useOrganizationQuerys from "@/api/Organization/useOrganizationQuerys";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<PermissionProps[], Error>;
  rolePermissionsQuery: UseQueryResult<PermissionProps[], Error>;
  organizationInfoQuery: UseQueryResult<OrganizationInfoProps, Error>;
  inviteLinkMutation: UseMutationResult<string, Error, string, unknown>;
  inviteUserMutation: UseMutationResult<any, Error, InvitationProps, unknown>;
  createRoleMutation: UseMutationResult<any, Error, CreateRoleProps, unknown>;
  deleteRoleMutation: UseMutationResult<any, Error, string, unknown>;
  updatePermissionForRoleMutation: UseMutationResult<
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
  editRoleMutation: UseMutationResult<any, Error, EditRoleProps, unknown>;
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

export type PermissionProps = {
  permission_name: PermissionNameTranslationType;
  context: PermissionContextTranslationType;
  permissionType: PermissionTypeTranslationType;
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
  accessedWhen: Date;
  createdWhen: Date;
  updatedWhen: Date;
  details: { taxID: string; adress: string; email: string };
  supportedServices: ServiceType[];
  hashedID: string;
  name: string;
}

export interface UpdateOrgaInfoProps {
  email: string;
  adress: string;
  taxID: string;
  name: string;
  supportedServices: number[];
}

export interface EditRoleProps {
  roleID: string;
  name: string;
  description: string;
}

const useOrganizations = (roleID?: string): useOrganizationsReturnProps => {
  const {
    organizationInfoQuery,
    permissionsQuery,
    rolePermissionsQuery,
    rolesQuery,
    userQuery,
  } = useOrganizationQuerys(roleID);

  const {
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
  } = useOrganizationMutations();

  return {
    organizationInfoQuery,
    permissionsQuery,
    rolesQuery,
    userQuery,
    rolePermissionsQuery,
    editRoleMutation,
    inviteLinkMutation,
    inviteUserMutation,
    createRoleMutation,
    deleteRoleMutation,
    updatePermissionForRoleMutation,
    assignRoleMutation,
    removeRoleMutation,
    deleteUserMutation,
    updateOrganizationInfo,
  };
};

export default useOrganizations;
