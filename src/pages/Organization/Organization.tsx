import { Container, LoadingAnimation } from "@component-library/index";
import React from "react";
import { useTranslation } from "react-i18next";
import OrganizationInvitation from "./components/Invitation";
import OrganizationRoles from "./Roles/Roles";
import OrganizationTabel from "./components/UserTable";
import { Heading } from "@component-library/index";
import PermissionGate from "@/components/PermissionGate/PermissionGate";
import OrganizationInfo from "./Info/Info";
import OrganizationAddress from "./components/Address";
import useOrganization from "@/hooks/useOrganization";
import NotificationForm from "@/components/Form/Notifications/NotificationForm";
import PrioritiesForm from "@/components/Form/Priorities/PrioritiesForm";
import useGetOrganizationRoles from "@/api/Organization/Querys/useGetOrganizationRoles";
import useGetOrganizationInvites from "@/api/Organization/Querys/useGetOrganizationInvites";
import { useLocation } from "react-router-dom";
import useScrollIntoView from "@/hooks/Process/useScrollIntoView";

interface OrganizationViewProps {}

const Organization: React.FC<OrganizationViewProps> = (props) => {
  const {} = props;
  const { t } = useTranslation();
  const { organization } = useOrganization();
  const rolesQuery = useGetOrganizationRoles();
  const invitesQuery = useGetOrganizationInvites();
  const location = useLocation();

  const hash = location.hash;
  useScrollIntoView(hash);

  return (
    <div className="flex w-full flex-col items-center justify-center gap-5">
      <Heading variant="h1" className="container text-center">
        {t("Organization.index.header")}
      </Heading>

      <OrganizationInfo organization={organization} />
      <OrganizationAddress organization={organization} />
      <Container className="container" width="full">
        <NotificationForm
          type="orga"
          settings={organization.details.notificationSettings?.organization}
        />
      </Container>
      <Container className="container" width="full">
        <PrioritiesForm
          priorities={organization.details.priorities}
          type="orga"
        />
      </Container>
      <PermissionGate element="OrganizationInvitation">
        {rolesQuery.isLoading || invitesQuery.isLoading ? (
          <LoadingAnimation variant="circel" />
        ) : (
          <OrganizationInvitation
            roles={rolesQuery.data}
            invites={invitesQuery.data}
          />
        )}
      </PermissionGate>
      <PermissionGate element="OrganizationRoles">
        <OrganizationRoles />
      </PermissionGate>
      <OrganizationTabel />
    </div>
  );
};

export default Organization;
