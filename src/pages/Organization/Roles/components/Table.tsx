import React from "react";
import { useTranslation } from "react-i18next";
import {
  getGroupedPermissions,
  getPermissinContextTranslations,
} from "../Roles";
import { LoadingSuspense } from "@component-library/index";
import OrganizationRolesTableRow from "./TableRow";
import { RoleProps } from "@/api/Organization/Mutations/useCreateRole";
import useGetOrganizationPermissions from "@/api/Organization/Querys/useGetOrganizationPermissions";

interface OrganizationRolesTableProps {
  roles: RoleProps[];
  editRole: (role: RoleProps) => void;
}

const OrganizationRolesTable: React.FC<OrganizationRolesTableProps> = (
  props
) => {
  const { roles, editRole } = props;
  const { t } = useTranslation();
  const permissionsQuery = useGetOrganizationPermissions();

  return (
    <div className="hidden w-full overflow-auto md:flex ">
      <LoadingSuspense query={permissionsQuery}>
        {permissionsQuery.data !== undefined ? (
          <div className="flex w-full">
            <table className="w-full table-auto">
              <thead>
                <tr>
                  <th rowSpan={2} className="p-2 align-text-top" align="center">
                    {t("Organization.Roles.components.Table.name")}
                  </th>
                  <th rowSpan={2} className="p-2 align-text-top" align="center">
                    {t("Organization.Roles.components.Table.description")}
                  </th>
                  {getPermissinContextTranslations(permissionsQuery.data).map(
                    (permissionContext, index) => (
                      <th
                        key={index}
                        colSpan={permissionContext.count}
                        align="center"
                        className="border-l-2 p-2"
                      >
                        {t(
                          `types.permissionContext.${permissionContext.context}`
                        )}
                      </th>
                    )
                  )}
                  <th
                    rowSpan={2}
                    className="border-l-2 p-2 text-center align-text-top"
                  >
                    {t("Organization.Roles.components.Table.actions")}
                  </th>
                </tr>
                <tr className="border-b-2">
                  {getGroupedPermissions(permissionsQuery.data).map(
                    (permissiongroup, index) =>
                      permissiongroup.permissionTypes.map(
                        (permission, index_) => (
                          <th
                            key={`${index}${index_}`}
                            className={`
                        ${index_ === 0 ? "border-l-2" : ""}
                        p-2`}
                          >
                            {t(`types.permissionType.${permission}`)}
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
