import React from "react";
import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button, LoadingAnimation } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import useDeleteRole from "@/api/Organization/Mutations/useDeleteRole";
import { PermissionProps } from "@/api/Organization/Querys/useGetOrganizationPermissions";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useGetOrganizationRolePermissions from "@/api/Organization/Querys/useGetOrganizationRolePermissions";

interface OrganizationRolesTableRowProps {
  role: RoleProps;
  allPermissions: PermissionProps[];
  editRole: (role: RoleProps) => void;
}

const OrganizationRolesTableRow: React.FC<OrganizationRolesTableRowProps> = (
  props
) => {
  const { role, allPermissions, editRole } = props;
  const { t } = useTranslation();
  const deleteRole = useDeleteRole();
  const rolePermissionsQuery = useGetOrganizationRolePermissions(role.id);

  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Organization.Roles.components.Item.alert")))
      deleteRole.mutate(role.id);
  };
  const handleOnClickButtonEdit = () => {
    editRole(role);
  };

  return (
    <tr>
      <td align="center" className="p-2">
        {role.name}
      </td>
      <td align="center" className="p-2">
        {role.description}
      </td>
      {rolePermissionsQuery.data !== undefined
        ? allPermissions.map((_permission, index) => (
            <td
              key={index}
              align="center"
              className={`p-2 ${
                index === 0 || index === 3 || index === 8 ? "border-l-2" : ""
              }`}
            >
              {rolePermissionsQuery.isRefetching ||
              rolePermissionsQuery.isFetching ? (
                <LoadingAnimation variant="circel" />
              ) : rolePermissionsQuery.data.find((permission) => {
                  return (
                    permission.permission_name === _permission.permission_name
                  );
                }) !== undefined ? (
                <CheckIcon />
              ) : (
                <CloseIcon />
              )}
            </td>
          ))
        : null}
      <td className="border-l-2 p-2">
        <div className="flex w-full flex-row items-center justify-center gap-5">
          <PermissionGate element="OrganizationButtonEditRole">
            <Button
              size="sm"
              title={t(`general.button.edit`)}
              onClick={handleOnClickButtonEdit}
              children={<EditIcon fontSize="small" />}
              variant="text"
            />
          </PermissionGate>
          <PermissionGate element="OrganizationButtonDeleteRole">
            <Button
              size="sm"
              variant="text"
              onClick={handleOnClickButtonDelete}
              children={<DeleteForeverIcon fontSize="small" />}
              title={t("general.button.delete")}
            />
          </PermissionGate>
        </div>
      </td>
    </tr>
  );
};

export default OrganizationRolesTableRow;
