import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, { RoleProps } from "../../hooks/useOrganizations";
import { SimplifiedPermissionProps, getSimplifiedPermissions } from "../Roles";
import { LoadingSuspense } from "@component-library/index";
import OrganizationRolesTableRow from "./TableRow";

interface OrganizationRolesTableProps {
  roles: RoleProps[];
  editRole: (role: RoleProps) => void;
}

const OrganizationRolesTable: React.FC<OrganizationRolesTableProps> = (
  props
) => {
  const { roles, editRole } = props;
  const { t } = useTranslation();
  const { permissionsQuery } = useOrganizations();

  return (
    <div className="hidden w-full overflow-auto md:flex ">
      <LoadingSuspense query={permissionsQuery}>
        {permissionsQuery.data !== undefined ? (
          <div className="flex w-full">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th rowSpan={2} className="p-2" align="center">
                    {t("Organization.Roles.components.Table.name")}
                  </th>
                  <th rowSpan={2} className="p-2" align="center">
                    {t("Organization.Roles.components.Table.description")}
                  </th>
                  {getSimplifiedPermissions(permissionsQuery.data).map(
                    (permission: SimplifiedPermissionProps, index) => (
                      <th
                        key={index}
                        colSpan={permission.permissions.length}
                        align="center"
                        className="bproject-l-2 p-2"
                      >
                        {t(
                          `Organization.Roles.components.Table.${permission.name}`
                        )}
                      </th>
                    )
                  )}
                  <th rowSpan={2} className="bproject-l-2 p-2 text-center">
                    {t("Organization.Roles.components.Table.actions")}
                  </th>
                </tr>
                <tr className="bproject-b-2">
                  {getSimplifiedPermissions(permissionsQuery.data).map(
                    (permission: SimplifiedPermissionProps, index) =>
                      permission.permissions.map(
                        (_permission, _index, _allPermissions) => (
                          <th
                            key={index + _index}
                            className={`${
                              _index === 0 ? "bproject-l-2" : ""
                            } p-2`}
                          >
                            {t(
                              `Organization.Roles.components.Table.${_permission}`
                            )}
                          </th>
                        )
                      )
                  )}
                </tr>
              </thead>
              <tbody>
                {roles.map((role: RoleProps, index) => (
                  <OrganizationRolesTableRow
                    editRole={editRole}
                    key={index}
                    role={role}
                    allPermissions={permissionsQuery.data}
                  />
                ))}
              </tbody>
            </table>
          </div>
        ) : null}
      </LoadingSuspense>
    </div>
  );
};

export default OrganizationRolesTable;
