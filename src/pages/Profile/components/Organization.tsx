import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading } from "@component-library/index";
import { AuthorizedUser, UserType } from "@/hooks/useUser";

interface ProfileOrganizationProps {
  user: AuthorizedUser;
}

const ProfileOrganization: React.FC<ProfileOrganizationProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return user.usertype === UserType.ORGANIZATION ? (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Profile.Organization.header")}</Heading>
      <Divider />
      <span className="break-all">
        {t("Profile.Organization.name")}: {user.organization}
      </span>
    </Container>
  ) : null;
};

export default ProfileOrganization;
