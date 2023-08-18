import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, { RoleProps } from "../../hooks/useOrganizations";
import { Table, TableCell, TableHead, TableRow } from "@mui/material";
import { SimplifiedPermissionProps, getSimplifiedPermissions } from "../Roles";
import { LoadingSuspense } from "@component-library/index";

interface OrganizationRolesTableProps {
  roles: RoleProps[];
}

const OrganizationRolesTable: React.FC<OrganizationRolesTableProps> = (
  props
) => {
  const { roles } = props;
  const { t } = useTranslation();
  const { permissionsQuery } = useOrganizations();

  return (
    <div className="hidden w-full md:flex ">
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
                      >
                        {t(
                          `Organization.Roles.components.Table.${permission.name}`
                        )}
                      </TableCell>
                    )
                  )}
                </TableRow>
                <TableRow>
                  {getSimplifiedPermissions(permissionsQuery.data).map(
                    (permission: SimplifiedPermissionProps, index) =>
                      permission.permissions.map((_permission, _index) => (
                        <TableCell key={index + _index}>
                          {t(
                            `Organization.Roles.components.Table.${_permission}`
                          )}
                        </TableCell>
                      ))
                  )}
                </TableRow>
              </TableHead>
            </Table>
          </div>
        ) : null}
      </LoadingSuspense>
    </div>
  );
};

export default OrganizationRolesTable;
