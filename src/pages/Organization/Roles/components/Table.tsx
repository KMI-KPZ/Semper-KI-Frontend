import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, { RoleProps } from "../../hooks/useOrganizations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { SimplifiedPermissionProps, getSimplifiedPermissions } from "../Roles";
import { LoadingSuspense } from "@component-library/index";
import OrganizationRolesTableRow from "./TableRow";

interface OrganizationRolesTableProps {
  roles: RoleProps[];
  openForm: (roleID: string) => void;
}

const OrganizationRolesTable: React.FC<OrganizationRolesTableProps> = (
  props
) => {
  const { roles, openForm } = props;
  const { t } = useTranslation();
  const { permissionsQuery } = useOrganizations();

  return (
    <div className="hidden w-full overflow-auto md:flex ">
      <LoadingSuspense query={permissionsQuery}>
        {permissionsQuery.data !== undefined ? (
          <div className="flex w-full">
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell rowSpan={2}>
                    {t("Organization.Roles.components.Table.name")}
                  </TableCell>
                  <TableCell rowSpan={2}>
                    {t("Organization.Roles.components.Table.description")}
                  </TableCell>
                  {getSimplifiedPermissions(permissionsQuery.data).map(
                    (permission: SimplifiedPermissionProps, index) => (
                      <TableCell
                        key={index}
                        colSpan={permission.permissions.length}
                        align="center"
                        sx={{ borderLeft: 1 }}
                      >
                        {t(
                          `Organization.Roles.components.Table.${permission.name}`
                        )}
                      </TableCell>
                    )
                  )}
                  <TableCell rowSpan={2} sx={{ borderLeft: 1 }} align="center">
                    {t("Organization.Roles.components.Table.actions")}
                  </TableCell>
                </TableRow>
                <TableRow>
                  {getSimplifiedPermissions(permissionsQuery.data).map(
                    (permission: SimplifiedPermissionProps, index) =>
                      permission.permissions.map(
                        (_permission, _index, _allPermissions) => (
                          <TableCell
                            key={index + _index}
                            sx={{
                              borderLeft: _index === 0 ? 1 : undefined,
                            }}
                          >
                            {t(
                              `Organization.Roles.components.Table.${_permission}`
                            )}
                          </TableCell>
                        )
                      )
                  )}
                </TableRow>
              </TableHead>
              <TableBody>
                {roles.map((role: RoleProps, index) => (
                  <OrganizationRolesTableRow
                    openForm={openForm}
                    key={index}
                    role={role}
                    allPermissions={permissionsQuery.data}
                  />
                ))}
              </TableBody>
            </Table>
          </div>
        ) : null}
      </LoadingSuspense>
    </div>
  );
};

export default OrganizationRolesTable;
