import { Divider } from "@component-library/Divider";
import React from "react";
import { useTranslation } from "react-i18next";
import Invitation from "./components/Invitation";
import OrganizationRoles from "./Roles/Roles";
import OrganizationTabel from "./components/UserTable";
import { Heading } from "@component-library/Typography";
import PermissionGate from "@/components/PermissionGate/PermissionGate";

interface OrganizationViewProps {}

const Organization: React.FC<OrganizationViewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("Organization.index.header")}</Heading>
      <PermissionGate element="OrganizationRoles">
        <Divider />
        <Invitation />
        <Divider />
        <OrganizationRoles />
      </PermissionGate>
      <Divider />
      <OrganizationTabel />
    </div>
  );
};

export default Organization;
