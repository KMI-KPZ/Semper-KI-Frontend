import { Heading, Text } from "@component-library/Typography";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  Permission,
  RolePermission,
  RoleProps,
} from "../hooks/useOrganizations";
import OrganizationRolesForm from "./components/Form";
import { Button, Divider, LoadingSuspense } from "@component-library/index";
import OrganizationRolesItem from "./components/Item";
import { Fragment, useState } from "react";
import OrganizationRolesTable from "./components/Table";
import Modal from "@component-library/Modal";

interface OrganizationRolesProps {}

export interface SimplifiedPermissionProps {
  name: string;
  permissions: string[];
}
export const sortPermissions = (
  permission1: RolePermission | Permission,
  permission2: RolePermission | Permission
): number => {
  if (permission1.permission_name < permission2.permission_name) {
    return -1;
  }
  if (permission1.permission_name > permission2.permission_name) {
    return 1;
  }
  return 0;
};
export const getSimplifiedPermissions = (
  permissions: RolePermission[] | Permission[]
): SimplifiedPermissionProps[] => {
  const simplifiedPermissions: SimplifiedPermissionProps[] = [];
  permissions
    .sort((perm1, perm2) => sortPermissions(perm1, perm2))
    .forEach((permission) => {
      const [name, permissionName] = permission.permission_name.split(":");
      const index = simplifiedPermissions.findIndex(
        (item) => item.name === name
      );
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
  const { rolesQuery, permissionsQuery } = useOrganizations();
  const [edit, setEdit] = useState<boolean>(false);
  const [role, setRole] = useState<RoleProps | undefined>();

  const resetForm = () => {
    setRole(undefined);
    setEdit(false);
  };
  const editRole = (role: RoleProps) => {
    setRole(role);
    setEdit(true);
  };
  const createNewRole = () => {
    setRole(undefined);
    setEdit(true);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-5 shadow-card">
      <Heading variant="h2">{t("Organization.Roles.Roles.header")}</Heading>
      <LoadingSuspense query={rolesQuery}>
        {rolesQuery.data !== undefined && rolesQuery.data.length > 0 ? (
          <>
            <div className="flex w-full flex-col items-center justify-center gap-5 md:hidden">
              {rolesQuery.data.map((role, index, roles) => (
                <Fragment key={index}>
                  <OrganizationRolesItem role={role} />
                </Fragment>
              ))}
            </div>
            <OrganizationRolesTable
              roles={rolesQuery.data}
              editRole={editRole}
            />
            <Button
              title={t("Organization.Roles.Roles.button.create")}
              onClick={createNewRole}
            />
          </>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
      </LoadingSuspense>
      <Modal
        open={edit}
        closeModal={() => {
          setEdit(false), setRole(undefined);
        }}
      >
        <LoadingSuspense query={permissionsQuery}>
          {permissionsQuery.data !== undefined ? (
            <OrganizationRolesForm
              resetForm={resetForm}
              role={role}
              allPermissions={permissionsQuery.data}
            />
          ) : null}
        </LoadingSuspense>
      </Modal>
    </div>
  );
};

export default OrganizationRoles;
