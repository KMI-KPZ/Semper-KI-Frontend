import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  Permission,
  RoleProps,
} from "../../hooks/useOrganizations";
import logger from "@/hooks/useLogger";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@component-library/Button";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import { getSimplifiedPermissions, sortPermissions } from "../Roles";

interface OrganizationRolesTableRowProps {
  role: RoleProps;
  allPermissions: Permission[];
  editRole: (role: RoleProps) => void;
}

const OrganizationRolesTableRow: React.FC<OrganizationRolesTableRowProps> = (
  props
) => {
  const { role, allPermissions, editRole } = props;
  const { t } = useTranslation();
  const { rolePermissionsQuery, deleteRoleMutation } = useOrganizations(
    role.id
  );

  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Organization.Roles.components.Item.alert")))
      deleteRoleMutation.mutate(role.id);
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
                index === 0 || index === 3 || index === 7 ? "border-l-2" : ""
              }`}
            >
              {rolePermissionsQuery.data.find((permission) => {
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
              title={t(`Organization.components.table.button.edit`)}
              onClick={handleOnClickButtonEdit}
              children={<EditIcon fontSize="small" />}
            />
          </PermissionGate>
          <PermissionGate element="OrganizationButtonDeleteRole">
            <Button
              onClick={handleOnClickButtonDelete}
              children={<DeleteForeverIcon fontSize="small" />}
              title={t("Organization.components.table.button.delete")}
            />
          </PermissionGate>
        </div>
      </td>
    </tr>
  );
};

export default OrganizationRolesTableRow;
