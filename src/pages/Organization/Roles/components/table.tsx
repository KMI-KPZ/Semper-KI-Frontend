import { LoadingSuspense } from "@component-library/Loading";
import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, { RoleProps } from "../../hooks/useOrganizations";
import OrganizationTableRow from "./tableRow";

interface OrganizationRolesTableProps {
  roles: RoleProps[] | undefined;
}

const OrganizationRolesTable: React.FC<OrganizationRolesTableProps> = (
  props
) => {
  const { roles } = props;
  const { t } = useTranslation();
  const { permissionsQuery } = useOrganizations();

  return (
    <LoadingSuspense query={permissionsQuery}>
      {permissionsQuery.data !== undefined &&
      permissionsQuery.data.length > 0 ? (
        <div className="w-full">
          <table className="w-full table-auto">
            <thead>
              <tr className="">
                <th>{t("Organization.Roles.components.table.name")}</th>
                <th>{t("Organization.Roles.components.table.description")}</th>
                <th>{t("Organization.Roles.components.table.actions")}</th>
                <th>
                  {t("Organization.Roles.components.table.order")}{" "}
                  {t("Organization.Roles.components.table.see")}
                </th>
                <th>
                  {t("Organization.Roles.components.table.order")}{" "}
                  {t("Organization.Roles.components.table.edit")}
                </th>
                <th>
                  {t("Organization.Roles.components.table.order")}{" "}
                  {t("Organization.Roles.components.table.status")}
                </th>
                <th>
                  {t("Organization.Roles.components.table.order")}{" "}
                  {t("Organization.Roles.components.table.chat")}
                </th>
                <th>
                  {t("Organization.Roles.components.table.resources")}{" "}
                  {t("Organization.Roles.components.table.see")}
                </th>
                <th>
                  {t("Organization.Roles.components.table.resources")}{" "}
                  {t("Organization.Roles.components.table.edit")}
                </th>
                <th>
                  {t("Organization.Roles.components.table.resources")}{" "}
                  {t("Organization.Roles.components.table.add")}
                </th>
              </tr>
            </thead>
            <tbody className="">
              {roles !== undefined && roles.length > 0
                ? roles.map((role, index) => (
                    <OrganizationTableRow role={role} key={index} />
                  ))
                : t("Organization.Roles.components.table.empty")}
            </tbody>
          </table>
        </div>
      ) : null}
    </LoadingSuspense>
  );
};

export default OrganizationRolesTable;
