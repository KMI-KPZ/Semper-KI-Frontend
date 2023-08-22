import { Heading, Text } from "@component-library/Typography";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  Permission,
  RolePermission,
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
export const getSortetPermissions = (
  permissions: RolePermission[] | Permission[]
): Permission[] => {
  return permissions.sort((a, b) => {
    if (a.permission_name < b.permission_name) {
      return -1;
    }
    if (a.permission_name > b.permission_name) {
      return 1;
    }
    return 0;
  });
};
export const getSimplifiedPermissions = (
  permissions: RolePermission[] | Permission[]
): SimplifiedPermissionProps[] => {
  const simplifiedPermissions: SimplifiedPermissionProps[] = [];
  getSortetPermissions(permissions).forEach((permission) => {
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
  const { rolesQuery, permissionsQuery } = useOrganizations();
  const [edit, setEdit] = useState<boolean>(false);
  const [editRoleID, setEditRoleID] = useState<string>("");

  const openForm = (roleID: string) => {
    setEdit(true);
  };
  const closeForm = (roleID: string) => {
    setEdit(false);
  };

  return (
    <LoadingSuspense query={rolesQuery}>
      <div className="flex w-full flex-col items-center justify-center gap-5 p-5 shadow-card">
        <Heading variant="h2">{t("Organization.Roles.Roles.header")}</Heading>
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
              openForm={openForm}
            />
            <Button title={t("Organization.Roles.Roles.button.create")} />
          </>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
        <Modal
          open={edit}
          closeModal={() => {
            setEdit(false), setEditRoleID("");
          }}
        >
          <LoadingSuspense query={permissionsQuery}>
            {permissionsQuery.data !== undefined ? (
              <OrganizationRolesForm
                roleID={editRoleID}
                allPermissions={permissionsQuery.data}
              />
            ) : null}
          </LoadingSuspense>
        </Modal>
      </div>
    </LoadingSuspense>
  );
};

export default OrganizationRoles;
