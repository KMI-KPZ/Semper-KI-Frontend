import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Text } from "@component-library/index";
import { Button, Divider, LoadingSuspense } from "@component-library/index";
import { PermissionGroupProps, getGroupedPermissions } from "../Roles";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import useDeleteRole from "@/api/Organization/Mutations/useDeleteRole";
import useOrganization from "../../../../hooks/useOrganization";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useGetOrganizationRolePermissions from "@/api/Organization/Querys/useGetOrganizationRolePermissions";

interface OrganizationRolesItemProps {
  role: RoleProps;
  editRole: (role: RoleProps) => void;
}

const OrganizationRolesItem: React.FC<OrganizationRolesItemProps> = (props) => {
  const { role, editRole } = props;
  const { t } = useTranslation();
  const rolePermissionsQuery = useGetOrganizationRolePermissions(role.id);
  const deleteRole = useDeleteRole();
  const handleOnClickButtonEdit = () => {
    editRole(role);
  };
  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Organization.Roles.components.Item.alert")))
      deleteRole.mutate(role.id);
  };

  return (
    <div className="card flex w-full flex-col items-center justify-center gap-5 p-5 md:flex-row">
      <div className="flex w-full flex-row items-center justify-between gap-5 ">
        <Text variant="body">
          {t("Organization.Roles.components.Item.name")}
        </Text>
        <Text variant="body">{role.name}</Text>
      </div>
      <div className="flex w-full  flex-row items-center justify-between gap-5">
        <Text variant="body">
          {t("Organization.Roles.components.Item.description")}
        </Text>
        <Text variant="body">{role.description}</Text>
      </div>
      <Divider />
      <LoadingSuspense query={rolePermissionsQuery}>
        {rolePermissionsQuery.data !== undefined &&
        rolePermissionsQuery.data.length > 0 ? (
          <table className="w-full table-auto border-collapse">
            {getGroupedPermissions(rolePermissionsQuery.data).map(
              (permission: PermissionGroupProps, index) => (
                <tr key={index} className=" [&:not(:last-child)]:border-b-2 ">
                  <td className="p-2 align-text-top">
                    <Text variant="body">
                      {t(`types.permissionContext.${permission.context}`)}:
                    </Text>
                  </td>
                  <td>
                    <ul className="list-disc p-2">
                      {permission.permissionTypes.map(
                        (permissionType, _index, allPermissionTypes) => (
                          <li key={_index}>
                            {t(`types.permissionType.${permissionType}`)}
                          </li>
                        )
                      )}
                    </ul>
                  </td>
                </tr>
              )
            )}
          </table>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
      </LoadingSuspense>
      <Button
        size="sm"
        title={t(`Organization.components.table.button.edit`)}
        onClick={handleOnClickButtonEdit}
        startIcon={<EditIcon fontSize="small" />}
      />
      <Button
        size="sm"
        onClick={handleOnClickButtonDelete}
        startIcon={<DeleteForeverIcon fontSize="small" />}
        title={t("Organization.components.table.button.delete")}
      />
    </div>
  );
};

export default OrganizationRolesItem;
