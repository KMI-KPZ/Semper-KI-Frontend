import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { ServiceType } from "@/pages/Service/hooks/useService";
import useOrganizationQuerys from "@/api/Organization/useOrganizationQuerys";
import { UpdateOrgaInfoProps } from "@/api/Organization/Mutations/useUpdateOrganizationInfos";
import { EditRoleProps } from "@/api/Organization/Mutations/useEditRole";
import {
  CreateRoleProps,
  RoleProps,
} from "@/api/Organization/Mutations/useCreateRole";
import { InvitationProps } from "@/api/Organization/Mutations/useInviteUser";
import useAssignRole from "@/api/Organization/Mutations/useAssignRole";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<PermissionProps[], Error>;
  rolePermissionsQuery: UseQueryResult<PermissionProps[], Error>;
  organizationInfoQuery: UseQueryResult<OrganizationInfoProps, Error>;
}

export interface OrganizationInfoProps {
  accessedWhen: Date;
  createdWhen: Date;
  updatedWhen: Date;
  details: { taxID: string; adress: string; email: string };
  supportedServices: ServiceType[];
  hashedID: string;
  name: string;
}

const useOrganizations = (roleID?: string): useOrganizationsReturnProps => {
  const {
    organizationInfoQuery,
    permissionsQuery,
    rolePermissionsQuery,
    rolesQuery,
    userQuery,
  } = useOrganizationQuerys(roleID);
  const assignRole = useAssignRole();

  return {
    organizationInfoQuery,
    permissionsQuery,
    rolesQuery,
    userQuery,
    rolePermissionsQuery,
  };
};

export default useOrganizations;
