import { Heading, Text } from "@component-library/Typography";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  Permission,
  RolePermission,
} from "../hooks/useOrganizations";
import OrganizationRolesForm from "./components/Form";
import { Button, Divider, LoadingSuspense } from "@component-library/index";
import OrganizationRolesItem from "./components/Item";
import { Fragment } from "react";
import { index } from "d3";
import OrganizationRolesTable from "./components/Table";

interface OrganizationRolesProps {}

export interface SimplifiedPermissionProps {
  name: string;
  permissions: string[];
}
export const getSimplifiedPermissions = (
  permissions: RolePermission[] | Permission[]
): SimplifiedPermissionProps[] => {
  const simplifiedPermissions: SimplifiedPermissionProps[] = [];
  permissions.forEach((permission) => {
    const [name, permissionName] = permission.permission_name.split(":");
    const index = simplifiedPermissions.findIndex((item) => item.name === name);
    if (index === -1) {
      simplifiedPermissions.push({
        name: name,
        permissions: [permissionName],
      });
    } else {
      simplifiedPermissions[index].permissions.push(permissionName);
    }
  });
  return simplifiedPermissions;
};

const OrganizationRoles: React.FC<OrganizationRolesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { rolesQuery } = useOrganizations();

  return (
    <LoadingSuspense query={rolesQuery}>
      <div className="flex w-full flex-col items-center justify-center gap-5 p-5 shadow-card">
        <Heading variant="h2">{t("Organization.Roles.Roles.header")}</Heading>
        {rolesQuery.data !== undefined && rolesQuery.data.length > 0 ? (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-5  md:hidden">
              {rolesQuery.data.map((role, index, roles) => (
                <Fragment key={index}>
                  <OrganizationRolesItem role={role} />
                </Fragment>
              ))}
            </div>
            <OrganizationRolesTable roles={rolesQuery.data} />
            <Button title={t("Organization.Roles.Roles.button.create")} />
          </>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
      </div>
    </LoadingSuspense>
  );
};

export default OrganizationRoles;
