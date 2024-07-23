import { Divider, LoadingAnimation } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import Invitation from "./components/Invitation";
import OrganizationRoles from "./Roles/Roles";
import OrganizationTabel from "./components/UserTable";
import { Heading } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import OrganizationInfo from "./Info/Info";
import OrganizationAddress from "./components/Address";
import useGetOrganization from "@/api/Organization/Querys/useGetOrganization";
import { Error } from "../Error/Error";

interface OrganizationViewProps {}

const Organization: React.FC<OrganizationViewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const organization = useGetOrganization();

  if (organization.isLoading) return <LoadingAnimation variant="circel" />;

  if (organization.data !== undefined)
    return (
      <div className="flex w-full flex-col items-center justify-center gap-5 bg-white p-5">
        <Heading variant="h1">{t("Organization.index.header")}</Heading>
        <OrganizationInfo />
        <OrganizationAddress organization={organization.data} />
        <PermissionGate element="OrganizationInvitation">
          <Invitation />
        </PermissionGate>
        <PermissionGate element="OrganizationRoles">
          <OrganizationRoles />
        </PermissionGate>
        <OrganizationTabel />
      </div>
    );

  return <Error />;
};

export default Organization;
