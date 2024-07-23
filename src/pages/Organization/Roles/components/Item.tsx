import React from "react";
import { useTranslation } from "react-i18next";
import { Text } from "@component-library/index";
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
  const rolePermissionsQuery = useGetOrganizationRolePermissions();
  const deleteRole = useDeleteRole();
  const handleOnClickButtonEdit = () => {
    editRole(role);
  };
  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Organization.Roles.components.Item.alert")))
      deleteRole.mutate(role.id);
  };

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 p-5 shadow-card md:flex-row">
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
          <div className="flex w-full flex-col items-center justify-center gap-5 md:flex-row ">
            {getGroupedPermissions(rolePermissionsQuery.data).map(
              (permission: PermissionGroupProps, index) => (
                <div
                  className="flex w-full flex-row justify-between gap-5 "
                  key={index}
                >
                  <Text variant="body">{permission.context}:</Text>
                  <Text variant="body" className="whitespace-nowrap">
                    {permission.permissionTypes.join(", ")}
                  </Text>
                </div>
              )
            )}
          </div>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
      </LoadingSuspense>
      <Button
        title={t(`Organization.components.table.button.edit`)}
        onClick={handleOnClickButtonEdit}
        startIcon={<EditIcon fontSize="small" />}
      />
      <Button
        onClick={handleOnClickButtonDelete}
        startIcon={<DeleteForeverIcon fontSize="small" />}
        title={t("Organization.components.table.button.delete")}
      />
    </div>
  );
};

export default OrganizationRolesItem;
