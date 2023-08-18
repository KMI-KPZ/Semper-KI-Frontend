import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  RolePermission,
  RoleProps,
} from "../../hooks/useOrganizations";
import { Text } from "@component-library/Typography";
import { Divider, LoadingSuspense } from "@component-library/index";
import { SimplifiedPermissionProps, getSimplifiedPermissions } from "../Roles";

interface OrganizationRolesItemProps {
  role: RoleProps;
}

const OrganizationRolesItem: React.FC<OrganizationRolesItemProps> = (props) => {
  const { role } = props;
  const { t } = useTranslation();
  const { rolePermissionsQuery } = useOrganizations(role.id);

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
            {getSimplifiedPermissions(rolePermissionsQuery.data).map(
              (permission: SimplifiedPermissionProps, index) => (
                <div
                  className="flex w-full flex-row justify-between gap-5 "
                  key={index}
                >
                  <Text variant="body">{permission.name}:</Text>
                  <Text variant="body" className="whitespace-nowrap">
                    {permission.permissions.join(", ")}
                  </Text>
                </div>
              )
            )}
          </div>
        ) : (
          <Text variant="body">{t("Organization.Roles.Roles.empty")}</Text>
        )}
      </LoadingSuspense>
    </div>
  );
};

export default OrganizationRolesItem;
