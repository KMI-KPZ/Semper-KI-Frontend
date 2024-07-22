import { UseMutationResult, UseQueryResult } from "@tanstack/react-query";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useGetOrganizationUsers, {
  OrganizationsUser,
} from "@/api/Organization/Querys/useGetOrganizationUsers";
import useGetOrganizationPermissions, {
  PermissionProps,
} from "@/api/Organization/Querys/useGetOrganizationPermissions";
import useGetOrganization, {
  Organization,
} from "@/api/Organization/Querys/useGetOrganization";
import useGetOrganizationRolePermissions from "@/api/Organization/Querys/useGetOrganizationRolePermissions";
import useGetOrganizationRoles from "@/api/Organization/Querys/useGetOrganizationRoles";
import { ServiceType } from "@/api/Service/Querys/useGetServices";

interface useOrganizationsReturnProps {
  userQuery: UseQueryResult<OrganizationsUser[], Error>;
  rolesQuery: UseQueryResult<RoleProps[], Error>;
  permissionsQuery: UseQueryResult<PermissionProps[], Error>;
  rolePermissionsQuery: UseQueryResult<PermissionProps[], Error>;
  organizationQuery: UseQueryResult<Organization, Error>;
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
