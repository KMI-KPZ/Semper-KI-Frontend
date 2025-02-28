import React from "react";
import { useTranslation } from "react-i18next";
import { Button, Container, Heading, Text } from "@component-library/index";
import { HomeProgressItemData } from "./ProgressItem";
import { AuthorizedUser } from "@/hooks/useUser";
import HomeContainer from "./Container";
import Flowchart from "./FlowChart";

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
      title: t("Home.components.HomeUserProgress.items.adresses"),
      finished:
        user.details.addresses !== undefined &&
        user.details.addresses.length > 0,
      link: "account/#ProfileAddress",
    },
    {
      title: t("Home.components.HomeUserProgress.items.notificationSettings"),
      finished:
        user.details.notificationSettings !== undefined &&
        user.details.notificationSettings.user !== undefined &&
        user.details.notificationSettings.user.length > 0,
      link: "account#NotificationForm",
    },
  ];

  const allFinished = items.every((item) => item.finished);
  const [showFlow, setShowMore] = React.useState(!allFinished);

  const handleOnButtonClickShow = () => {
    setShowMore((prev) => !prev);
  };

  return (
    <HomeContainer>
      <Heading variant="h2">
        {t("Home.components.HomeUserProgress.todo")}
      </Heading>
      <Text className="text-center text-black">
        {t("Home.components.HomeUserProgress.progress", {
          count: items.filter((item) => item.finished).length,
          total: items.length,
        })}
      </Text>
      {showFlow ? <Flowchart items={items} /> : null}
      <Container width="full" direction="row" justify="center">
        <Button
          title={t("Home.components.HomeUserProgress.button.orga")}
          size="sm"
          variant="primary"
        />
        <Button
          title={
            showFlow === true
              ? t("general.button.showLess")
              : t("general.button.showMore")
          }
          onClick={handleOnButtonClickShow}
          size="sm"
        />
      </Container>
    </HomeContainer>
  );
};

export default HomeUserProgress;
