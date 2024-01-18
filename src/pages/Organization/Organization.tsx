import { Divider } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import Invitation from "./components/Invitation";
import OrganizationRoles from "./Roles/Roles";
import OrganizationTabel from "./components/UserTable";
import { Heading } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import OrganizationInfo from "./Info/Info";

interface OrganizationViewProps {}

const Organization: React.FC<OrganizationViewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
      <Heading variant="h1">{t("Organization.index.header")}</Heading>
      <OrganizationInfo />
      <PermissionGate element="OrganizationInvitation">
        <Invitation />
      </PermissionGate>
      <PermissionGate element="OrganizationRoles">
        <OrganizationRoles />
      </PermissionGate>
      <OrganizationTabel />
    </div>
  );
};

export default Organization;
