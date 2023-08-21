import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  Permission,
  RoleProps,
} from "../../hooks/useOrganizations";
import { TableCell, TableRow } from "@mui/material";
import logger from "@/hooks/useLogger";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Button } from "@component-library/Button";

interface OrganizationRolesTableRowProps {
  role: RoleProps;
  allPermissions: Permission[];
  openForm: (roleID: string) => void;
}

const OrganizationRolesTableRow: React.FC<OrganizationRolesTableRowProps> = (
  props
) => {
  const { role, allPermissions, openForm } = props;
  const { t } = useTranslation();
  const { rolePermissionsQuery, deleteRoleMutation } = useOrganizations(
    role.id
  );

  const handleOnClickButtonDelete = () => {
    if (window.confirm(t("Organization.Roles.components.Item.alert")))
      deleteRoleMutation.mutate(role.id);
  };
  const handleOnClickButtonEdit = () => {
    openForm(role.id);
  };

  return (
    <TableRow>
      <TableCell>{role.name}</TableCell>
      <TableCell>{role.description}</TableCell>
      {rolePermissionsQuery.data !== undefined
        ? allPermissions.map((_permission, index) => (
            <TableCell
              key={index}
              align="center"
              sx={{
                borderLeft:
                  index === 0 || index === 5 || index === 8 ? 1 : undefined,
              }}
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
            </TableCell>
          ))
        : null}
      <TableCell sx={{ borderLeft: 1 }}>
        <div className="flex w-full flex-row items-center justify-center gap-5">
          <Button
            title={t(`Organization.components.table.button.edit`)}
            onClick={handleOnClickButtonEdit}
            children={<EditIcon fontSize="small" />}
          />
          <Button
            onClick={handleOnClickButtonDelete}
            children={<DeleteForeverIcon fontSize="small" />}
            title={t("Organization.Roles.components.table.button.delete")}
          />
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrganizationRolesTableRow;
