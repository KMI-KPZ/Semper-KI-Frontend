import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { ServiceType } from "@/pages/Service/hooks/useService";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useAssignRole from "@/api/Organization/Mutations/useAssignRole";
import useGetOrganizationUsers, {
  OrganizationsUser,
} from "@/api/Organization/Querys/useGetOrganizationUsers";
import useGetOrganizationPermissions, {
  PermissionProps,
} from "@/api/Organization/Querys/useGetOrganizationPermissions";
import useGetOrganization from "@/api/Organization/Querys/useGetOrganization";
import useGetOrganizationRolePermissions from "@/api/Organization/Querys/useGetOrganizationRolePermissions";
import useGetOrganizationRoles from "@/api/Organization/Querys/useGetOrganizationRoles";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<PermissionProps[], Error>;
  rolePermissionsQuery: UseQueryResult<PermissionProps[], Error>;
  organizationQuery: UseQueryResult<OrganizationInfoProps, Error>;
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
  const organizationQuery = useGetOrganization();
  const permissionsQuery = useGetOrganizationPermissions();
  const rolePermissionsQuery = useGetOrganizationRolePermissions(roleID);
  const rolesQuery = useGetOrganizationRoles();
  const userQuery = useGetOrganizationUsers();

  return {
    organizationQuery,
    permissionsQuery,
    rolesQuery,
    userQuery,
    rolePermissionsQuery,
  };
};

export default useOrganizations;
