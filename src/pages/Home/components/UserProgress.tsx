import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import HomeProgressItem, { HomeProgressItemData } from "./ProgressItem";
import { AuthorizedUser } from "@/hooks/useUser";
import HomeContainer from "./Container";

interface HomeUserProgressProps {
  user: AuthorizedUser;
}

const HomeUserProgress: React.FC<HomeUserProgressProps> = (props) => {
  const { user } = props;
  const { t } = useTranslation();

  const items: HomeProgressItemData[] = [
    {
      title: t("Home.components.HomeUserProgress.items.general"),
      finished: user.details.email !== "",
      link: "account#ProfileGeneral",
    },
    {
      title: t("Home.components.HomeUserProgress.items.notificationSettings"),
      finished:
        user.details.notificationSettings !== undefined &&
        user.details.notificationSettings.user !== undefined &&
        user.details.notificationSettings.user.length > 0,
      link: "account#NotificationForm",
    },

    {
      title: t("Home.components.HomeUserProgress.items.adresses"),
      finished:
        user.details.addresses !== undefined &&
        user.details.addresses.length > 0,
      link: "account/#ProfileAddress",
    },
  ];

  const allFinished = items.every((item) => item.finished);

  if (allFinished) return null;

  return (
    <HomeContainer>
      <Heading variant="h2">
        {t("Home.components.HomeUserProgress.todo")}
      </Heading>

      <Container width="full" direction="col">
        <Text className="text-black">
          {t("Home.components.HomeUserProgress.progress", {
            count: items.filter((item) => item.finished).length,
            total: items.length,
          })}
        </Text>
        <Container
          width="full"
          direction="row"
          className="max-w-4xl flex-wrap gap-3"
        >
          {items.map((item, index) => (
            <HomeProgressItem key={index} item={item} />
          ))}
        </Container>
      </Container>
      <Button
        title={t("Home.components.HomeUserProgress.button.orga")}
        size="sm"
        to="account"
      />
    </HomeContainer>
  );
};

export default HomeUserProgress;
