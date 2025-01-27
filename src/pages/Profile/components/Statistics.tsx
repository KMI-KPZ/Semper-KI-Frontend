import React from "react";
import { useTranslation } from "react-i18next";
import { Container, Divider, Heading, Text } from "@component-library/index";
import { AuthorizedUser } from "@/hooks/useUser";

interface ProfileStatisticsProps {
  user: AuthorizedUser;
}

const ProfileStatistics: React.FC<ProfileStatisticsProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  return (
    <Container width="full" direction="col">
      <Heading variant="h2">{t("Profile.Statistics.header")}</Heading>
      <Divider />
      <Container width="full" direction="auto">
        <Container width="full" direction="row" align="start" justify="start">
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text className="break-all">{t("Profile.Statistics.created")}</Text>
            <Text className="break-all">
              {t("Profile.Statistics.accessed")}
            </Text>
            <Text className="break-all">{t("Profile.Statistics.updated")}</Text>
          </Container>
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text className="break-all">
              {user.createdWhen.toLocaleString()}
            </Text>
            <Text className="break-all">
              {user.accessedWhen.toLocaleString()}
            </Text>
            <Text className="break-all">
              {user.updatedWhen.toLocaleString()}
            </Text>
          </Container>
        </Container>
        <Container width="full" direction="row" align="start" justify="start">
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text className="break-all">
              {t("Profile.Statistics.lastLogin")}
            </Text>
            <Text className="break-all">
              {t("Profile.Statistics.lastLoginNumber")}
            </Text>
          </Container>
          <Container
            direction="col"
            width="fit"
            justify="start"
            align="start"
            className="p-3"
            gap={3}
          >
            <Text className="break-all">
              {user.details.statistics !== undefined &&
              user.details.statistics?.lastLogin !== undefined
                ? new Date(user.details.statistics?.lastLogin).toLocaleString()
                : "---"}
            </Text>

            <Text className="break-all">
              {user.details.statistics !== undefined &&
              user.details.statistics.numberOfLoginsTotal !== undefined
                ? user.details.statistics.numberOfLoginsTotal
                : "---"}
            </Text>
          </Container>
        </Container>
      </Container>
    </Container>
  );
};

export default ProfileStatistics;
