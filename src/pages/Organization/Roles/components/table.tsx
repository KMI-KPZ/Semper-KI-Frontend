import Table from "@/components/Table";
import { LoadingSuspense } from "@component-library/Loading";
import { Text } from "@component-library/Typography";
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

  const generateTitle = (name: string): string => {
    const names: string[] = name.split(":");
    return `${t(`Organization.Roles.components.table.${names[0]}`)} ${t(
      `Organization.Roles.components.table.${names[1]}`
    )}`;
  };

  return (
    <LoadingSuspense query={permissionsQuery}>
      {permissionsQuery.data !== undefined &&
      permissionsQuery.data.length > 0 ? (
        <div className="w-full overflow-auto ">
          <table className="w-full table-auto">
            <thead>
              <tr className="">
                <th>
                  <Text variant="body" className="p-2">
                    {t("Organization.Roles.components.table.name")}
                  </Text>
                </th>
                <th>
                  <Text variant="body" className="p-2">
                    {t("Organization.Roles.components.table.description")}
                  </Text>
                </th>
                {permissionsQuery.data.map((permission, index) => (
                  <th key={index}>
                    <Text variant="body" className="p-2">
                      {generateTitle(permission.value)}
                    </Text>
                  </th>
                ))}
                <th>
                  <Text variant="body" className="p-2">
                    {t("Organization.Roles.components.table.actions")}
                  </Text>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {roles !== undefined && roles.length > 0
                ? roles.map((role, index) => (
                    <OrganizationTableRow
                      role={role}
                      key={index}
                      allPermissions={permissionsQuery.data}
                    />
                  ))
                : null}
            </tbody>
          </table>
          {roles === undefined || roles.length === 0 ? (
            <div className="flex w-full items-center justify-center">
              <Text variant="body" className="text-gray-500">
                {t("Organization.Roles.components.table.empty")}
              </Text>
            </div>
          ) : null}
        </div>
      ) : null}
    </LoadingSuspense>
  );
};

export default OrganizationRolesTable;
