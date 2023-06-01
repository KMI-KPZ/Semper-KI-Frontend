import React from "react";
import { useTranslation } from "react-i18next";
import useOrganizations, {
  OrganizationRoleProps,
} from "../hooks/useOrganizations";

interface OrganizationRolesProps {}

const OrganizationRoles: React.FC<OrganizationRolesProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organizationRolesQuery } = useOrganizations();

  return (
    <div className="flex flex-col items-center justify-center gap-5">
      <h2>{t("Organization.components.roles.header")}</h2>
      <div className="flex w-full flex-row flex-wrap items-center justify-start gap-5">
        <OrganizationRole name="Test" />
        <OrganizationRole name="Test2" />
      </div>
    </div>
  );
};

const OrganizationRole: React.FC<OrganizationRoleProps> = (props) => {
  const { name } = props;
  return (
    <div className="flex flex-row rounded-2xl bg-blau-300 px-4 py-2 ">
      <span>{name}</span>
    </div>
  );
};

export default OrganizationRoles;
