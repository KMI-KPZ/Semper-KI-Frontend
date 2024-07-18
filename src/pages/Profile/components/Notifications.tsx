import React from "react";
import { useTranslation } from "react-i18next";
import {
  Button,
  Container,
  Divider,
  Heading,
  Text,
} from "@component-library/index";
import { AuthorizedUserProps, UserProps } from "@/hooks/useUser";
import ProcessNotification from "./Notification";

interface ProfileNotificationsProps {
  user: AuthorizedUserProps;
}

const ProfileNotifications: React.FC<ProfileNotificationsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Container direction="col" width="full">
      <Heading variant="h2">{t("Profile.notifications.header")}</Heading>
      <Divider />

      <Container
        width="full"
        direction="col"
        justify="center"
        align="start"
        className="gap-10"
      >
        <ProcessNotification type="newsletter" />
      </Container>
    </Container>
  );
};

export default ProfileNotifications;
