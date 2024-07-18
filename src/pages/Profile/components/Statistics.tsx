import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading, Text } from "@component-library/index";
import { AuthorizedUserProps } from "@/hooks/useUser";

interface ProfileStatisticsProps {
  user: AuthorizedUserProps;
}

const ProfileStatistics: React.FC<ProfileStatisticsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Profile.time.header")}</Heading>
      <Divider />
      <Container width="full" direction="row" align="start" justify="start">
        <Container
          direction="col"
          width="fit"
          justify="start"
          align="start"
          className="p-3"
          gap={3}
        >
          <Text className="break-all">{t("Profile.time.created")}</Text>
          <Text className="break-all">{t("Profile.time.accessed")}</Text>
          <Text className="break-all">{t("Profile.time.updated")}</Text>
        </Container>
        <Container
          direction="col"
          width="fit"
          justify="start"
          align="start"
          className="p-3"
          gap={3}
        >
          <Text className="break-all">{user.createdWhen.toLocaleString()}</Text>
          <Text className="break-all">
            {user.accessedWhen.toLocaleString()}
          </Text>
          <Text className="break-all">{user.updatedWhen.toLocaleString()}</Text>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfileStatistics;
